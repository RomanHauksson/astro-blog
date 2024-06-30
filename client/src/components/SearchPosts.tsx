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
    description: string;
    publishDate: string;
    imagePath: string;
    slug: string;
  };
}

export const Hit = ({ hit }: HitProps) => {
  return (
    <PostSearchResult
      slug={hit.slug}
      imagePath={hit.imagePath}
      title={hit.title}
      description={hit.description}
      altText={`Thumbnail for ${hit.title}`}
      publishDate={hit.publishDate}
    />
  );
};

const SearchPosts = () => (
  <>
    <InstantSearch indexName="posts" searchClient={searchClient}>
      <SearchBox className="" />
      <Hits hitComponent={Hit} />
    </InstantSearch>
    <style>
      {`
      .ais-SearchBox {
        width: 100%;
        background-color: white;
        border-radius: 0.5rem;
        height: 3rem;
      }
      .ais-SearchBox-form {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        align-items: center;
      }
      .ais-SearchBox-input {
        color: black;
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
        padding: 0.5rem;
      }
      .ais-SearchBox-submitIcon {
        height: 1.2rem;
        width: 1.2rem;
      }
      .ais-SearchBox-submit {
        background-color: white;
        height: 100%;
        width: 3rem;
        border-radius: 0.5rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ais-SearchBox-submit:hover {
        background-color: lightblue;
      }
      .ais-SearchBox-reset {
        display: none;
      }
      .ais-SearchBox-loadingIndicator {
        display: none;
      }
      .ais-Hits-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
    `}
    </style>
  </>
);

export default SearchPosts;
