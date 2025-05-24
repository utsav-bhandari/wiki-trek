import { useState } from "react";

function ArticleLinks({ pageInfo }) {
    console.log("RENDERING ARTICLELINKS...");
    const { title, pageId, linksArray } = pageInfo;

    // state vars
    const [allLinks, setAllLinks] = useState([]);

    return (
        <section className="ph">
            <div>Links here:</div>
            <h1>{title}</h1>
            <pre>{JSON.stringify(pageInfo, null, 2)}</pre>
        </section>
    );
}

export default ArticleLinks;
