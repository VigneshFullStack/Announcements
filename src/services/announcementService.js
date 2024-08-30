import fetchGraphQLData from "./common/graphqlService.js";
import { GET_ANNOUNCEMENTS } from "../graphql/queries/announcementQueries.js";

export const fetchAnnouncements = async () => {
  const data = await fetchGraphQLData(GET_ANNOUNCEMENTS);
  return data.announcements || [];
};

