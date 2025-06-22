import { getSidbarNavItemId } from "../SideBar/SideBarItem";
import LinksList from "./LinksList";

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
                <LinksList section={section} titles={titles} />
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
