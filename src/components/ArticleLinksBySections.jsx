import { useRef, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleSection from "./ArticleSection";
import WikiPreview from "./WikiPreview";
import { getWikiSummary } from "../api/wikipedia";
import { extractTitleFromWikiHref, isMobileDevice } from "../lib/utils";

const PREVIEW_THUMBNAIL_DIM = { height: 250, width: 200 };
const PREVIEW_TEXT_DIM = { height: 210, width: 250 };
const CURSOR_OFFSET = 20;
const HIDE_DELAY = 300;

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

    // Helper function to calculate the best position for the preview popup
    const getClientCoords = (e) => {
        return { x: e.clientX, y: e.clientY };
    };
    // const calculateOptimalPosition = (e) => {
    //     const previewWidth = previewContent?.thumbnail
    //         ? PREVIEW_TEXT_DIM.width + PREVIEW_THUMBNAIL_DIM.width
    //         : PREVIEW_TEXT_DIM.width;
    //     const previewHeight = PREVIEW_THUMBNAIL_DIM.height;
    //     let top = e.clientY + CURSOR_OFFSET;
    //     let left = e.clientX + CURSOR_OFFSET;

    //     // Check for right edge collision and flip if necessary
    //     if (left + previewWidth > window.innerWidth) {
    //         left = e.clientX - previewWidth - CURSOR_OFFSET;
    //     }

    //     // Check for bottom edge collision and flip if necessary
    //     if (top + previewHeight > window.innerHeight) {
    //         top = e.clientY - previewHeight - CURSOR_OFFSET;
    //     }

    //     // Prevent clipping on the top or left edges as well
    //     if (top < 0) top = CURSOR_OFFSET;
    //     if (left < 0) left = CURSOR_OFFSET;
    //     console.log(top, " ", left);

    //     return { y: top, x: left };
    // };

    // Create a ref to hold the timer ID for hiding the tooltip
    const hideTimerRef = useRef(null);

    const scheduleHide = useCallback(() => {
        if (isMobileDevice()) return;
        // clear any existing timer to avoid multiple timers running
        clearTimeout(hideTimerRef.current);
        // set a new timer
        hideTimerRef.current = setTimeout(() => {
            setHoveredArticle({ title: null, position: { x: 0, y: 0 } });
        }, HIDE_DELAY);
    }, []);

    // Function to show the tooltip (and cancel any pending hide operations)
    const showPreview = useCallback((e, href) => {
        if (isMobileDevice()) return;
        // ALWAYS clear a pending hide timer when showing a new preview
        clearTimeout(hideTimerRef.current);

        const title = extractTitleFromWikiHref(href);
        setHoveredArticle({
            title,
            position: getClientCoords(e),
        });
    }, []);

    // Cleanup effect to clear the timer if the component unmounts
    // just in case
    useEffect(() => {
        return () => {
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    // The WikiPreview is only visible when an article title is set in our state.
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
