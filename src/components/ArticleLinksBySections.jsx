import ArticleSection from "./ArticleSection"; // Assuming ArticleSection is in a separate file

function ArticleLinksBySections({ linksBySection }) {
    console.log("RENDERING LINKS_BY_SECTIONS...");

    return (
        <div>
            {linksBySection.map((section) => (
                <ArticleSection key={section.title} section={section} />
            ))}
        </div>
    );
}

export default ArticleLinksBySections;
