import { EndpointType } from "@/types";
import { parser } from "../parser/parserData";

const proxyRequestToEnableCORS = (url) =>
  `https://cors-anywhere.herokuapp.com/${url}`;

const builApiURL = (section: EndpointType) =>
  `https://www.lottoland.com/api/drawings/${section}/`;

const setUrl = (query: string, section: EndpointType) =>
  `${builApiURL(section)}${query}`;

export const get = async ({
  query,
  section,
}: {
  query: string;
  section: EndpointType;
}): Promise<any> =>
  await fetch(proxyRequestToEnableCORS(setUrl(query, section)))
    .then((result) => result.json().then((res) => parser(res, section)))
    .catch((err) => console.error(err));
