import { useState, useEffect, ChangeEvent } from 'react';
import { formatInputDate } from '../../../utilities/index';
import { CalendarCard, TextInput } from '../../atoms';

interface CustomCalendarProps {
  id: string;
  type: string;
  placeHolder?: string;
  iconPath?: string;
  handleChange?: (date: string) => void;
}

export const CustomCalendar: React.FC<CustomCalendarProps> = ({ id, type, placeHolder, iconPath, handleChange }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const currentDay = String(currentDate.getDate()).padStart(2, '0');

  const [selectedDate, setSelectedDate] = useState(`${currentYear}-${currentMonth}-${currentDay}`);
  const [extractedYear, extractedMonth, extractedDay] = selectedDate.split('-');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputDate = event.target.value;
    const formattedDate = formatInputDate(inputDate);
    setSelectedDate(formattedDate);
  };

  const handleFocus = () => setIsFocused(true);

  const getCalendar = (data: string) => {
    setSelectedDate(formatInputDate(data));
  };

  useEffect(() => {
    setYear(Number(extractedYear));
    setMonth(extractedMonth);
    setDay(extractedDay);

    if (handleChange) {
      handleChange(selectedDate);
    }
  }, [selectedDate, handleChange]);

  const handleSelected = () => {
    setTimeout(() => setIsFocused(false), 0);
  };

  return (
    <div>
      <TextInput
        id={id}
        type={type}
        iconPath={iconPath}
        onChange={handleDateChange}
        value={selectedDate}
        placeHolder={placeHolder}
        onFocus={handleFocus}
      />
      {isFocused && (
        <CalendarCard
          initialDay={Number(day)}
          initialMonth={Number(month)}
          initialYear={Number(year)}
          selectedDate={getCalendar}
          handleSelectedDay={handleSelected}
        />
      )}
    </div>
  );
};
