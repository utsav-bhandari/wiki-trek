// src/components/ArticleSection.js

import { wikiUrl } from "../api/wikipedia";
import { OutLink } from "./Svg";
import { determineSectionHref } from "../lib/utils";

// Accept the new handler props
function ArticleSection({
    section,
    pageTitle,
    recurse,
    onLinkHover,
    onLinkLeave,
    onTitleClick,
}) {
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
                    <a
                        href={determineSectionHref(
                            !recurse,
                            pageTitle,
                            section.title
                        )}
                        style={{ color: "black" }}
                        target="_blank"
                        rel="noopener"
                    >
                        <h2>{recurse ? section.title : "Introduction"}</h2>
                    </a>
                </summary>
                <ul>
                    {section.links.map((link, i) => (
                        <li key={i}>
                            <a
                                href={`${wikiUrl}${link.href}`}
                                target="_blank"
                                rel="noopener"
                                onMouseEnter={(e) => onLinkHover(e, link.href)}
                                onMouseLeave={onLinkLeave}
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
                            pageTitle={pageTitle}
                            recurse={true}
                            onLinkHover={onLinkHover}
                            onLinkLeave={onLinkLeave}
                            onTitleClick={onTitleClick}
                        />
                    ))}
            </details>
        </article>
    );
}

export default ArticleSection;
