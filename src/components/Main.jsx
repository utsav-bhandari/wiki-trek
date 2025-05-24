import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import ArticleLinks from "./ArticleLinks";
import { API_URL, DEFAULT_PARAMS_LINKS_SEARCH } from "../lib/constants";

const getWikiLinks = async (params) => {
    console.log("FETCHING...");

    const url = new URL(API_URL);
    url.search = new URLSearchParams(params).toString();
    const links_endpoint = url.toString();

    const res = await fetch(links_endpoint);
    return res.json();
};

function Main() {
    console.log("RENDERING MAIN...");

    // state vars
    const [title, setTitle] = useState("");

    // pageInfo is {parse:{title, pageid, links}}
    const {
        data: pageInfo,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["links", title.toLowerCase()],
        queryFn: () =>
            getWikiLinks({ ...DEFAULT_PARAMS_LINKS_SEARCH, page: title }),
        enabled: title.length > 0,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    function handleSearch(formData) {
        const query = formData.get("search");
        if (query) setTitle(query);
    }

    return (
        <main>
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error fetching data: {error.message}</div>}
            {pageInfo && <ArticleLinks pageInfo={pageInfo.parse} />}
        </main>
    );
}

export default Main;
