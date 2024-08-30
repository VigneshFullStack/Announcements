export const GET_HOLIDAYS = `
  query GetHolidays {
    holidays {
      fromDate
      toDate
      name
      location
      description
    }
  }
`;
