import fetchGraphQLData from "./common/graphqlService.js";
import { GET_HOLIDAYS } from "../graphql/queries/holidayQueries.js";

export const fetchHolidays = async () => {
  const data = await fetchGraphQLData(GET_HOLIDAYS);
  return data.holidays || [];
};
