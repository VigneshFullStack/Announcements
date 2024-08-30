import fetchGraphQLData from "./common/graphqlService.js";
import { GET_SLIDES } from "../graphql/queries/slideQueries.js";

export const fetchSlides = async () => {
  const data = await fetchGraphQLData(GET_SLIDES);
  return data.slides || [];
};
