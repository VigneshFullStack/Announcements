export const GET_UPCOMING_HOLIDAYS = `
  query GetUpcomingHolidays {
    upcomingHolidays {
      name
      location
      description
      fromDate
    }
  }
`;
