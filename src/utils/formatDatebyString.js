export const formatDatebyString = (dateString) => {
  // Create a date object from the date string
  const date = new Date(dateString);
  
  // Check for an invalid date
  if (isNaN(date.getTime())) {
    console.error(`Invalid date string: ${dateString}`);
    return "Invalid date";
  }
  
  // Helper function to pad numbers to two digits
  const padToTwoDigits = (num) => num.toString().padStart(2, '0');
  
  const day = padToTwoDigits(date.getDate());
  const month = padToTwoDigits(date.getMonth() + 1); // Months are zero-based
  const year = date.getFullYear();
  
  // Return the formatted date
  return `${day}-${month}-${year}`;
};
