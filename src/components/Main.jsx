import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "./Header/Header";
import ContentSideBar from "./SideBar/ContentSideBar";
import ArticleLinksBySections from "./Links/ArticleLinksBySections";
import PageNavigator from "./PageNavigator";
import { getWikiText, DEFAULT_PARAMS_LINKS_SEARCH } from "../api/wikipedia";
import { extractTitleFromWikiHref } from "../lib/utils";

function Main() {
    console.log("RENDERING MAIN...");
    // state vars
    const [titles, setTitles] = useState([]);
    const [curPageIdx, setCurPageIdx] = useState(undefined);

    const qKey =
        titles.length > 0
            ? titles[curPageIdx].toLocaleLowerCase() // lowercased for consistency
            : undefined;
    console.log("qkey: ", qKey, " page no: ", curPageIdx);

    const {
        data: linksBySection,
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

    function handleSearch(query) {
        setTitles([query]);
        setCurPageIdx(0);
    }

    function loadFurtherLinks(clickedHref) {
        const titleFromHref = extractTitleFromWikiHref(clickedHref);

        // pages after current title's are cleared if they exist
        setTitles((prevTitles) => {
            let startToCur = prevTitles.slice(0, curPageIdx + 1);
            startToCur.push(titleFromHref);
            return startToCur;
        });
        setCurPageIdx((prevIdx) => prevIdx + 1);
    }

    function handlePrevPage() {
        if (curPageIdx > 0) {
            // reset url
            history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
            );
            setCurPageIdx((prevIdx) => prevIdx - 1);
        }
    }

    function handleNextPage() {
        if (curPageIdx < titles.length - 1) {
            // reset url
            history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
            );
            setCurPageIdx((prevIdx) => prevIdx + 1);
        }
    }

    console.log(linksBySection);

    return (
        <>
            <Header onSearch={handleSearch} isLoading={isLoading} />
            {error && <h2>Error fetching data: {error.message}</h2>}
            {isLoading && <div>Loading...</div>}
            <main>
                {linksBySection && (
                    <ContentSideBar linksBySection={linksBySection} />
                )}
                {linksBySection && (
                    <ArticleLinksBySections
                        linksBySection={linksBySection}
                        onTitleClick={loadFurtherLinks}
                        currentPage={curPageIdx + 1}
                        titles={new Set(titles)}
                    />
                )}
            </main>
            {titles.length > 0 && (
                <PageNavigator
                    onPrev={handlePrevPage}
                    onNext={handleNextPage}
                    currentPage={curPageIdx + 1}
                    totalPages={titles.length}
                    currentPageTitle={titles[curPageIdx]}
                />
            )}
        </>
    );
}

export default Main;
