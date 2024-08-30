export const GET_TICKERS = `
  query GetTickers {
    tickers {
      category
      displayEndTime
      displayStartTime
      isActive
      message
    }
  }
`;
