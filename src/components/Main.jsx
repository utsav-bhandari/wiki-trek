import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import ArticleInfoPane from "./ArticleInfoPane";
import { getWikiLinks, DEFAULT_PARAMS_LINKS_SEARCH } from "../api/wikipedia";

function Main() {
    console.log("RENDERING MAIN...");

    // state vars
    const [title, setTitle] = useState("");

    // pageInfo is {parse:{title, pageid, links}}
    // this triggers when title "mutates"
    const {
        data: pageInfo,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["links", title.toLowerCase()], // lowercased for consistency
        queryFn: () =>
            getWikiLinks({ ...DEFAULT_PARAMS_LINKS_SEARCH, page: title }),
        enabled: title.length > 0,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    // triggers useQuery
    function handleSearch(formData) {
        const query = formData.get("search");
        if (query) setTitle(query);
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
