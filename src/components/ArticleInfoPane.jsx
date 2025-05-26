import ArticleInfo from "./ArticleInfo";

function ArticleInfoPane({ onLoadFurtherLinks, pageInfo }) {
    console.log("RENDERING ARTICLEINFO...");
    const { title: pageTitle, pageId, links } = pageInfo;

    const allLinks = links
        .filter(({ ns, exists }) => ns === 0 && exists)
        .map(({ title }, idx) => (
            <ArticleInfo
                key={idx}
                title={title}
                onLoadFurtherLinks={onLoadFurtherLinks}
            />
        ));

    return (
        <section className="ph">
            <h2>{pageTitle}</h2>
            {allLinks}
        </section>
    );
}

export default ArticleInfoPane;
