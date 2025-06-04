import { wikiUrl } from "../api/wikipedia";

function ArticleSection({ section }) {
    return (
        <article>
            <details>
                <summary>{section.title}</summary>
                <ul id={section.title}>
                    {section.links.map((link, i) => (
                        <li key={i}>
                            <a href={`${wikiUrl}${link.href}`} target="_blank">
                                {link.text}
                            </a>
                        </li>
                    ))}
                </ul>
                {section.children.map((childSection) => (
                    <ArticleSection
                        key={childSection.title}
                        section={childSection}
                    />
                ))}
            </details>
        </article>
    );
}

export default ArticleSection;
