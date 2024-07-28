// Get the number of days in a given month and year
export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Get the first day of the month (0 for Sunday, 1 for Monday, etc.)
export const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

// Regular expression to match the ISO date format (YYYY-MM-DD)

export const isValidISODate = (dateString: string): boolean => {
  // Regular expression to match the ISO date format (YYYY-MM-DD)
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  return isoDatePattern.test(dateString);
};

export const formatInputDate = (input: string): string => {
  // Remove any non-numeric characters and limit length to 8 (YYYYMMDD)
  const numericInput = input.replace(/\D/g, '').slice(0, 8);
  let formattedDate = '';

  // Apply formatting as YYYY-MM-DD
  if (numericInput.length >= 4) {
    formattedDate = `${numericInput.slice(0, 4)}`;
    if (numericInput.length > 4) {
      formattedDate += `-${numericInput.slice(4, 6)}`;
      if (numericInput.length > 6) {
        formattedDate += `-${numericInput.slice(6, 8)}`;
      }
    }
  } else {
    formattedDate = numericInput;
  }

  return formattedDate;
};

export const addLeadingZero = (number: number) => {
  // Convert the number to a string
  const numStr = number.toString();

  // Check if the number is between 1 and 9
  if (number >= 1 && number <= 9) {
    // Pad single-digit numbers with a leading zero
    return numStr.padStart(2, '0');
  }

  // Return the number as a string if it is 10 or greater
  return numStr;
};
