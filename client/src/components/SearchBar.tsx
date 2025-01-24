import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";
import {
  SearchBox,
  InstantSearch,
  Hits,
  useInstantSearch,
} from "react-instantsearch";
// import type { TypesenseInstantsearchAdapterOptions } from "typesense-instantsearch-adapter";
import { SearchResult } from "./SearchResult";

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function Search() {
  interface HitProps {
    hit: {
      collection: string;
      title: string;
      description: string;
      publishDate: string;
      heroImagePath: string;
      slug: string;
      technologies: string[];
    };
  }

  const Hit = ({ hit }: HitProps) => {
    return (
      <SearchResult
        collection="projects"
        slug={hit.slug}
        heroImagePath={hit.heroImagePath}
        title={hit.title}
        description={hit.description}
        altText={`Thumbnail for ${hit.title}`}
        publishDate={hit.publishDate}
        technologies={hit.technologies}
      />
    );
  };

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
      sort_by: "publishDate:desc",
    },
  });

  const searchClient = typesenseInstantsearchAdapter.searchClient;

  return (
    <>
      <InstantSearch indexName="projects" searchClient={searchClient}>
        <SearchBox
          classNames={{
            root: "w-full rounded-full h-12 border border-2 border-slate-700 relative",
            form: "flex flex-row w-full h-full items-center",
            input:
              "text-white w-full h-full p-2 pl-4 bg-transparent rounded-l-full border-r-2 border-r-slate-700",
            submit:
              "w-12 h-full p-[0.9rem] pr-[1.05rem] rounded-r-full flex items-center justify-center bg-slate-800 hover:bg-slate-700",
            submitIcon: "fill-white h-full w-auto",
            reset: "hidden",
            loadingIndicator: "hidden",
          }}
          placeholder="Search..."
        />

        <EmptyQueryBoundary fallback={null}>
          <Hits
            hitComponent={Hit}
            classNames={{
              root: "absolute flex flex-col gap-2 top-[8rem]",
            }}
          />
        </EmptyQueryBoundary>
      </InstantSearch>
    </>
  );
}

export default Search;
