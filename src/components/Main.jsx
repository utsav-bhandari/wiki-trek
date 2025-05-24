import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import ArticleInfoPane from "./ArticleInfoPane";
import { getWikiLinks, DEFAULT_PARAMS_LINKS_SEARCH } from "../api/wikipedia";

function Main() {
    console.log("RENDERING MAIN...");

    // state vars
    const [titles, setTitles] = useState([]);
    console.log(titles.length);

    // pageInfo is {parse:{title, pageid, links}}
    // this triggers when title "mutates"
    const qKey = titles.length
        ? titles[titles.length - 1].toLowerCase() // lowercased for consistency
        : undefined;
    const {
        data: pageInfo,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["links", qKey],
        queryFn: () =>
            getWikiLinks({
                ...DEFAULT_PARAMS_LINKS_SEARCH,
                page: titles[titles.length - 1],
            }),
        enabled: titles.length > 0,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    // triggers useQuery, also resets titles array
    function handleSearch(formData) {
        const query = formData.get("search");
        if (query) setTitles([query]);
    }

    return (
        <main>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error fetching data: {error.message}</div>}
            {pageInfo && <ArticleInfoPane pageInfo={pageInfo.parse} />}
        </main>
    );
}

export default Main;
