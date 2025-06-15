import { useEffect } from "react";
import ArticleSection from "./ArticleSection";
import wikipediaPreview from "wikipedia-preview";

function ArticleLinksBySections({ linksBySection, onTitleClick }) {
    // needs to find links on every mount
    useEffect(() => {
        wikipediaPreview.init({
            root: document,
            detectLinks: true,
            debug: true,
        });
    }, []);

    // top level should be the same as h2s
    const introSection = linksBySection[0];
    introSection.level = 2; // bad mutation but necessary, don't wanna spread big objects
    const pageTitle = introSection.title;

    return (
        <section className="links-sectn">
            {/* Render the intro section */}
            <ArticleSection
                key={introSection.title}
                section={introSection}
                pageTitle={pageTitle}
                recurse={false} // indicates h1 level
                onTitleClick={onTitleClick}
            />

            {/* Render the rest of the sections */}
            {introSection.children.map((section) => (
                <ArticleSection
                    key={section.title}
                    section={section}
                    pageTitle={pageTitle}
                    recurse={true}
                    onTitleClick={onTitleClick}
                />
            ))}
        </section>
    );
}

export default ArticleLinksBySections;
