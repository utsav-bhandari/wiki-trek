import { useState } from "react";
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
            <div>Links here:</div>
            <h1>{pageTitle}</h1>
            {allLinks}
        </section>
    );
}

export default ArticleInfoPane;
