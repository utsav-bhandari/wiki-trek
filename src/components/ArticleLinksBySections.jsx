import ArticleSection from "./ArticleSection";
import { wikiUrl } from "../api/wikipedia";

function ArticleLinksBySections({ linksBySection }) {
    console.log("RENDERING LINKS_BY_SECTIONS...");
    console.log(linksBySection[0].children);

    const introSection = linksBySection[0];
    return (
        <section>
            <article>
                <details>
                    <summary>{introSection.title}</summary>
                    <ul id={introSection.title}>
                        {introSection.links.map((link, i) => (
                            <li key={i}>
                                <a
                                    href={`${wikiUrl}${link.href}`}
                                    target="_blank"
                                >
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </details>
            </article>
            {introSection.children.map((section) => {
                return <ArticleSection key={section.title} section={section} />;
            })}
        </section>
    );
}

export default ArticleLinksBySections;
