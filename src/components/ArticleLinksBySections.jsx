import { useRef, useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ArticleSection from "./ArticleSection";
import WikiPreview from "./WikiPreview";
import { getWikiSummary } from "../api/wikipedia";

// from WikiPreview
const PREVIEW_WIDTH = 350;
const PREVIEW_HEIGHT = 300;
const CURSOR_OFFSET = 20;

const HIDE_DELAY = 300;

function ArticleLinksBySections({ linksBySection, onTitleClick }) {
    // A single state object to track the hovered article's title and its position
    const [hoveredArticle, setHoveredArticle] = useState({
        title: null,
        position: { x: 0, y: 0 },
    });

    // Helper function to calculate the best position for the preview popup
    const calculateOptimalPosition = (e) => {
        let top = e.clientY + CURSOR_OFFSET;
        let left = e.clientX + CURSOR_OFFSET;

        // Check for right edge collision and flip if necessary
        if (left + PREVIEW_WIDTH > window.innerWidth) {
            left = e.clientX - PREVIEW_WIDTH - CURSOR_OFFSET;
        }

        // Check for bottom edge collision and flip if necessary
        if (top + PREVIEW_HEIGHT > window.innerHeight) {
            top = e.clientY - PREVIEW_HEIGHT - CURSOR_OFFSET;
        }

        // Prevent clipping on the top or left edges as well
        if (top < 0) top = CURSOR_OFFSET;
        if (left < 0) left = CURSOR_OFFSET;

        return { y: top, x: left };
    };

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
    console.log(previewContent);

    // Create a ref to hold the timer ID for hiding the tooltip
    const hideTimerRef = useRef(null);

    const scheduleHide = useCallback(() => {
        // clear any existing timer to avoid multiple timers running
        clearTimeout(hideTimerRef.current);
        // set a new timer
        hideTimerRef.current = setTimeout(() => {
            setHoveredArticle({ title: null, position: { x: 0, y: 0 } });
        }, HIDE_DELAY);
    }, []);

    // Function to show the tooltip (and cancel any pending hide operations)
    const showPreview = useCallback((e, href) => {
        // ALWAYS clear a pending hide timer when showing a new preview
        clearTimeout(hideTimerRef.current);

        const title = href.substring(href.lastIndexOf("/") + 1);
        setHoveredArticle({
            title,
            position: calculateOptimalPosition(e),
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
                recurse={false}
                onLinkHover={showPreview}
                onLinkLeave={scheduleHide}
                onTitleClick={onTitleClick}
            />

            {/* Render the rest of the sections */}
            {introSection.children.map((section) => (
                <ArticleSection
                    key={section.title}
                    section={section}
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
