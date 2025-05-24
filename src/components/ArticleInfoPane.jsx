import { useState } from "react";
import ArticleInfo from "./ArticleInfo";

function ArticleInfoPane({ pageInfo }) {
    console.log("RENDERING ARTICLELINKS...");
    const { title, pageId, links } = pageInfo;

    const allLinks = links
        .filter(({ ns, exists }) => ns === 0 && exists)
        .map(({ title }, idx) => <ArticleInfo key={idx} title={title} />);

    return (
        <section className="ph">
            <div>Links here:</div>
            <h1>{title}</h1>
            {/* <pre>{JSON.stringify(pageInfo, null, 2)}</pre> */}
            {allLinks}
        </section>
    );
}

export default ArticleInfoPane;
