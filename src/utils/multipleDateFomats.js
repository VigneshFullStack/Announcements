export const formatDatebyString = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month indexes start from 0
  const year = date.getFullYear();

  return (
    (day < 10 ? "0" + day : day) +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    year
  );
};

export const AnnoncementformatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  //return `${day}-${month}-${year}`;
  return `${year}-${month}-${day}`;
};

export const ApiformatDate = (date) => {
  const padToTwoDigits = (num) => num.toString().padStart(2, "0");
  const padToThreeDigits = (num) => num.toString().padStart(3, "0");

  const year = date.getFullYear();
  const month = padToTwoDigits(date.getMonth() + 1); // Months are zero-based
  const day = padToTwoDigits(date.getDate());
  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());
  const seconds = padToTwoDigits(date.getSeconds());
  const milliseconds = padToThreeDigits(date.getMilliseconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const FullformatDate = (dateString) => {
  const date = new Date(dateString);
  const padToTwoDigits = (num) => num.toString().padStart(2, "0");
  const padToThreeDigits = (num) => num.toString().padStart(3, "0");

  const year = date.getFullYear();
  const month = padToTwoDigits(date.getMonth() + 1); // Months are zero-based
  const day = padToTwoDigits(date.getDate());
  const hours = padToTwoDigits(date.getHours());
  const minutes = padToTwoDigits(date.getMinutes());
  const seconds = padToTwoDigits(date.getSeconds());
  const milliseconds = padToThreeDigits(date.getMilliseconds());
  //return `${day}-${month}-${year}`;
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatDateIntoString = (dateString) => {
  const date = new Date(dateString);

  // Array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()]; // Convert month number to name
  const year = date.getFullYear();

  // Return the formatted date string
  return `${day} ${month.toUpperCase()}, ${year}`;
};
