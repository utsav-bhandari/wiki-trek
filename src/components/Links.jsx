import { getLinksBySection } from "../api/wikipedia";

function Links({ wikiText }) {
    const sections = getLinksBySection(wikiText);
    return (
        <div>
            <h1>Links by Sections ({sections[0].title})</h1>
            {sections.map(renderSection)}
        </div>
    );
}

const renderSection = (section) => (
    <div
        key={section.title}
        style={{ marginLeft: `${(section.level - 1) * 20}px` }}
    >
        <h2 style={{ fontSize: `${2.2 - (section.level - 1) * 0.2}em` }}>
            {section.title}
        </h2>
        <ul>
            {section.links.map((link, i) => (
                <li key={i}>
                    <a
                        href={`https://en.wikipedia.org${link.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {link.text}
                    </a>
                </li>
            ))}
        </ul>
        {section.children.map(renderSection)}
    </div>
);

export default Links;
