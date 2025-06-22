import { wikiUrl } from "../api/wikipedia";
import { OutLink } from "./Svg";
import { getSidbarNavItemId } from "./SideBarItem";
import { extractTitleFromWikiHref } from "../lib/utils";

function ArticleSection({ section, recurse, onTitleClick, titles }) {
    function handleToggle({ newState, target }) {
        const isOpen = newState === "open";
        // get the summary id of the clicked detail
        const sideBarDetails = document.getElementById(
            getSidbarNavItemId(target.firstChild.id)
        );
        sideBarDetails.open = isOpen;
        if (isOpen) target.scrollIntoView();
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
                                className="out-link"
                                href={`${wikiUrl}${link.href}`}
                                target="_blank"
                                rel="noopener"
                            >
                                <OutLink />
                            </a>
                            <button onClick={() => onTitleClick(link.href)}>
                                {link.text}{" "}
                                {titles.has(
                                    extractTitleFromWikiHref(link.href)
                                ) && "✅"}
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
                            titles={titles}
                        />
                    ))}
            </details>
        </article>
    );
}

export default ArticleSection;
