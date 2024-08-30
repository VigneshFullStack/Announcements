import fetchGraphQLData from "./common/graphqlService.js";
import { GET_TICKERS } from "../graphql/queries/tickerQueries.js";

export const fetchTickers = async () => {
  const data = await fetchGraphQLData(GET_TICKERS);
  return data.tickers || [];
};
