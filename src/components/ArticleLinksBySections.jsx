import ArticleSection from "./ArticleSection";
import { wikiUrl } from "../api/wikipedia";

function ArticleLinksBySections({ linksBySection }) {
    console.log("RENDERING LINKS_BY_SECTIONS...");

    const introSection = linksBySection[0];
    return (
        <section>
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
