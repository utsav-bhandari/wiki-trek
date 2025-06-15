import { wikiUrl } from "../api/wikipedia";
import { OutLink } from "./Svg";

function ArticleSection({ section, recurse, onTitleClick }) {
    function handleToggle({ newState, target }) {
        const open = newState === "open";
        const sideBarDetails = document.getElementById(
            `nav-${target.firstChild.id}`
        );
        sideBarDetails.open = open;
        if (open) target.scrollIntoView();
    }

    return (
        <article>
            <details
                onToggle={handleToggle}
                name={section.level}
                data-level={section.level}
            >
                <summary className="links-summary" id={section.title}>
                    <h2>{section.title}</h2>
                </summary>
                <ul className="links-list">
                    {section.links.map((link, i) => (
                        <li key={i}>
                            <a
                                className="out-link"
                                href={`${wikiUrl}${link.href}`}
                                target="_blank"
                                rel="noopener"
                            >
                                <OutLink />
                            </a>
                            <button onClick={() => onTitleClick(link.href)}>
                                {link.text}
                            </button>
                        </li>
                    ))}
                </ul>
                {recurse &&
                    section.children.map((childSection) => (
                        <ArticleSection
                            key={childSection.title}
                            section={childSection}
                            recurse={true}
                            onTitleClick={onTitleClick}
                        />
                    ))}
            </details>
        </article>
    );
}

export default ArticleSection;
