import { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, addLeadingZero } from '../../../utilities';
import { fullMonthNames, weekDays, monthNames } from '../../../constants';

import arrowLeft from '../../../assets/png/leftArrow.png';
import arrowRight from '../../../assets/png/rightArrow.png';

import styled from './CalendarCard.module.scss';

interface CalendarProps {
  initialDay?: number;
  initialMonth?: number;
  initialYear?: number;
  handleSelectedDay?: (selectedDay: string) => void;
  selectedDate?: (selectedDate: string) => void;
}

export const CalendarCard: React.FC<CalendarProps> = ({
  initialDay = 0,
  initialMonth = 0,
  initialYear = 0,
  selectedDate,
  handleSelectedDay,
}) => {
  const initialStartYear = 2020;
  const initialCurrentDate = new Date();
  const [currentDate] = useState(new Date());
  const [startYear, setStartYear] = useState(initialStartYear);
  const [listOfYears, setListOfYears] = useState<number[]>([]);

  // Selected Day, Month and Year
  const [selectedDay, setSelectedDay] = useState<number>(initialDay || initialCurrentDate.getDate());
  const [selectedYear, setSelectedYear] = useState<number>(initialYear || initialCurrentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialMonth || Number(String(initialCurrentDate.getMonth() + 1).padStart(2, '0')),
  );
  const [isDaysSectionOpen, setIsDaysSectionOpen] = useState<boolean>(true);
  const [isMonthsSectionOpen, setIsMonthsSectionOpen] = useState<boolean>(false);
  const [isYearsSectionOpen, setIsYearsSectionOpen] = useState<boolean>(false);

  const currentDayOfMonth = currentDate.getDate();
  const currentMonth: number = initialCurrentDate.getMonth() + 1;

  const getDaysFromPreviousMonth = () => {
    const daysInPreviousMonth = getDaysInMonth(
      selectedMonth === 0 ? 11 : selectedMonth - 1,
      selectedMonth === 0 ? selectedYear - 1 : selectedYear,
    );
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);

    return [...Array(firstDayOfMonth).keys()].map((i) => daysInPreviousMonth - (firstDayOfMonth - 1 - i));
  };

  const getDaysFromNextMonth = () => {
    const totalCells = 42;
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDayOfMonth = getFirstDayOfMonth(selectedMonth, selectedYear);

    const daysToFill = totalCells - (daysInMonth + firstDayOfMonth);
    if (daysToFill <= 0) return [];

    return [...Array(daysToFill).keys()].map((i) => i + 1);
  };

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const previousMonthDays = getDaysFromPreviousMonth();
    const nextMonthDays = getDaysFromNextMonth();

    return [
      ...previousMonthDays.map((day) => (
        <div key={`prev-${day}`} className={styled.dayPevMonth}>
          {day}
        </div>
      )),
      ...[...Array(daysInMonth).keys()].map((day) => {
        const dayNumber = day + 1;
        const isToday = selectedMonth + 1 === currentMonth && dayNumber === currentDayOfMonth;
        return (
          <div
            key={dayNumber}
            className={`${styled.dayCurrentMonth} ${isToday ? styled.currentDay : ''}`}
            onClick={() => handleChangeDay(dayNumber)}
          >
            <div className={selectedDay === dayNumber && selectedYear ? styled.currentSelectedDay : ''}>
              {dayNumber}
            </div>
          </div>
        );
      }),
      ...nextMonthDays.map((day) => (
        <div key={`next-${day}`} className={styled.dayNextMonth}>
          {day}
        </div>
      )),
    ];
  };

  const handleTitleChange = () => {
    if (isDaysSectionOpen) {
      setIsMonthsSectionOpen(true);
      setIsDaysSectionOpen(false);
      setIsYearsSectionOpen(false);
    }

    if (isMonthsSectionOpen) {
      setIsYearsSectionOpen(true);
      setIsDaysSectionOpen(false);
      setIsMonthsSectionOpen(false);
    }
  };

  const handlePrev = () => {
    if (isDaysSectionOpen) {
      setSelectedMonth(selectedMonth - 1);
    }

    if (isYearsSectionOpen) {
      setStartYear((prev) => prev - 10);
    }
  };

  const handleNext = () => {
    if (isDaysSectionOpen) {
      setSelectedMonth(selectedMonth + 1);
    }

    if (isYearsSectionOpen) {
      setStartYear((prev) => prev + 10);
    }
  };

  const handleChangeYear = (year: number): void => {
    setSelectedYear(year);
    setIsYearsSectionOpen(false);
    setIsDaysSectionOpen(false);
    setIsMonthsSectionOpen(true);
  };

  const handleChangeDay = (day: number): void => {
    setSelectedDay(day);
    if (handleSelectedDay) {
      handleSelectedDay('selected');
    }
  };

  const handleChangeMonth = (month: number): void => {
    setSelectedMonth(month);
    setIsYearsSectionOpen(false);
    setIsMonthsSectionOpen(false);
    setIsDaysSectionOpen(true);
  };

  useEffect(() => {
    const generateYears = () => {
      const yearsArray = Array.from({ length: 16 }, (_, index) => startYear + index);
      setListOfYears(yearsArray);
    };

    generateYears();
  }, [startYear]);

  useEffect(() => {
    setSelectedYear(initialYear);
    setSelectedMonth(initialMonth - 1);
    setSelectedDay(initialDay);
  }, [initialDay, initialYear, initialDay]);

  useEffect(() => {
    if (selectedDate) {
      selectedDate(`${selectedYear}-${addLeadingZero(selectedMonth + 1)}-${addLeadingZero(selectedDay)}`);
    }
  }, [selectedDay, selectedYear, selectedMonth, selectedDay]);

  return (
    <div className={styled.calendar}>
      <div className={styled.calendarHeader}>
        <img alt="arrowLeft" src={arrowLeft} onClick={handlePrev} />
        <div className={styled.titleSection} onClick={handleTitleChange}>
          {isDaysSectionOpen && `${fullMonthNames[selectedMonth]} ${selectedYear}`}
          {isMonthsSectionOpen && selectedYear}
          {isYearsSectionOpen && `${startYear} - ${startYear + 9}`}
        </div>
        <img alt="arrowLeft" src={arrowRight} onClick={handleNext} />
      </div>
      {/* Days Section */}
      {isDaysSectionOpen && (
        <div className={styled.contentCalendayDays}>
          <div className={styled.weekdays}>
            {weekDays.map((day: string) => (
              <div key={day} className={styled.weekDay}>
                {day}
              </div>
            ))}
          </div>
          <div className={styled.daysGrid}>{generateCalendar()}</div>
        </div>
      )}
      {/* Month Section */}
      {(isMonthsSectionOpen || isYearsSectionOpen) && (
        <div className={styled.contentCalendarMonthYear}>
          {isMonthsSectionOpen && (
            <div className={styled.months}>
              {monthNames.map((month: string, index: number) => (
                <div key={month} className={styled.weekDay}>
                  <div
                    className={currentMonth - 1 === index ? styled.currentMonth : styled.weekDay}
                    onClick={() => handleChangeMonth(index)}
                  >
                    {month}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Years Section */}
          {isYearsSectionOpen && (
            <div className={styled.months}>
              {listOfYears.map((year: number) => (
                <div key={year} className={listOfYears[0] + 9 >= year ? styled.weekDay : styled.sectionYear}>
                  <div
                    className={year === initialCurrentDate.getFullYear() ? styled.currentYear : styled.weekDay}
                    onClick={() => handleChangeYear(year)}
                  >
                    {year}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
