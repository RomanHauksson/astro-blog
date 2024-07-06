import React from "react";
import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import ReactDOM from "react-dom";
import { SearchBox, InstantSearch, Hits } from "react-instantsearch";
import type { TypesenseInstantsearchAdapterOptions } from "typesense-instantsearch-adapter";
import { PostSearchResult } from "./PostSearchResult";

const typesenseInstantsearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: "BB0pW7z9HndYa0dVbCsjZ6Vdc2dXdO2A", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "typesense.roman.technology",
        port: 443,
        path: "", // Optional. Example: If you have your typesense mounted in localhost:8108/typesense, path should be equal to '/typesense'
        protocol: "https",
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
    heroImagePath: string;
    slug: string;
  };
}

export const Hit = ({ hit }: HitProps) => {
  return (
    <PostSearchResult
      slug={hit.slug}
      heroImagePath={hit.heroImagePath}
      title={hit.title}
      description={hit.description}
      altText={`Thumbnail for ${hit.title}`}
      publishDate={hit.publishDate}
    />
  );
};

interface SearchProps {
  collection: string;
}

const Search = ({ collection }: SearchProps) => (
  <>
    <InstantSearch indexName={collection} searchClient={searchClient}>
      <SearchBox className="" placeholder="Search..." />
      <Hits hitComponent={Hit} />
    </InstantSearch>
    <style>
      {`
      .ais-SearchBox {
        width: 100%;
        border-radius: 100rem;
        height: 3rem;
        border: 1px solid #334155;
      }
      .ais-SearchBox-form {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        align-items: center;
      }
      .ais-SearchBox-input {
        color: white;
        width: 100%;
        height: 100%;
        border-radius: 100rem 0 0 100rem;
        border-right: 1px solid #334155;
        padding: 0.5rem;
        padding-left: 1rem;
        background-color: transparent;
      }
      .ais-SearchBox-submit {
        width: 3rem;
        height: 100%;
        padding: 0.9rem;
        padding-right: 1.05rem;
        border-radius: 0 100rem 100rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #1e293b;
      }
      .ais-SearchBox-submit:hover {
        background-color: #334155;
      }
      .ais-SearchBox-submitIcon {
        fill: white;
        height: 100%;
        width: auto;
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

export default Search;
