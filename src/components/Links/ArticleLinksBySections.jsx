import { useEffect } from "react";
import ArticleSection from "./ArticleSection";
import wikipediaPreview from "wikipedia-preview";

function ArticleLinksBySections({
    linksBySection,
    onTitleClick,
    titles,
    curPage,
}) {
    console.log("RENDERING ALL LINKS...");
    useEffect(() => {
        console.log(`DETECTING...${curPage}`);
        wikipediaPreview.init({
            root: document,
            detectLinks: true,
        });
    }, [curPage]);

    // top level should be the same as h2s
    const introSection = linksBySection[0];
    introSection.level = 2; // bad mutation but necessary, don't wanna spread big objects

    return (
        <section className="links-sectn">
            {/* Render the intro section */}
            <ArticleSection
                key={introSection.title}
                section={introSection}
                recurse={false} // indicates h1 level
                onTitleClick={onTitleClick}
                titles={titles}
            />

            {/* Render the rest of the sections */}
            {introSection.children.map((section) => (
                <ArticleSection
                    key={section.title}
                    section={section}
                    recurse={true}
                    onTitleClick={onTitleClick}
                    titles={titles}
                />
            ))}
        </section>
    );
}

export default ArticleLinksBySections;
