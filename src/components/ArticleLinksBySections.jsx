import ArticleSection from "./ArticleSection";

function ArticleLinksBySections({ linksBySection }) {
    console.log("RENDERING LINKS_BY_SECTIONS...");

    const introSection = linksBySection[0];
    // mutating bad but ehhhhhhhh
    introSection.level = 2; // top section should be the same heirarchy as h2s
    return (
        <section className="links-sectn">
            {/* intro section */}
            <ArticleSection
                key={introSection.title}
                section={introSection}
                recurse={false}
            />
            {/* rest of the sections */}
            {introSection.children.map((section) => (
                <ArticleSection
                    key={section.title}
                    section={section}
                    recurse={true}
                />
            ))}
        </section>
    );
}

export default ArticleLinksBySections;
