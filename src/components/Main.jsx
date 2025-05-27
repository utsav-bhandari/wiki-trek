import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./SearchBar";
import ArticleInfoPane from "./ArticleInfoPane";
import WikipediaLinksBySection from "./Test";
import { DEFAULT_PARAMS_LINKS_SEARCH } from "../api/wikipedia";

function Main() {
    console.log("RENDERING MAIN...");

    // state vars
    const [titles, setTitles] = useState([]);
    const [curPageIdx, setCurPageIdx] = useState(undefined);

    const qKey =
        titles.length > 0
            ? titles[curPageIdx].toLowerCase() // lowercased for consistency
            : undefined;
    console.log(titles);
    console.log("qkey: ", qKey, " page no: ", curPageIdx);

    // pageInfo is {parse:{title, pageid, links}}
    // this triggers when titles "mutates"
    const {
        data: pageInfo,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["links", qKey],
        queryFn: () =>
            getWikiLinks({
                ...DEFAULT_PARAMS_LINKS_SEARCH,
                page: curPageIdx ? titles[curPageIdx] : undefined,
            }),
        enabled: titles.length > 0,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    // triggers useQuery <- resets titles array and curPageIdx
    function handleSearch(formData) {
        const query = formData.get("search");
        if (query) {
            setTitles([query]);
            setCurPageIdx(0);
        }
    }

    function loadFurtherLinks(clickedTitle) {
        // pages after current title's are cleared if they exist

        setTitles((prevTitles) => {
            let startToCur = prevTitles.slice(0, curPageIdx + 1);
            startToCur.push(clickedTitle);
            return startToCur;
        });
        setCurPageIdx((prevIdx) => prevIdx + 1);
    }

    return (
        <main>
            {/* <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error fetching data: {error.message}</div>}
            {pageInfo && (
                <ArticleInfoPane
                    onLoadFurtherLinks={loadFurtherLinks}
                    pageInfo={pageInfo.parse}
                />
            )} */}
            <WikipediaLinksBySection />
        </main>
    );
}

export default Main;
