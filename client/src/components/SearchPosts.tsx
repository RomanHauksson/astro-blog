import React from "react";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import ReactDOM from "react-dom";
import { SearchBox, InstantSearch, Hits } from "react-instantsearch";
import type { TypesenseInstantsearchAdapterOptions } from "typesense-instantsearch-adapter";
import { PostSearchResult } from "./PostSearchResult";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "lDhEhm2hz8J0YWb9NgRu7jiLEJhHJrYv", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "137.184.38.192",
        port: 8108,
        path: "", // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  query_by is required.
  additionalSearchParameters: {
    query_by: "title",
  },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;

interface HitProps {
  hit: {
    title: string;
  };
}

export const Hit = ({ hit }: HitProps) => {
  return (
    <PostSearchResult
      slug="test"
      imagePath="/src/assets/screenshot.webp"
      title={hit.title}
      description="test"
      altText="test"
      publishDate="2021-01-01"
    />
  );
};

const SearchPosts = () => (
  <InstantSearch indexName="posts" searchClient={searchClient}>
    <SearchBox className="" />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

export default SearchPosts;
