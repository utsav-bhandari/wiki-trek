import { wikiUrl } from "../api/wikipedia";
import { OutLink } from "./Svg";
import { determineSectionHref } from "../lib/utils";

function ArticleSection({ section, pageTitle, recurse, onTitleClick }) {
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
                        className="section-link"
                        href={determineSectionHref(
                            !recurse,
                            pageTitle,
                            section.title
                        )}
                        target="_blank"
                        rel="noopener"
                    >
                        <h2>{recurse ? section.title : "Introduction"}</h2>
                        <OutLink />
                    </a>
                </summary>
                <ul>
                    {section.links.map((link, i) => (
                        <li
                            className="wmf-wp-with-preview"
                            data-wikipedia-preview
                            key={i}
                        >
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
                            pageTitle={pageTitle}
                            recurse={true}
                            onTitleClick={onTitleClick}
                        />
                    ))}
            </details>
        </article>
    );
}

export default ArticleSection;
