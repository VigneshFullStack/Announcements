export const formatDateWithoutTime = (date) => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  if (date) {
    const padToTwoDigits = (num) => num.toString().padStart(2, "0");
    const padToThreeDigits = (num) => num.toString().padStart(3, "0");

    const year = date.getFullYear();
    const month = padToTwoDigits(date.getMonth() + 1); // Months are zero-based
    const day = padToTwoDigits(date.getDate());
    const hours = padToTwoDigits(date.getHours());
    const minutes = padToTwoDigits(date.getMinutes());
    const seconds = padToTwoDigits(date.getSeconds());
    const milliseconds = padToThreeDigits(date.getMilliseconds());

    // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return `${year}-${month}-${day} `;
  } else {
    return date;
  }
};
