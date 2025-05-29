import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import ArticleLinks from "./ArticleLinks";
import ContentSidebar from "./ContentSidebar";
import {
    getWikiText,
    getLinksBySection,
    DEFAULT_PARAMS_LINKS_SEARCH,
} from "../api/wikipedia";

function ArticleLinksContainer() {
    console.log("RENDERING MAIN...");
    // state vars
    const [titles, setTitles] = useState([]);
    const [curPageIdx, setCurPageIdx] = useState(undefined);

    const qKey =
        titles.length > 0
            ? titles[curPageIdx].toLowerCase() // lowercased for consistency
            : undefined;
    console.log("qkey: ", qKey, " page no: ", curPageIdx);

    const {
        data: parsedWikiText,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["wikiText", qKey],
        queryFn: () =>
            getWikiText({
                ...DEFAULT_PARAMS_LINKS_SEARCH,
                page: titles.length > 0 ? titles[curPageIdx] : undefined,
            }),
        enabled: titles.length > 0,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    const linksBySection = getLinksBySection(parsedWikiText);
    console.log(linksBySection);

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
        <>
            <Header onSearch={handleSearch} isLoading={isLoading} />
            <main>
                {error && <h2>Error fetching data: {error.message}</h2>}
                {isLoading && <div>Loading...</div>}
                {parsedWikiText && (
                    <ArticleLinks linksBySection={linksBySection} />
                )}
            </main>
        </>
    );
}

export default ArticleLinksContainer;
