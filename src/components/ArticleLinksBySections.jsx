import { useRef, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleSection from "./ArticleSection";
import WikiPreview from "./WikiPreview";
import { getWikiSummary } from "../api/wikipedia";
import { extractTitleFromWikiHref, isMobileDevice } from "../lib/utils";

const HIDE_DELAY = 300; // ms to wait before hiding
const SHOW_DELAY = 300; // 1 second to wait before showing

function ArticleLinksBySections({ linksBySection, onTitleClick }) {
    // A single state object to track the hovered article's title and its position
    const [hoveredArticle, setHoveredArticle] = useState({
        title: null,
        position: { x: 0, y: 0 },
    });

    const {
        data: previewContent,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["wikiSummary", hoveredArticle.title?.toLowerCase()],
        queryFn: () => getWikiSummary(hoveredArticle.title),
        // the query will only execute when a title is present.
        enabled: !!hoveredArticle.title,
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 3, // Inactive data is kept for 3 minutes
        retry: 1,
    });

    // Create a ref to hold the timer ID for showing/hiding the tooltip
    const hideTimerRef = useRef(null);
    const showTimerRef = useRef(null);

    const scheduleHide = useCallback(() => {
        if (isMobileDevice()) return;
        // clear any existing timer to avoid multiple timers running
        clearTimeout(showTimerRef.current);
        clearTimeout(hideTimerRef.current);
        // set a new timer
        hideTimerRef.current = setTimeout(() => {
            setHoveredArticle({ title: null, position: { x: 0, y: 0 } });
        }, HIDE_DELAY);
    }, []);

    // Function to show the tooltip (and cancel any pending hide operations)
    const showPreview = useCallback((e, href) => {
        if (isMobileDevice()) return;
        // ALWAYS clear a pending show/hide timer when showing a new preview
        clearTimeout(showTimerRef.current);
        clearTimeout(hideTimerRef.current);

        showTimerRef.current = setTimeout(() => {
            const title = extractTitleFromWikiHref(href);
            setHoveredArticle({
                title,
                position: { x: e.clientX, y: e.clientY },
            });
        }, SHOW_DELAY);
    }, []);

    // Cleanup effect to clear the timer if the component unmounts
    // just in case
    useEffect(() => {
        return () => {
            clearTimeout(showTimerRef.current);
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    // The WikiPreview is only visible when an article title is set in state
    const isVisible = !!hoveredArticle.title;

    // top level should be the same as h2s
    const introSection = linksBySection[0];
    introSection.level = 2; // bad mutation but necessary, don't wanna spread big objects
    const pageTitle = introSection.title;

    return (
        <section className="links-sectn">
            <WikiPreview
                isVisible={isVisible}
                position={hoveredArticle.position}
                isLoading={isLoading}
                error={error}
                data={previewContent}
                onMouseEnter={() => clearTimeout(hideTimerRef.current)}
                onMouseLeave={scheduleHide}
            />

            {/* Render the intro section */}
            <ArticleSection
                key={introSection.title}
                section={introSection}
                pageTitle={pageTitle}
                recurse={false} // indicates h1 level
                onLinkHover={showPreview}
                onLinkLeave={scheduleHide}
                onTitleClick={onTitleClick}
            />

            {/* Render the rest of the sections */}
            {introSection.children.map((section) => (
                <ArticleSection
                    key={section.title}
                    section={section}
                    pageTitle={pageTitle}
                    recurse={true}
                    onLinkHover={showPreview}
                    onLinkLeave={scheduleHide}
                    onTitleClick={onTitleClick}
                />
            ))}
        </section>
    );
}

export default ArticleLinksBySections;
