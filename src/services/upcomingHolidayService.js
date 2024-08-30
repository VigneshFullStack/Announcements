import fetchGraphQLData from "./common/graphqlService.js";
import { GET_UPCOMING_HOLIDAYS } from "../graphql/queries/upcomingHolidayQueries.js";

export const fetchUpcomingHolidays = async () => {
  const data = await fetchGraphQLData(GET_UPCOMING_HOLIDAYS);
  return data.upcomingHolidays || [];
};
