// src/components/ArticleSection.js

import { wikiUrl } from "../api/wikipedia";
import { OutLink } from "./Svg";

// Accept the new handler props
function ArticleSection({ section, recurse, onLinkHover, onLinkLeave }) {
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
                <ul>
                    {section.links.map((link, i) => (
                        <li key={i}>
                            <a
                                href={`${wikiUrl}${link.href}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onMouseEnter={(e) => onLinkHover(e, link.href)}
                                onMouseLeave={onLinkLeave}
                            >
                                <OutLink />
                            </a>
                            <button>{link.text}</button>
                        </li>
                    ))}
                </ul>
                {recurse &&
                    section.children.map((childSection) => (
                        <ArticleSection
                            key={childSection.title}
                            section={childSection}
                            recurse={true}
                            onLinkHover={onLinkHover}
                            onLinkLeave={onLinkLeave}
                        />
                    ))}
            </details>
        </article>
    );
}

export default ArticleSection;
