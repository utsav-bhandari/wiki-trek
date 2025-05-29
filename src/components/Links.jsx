import { getLinksBySection } from "../api/wikipedia";

const wikiUrl = "https://en.wikipedia.org";

function Links({ wikiText }) {
    console.log("RENDERING LINKS...");
    const sections = getLinksBySection(wikiText);
    console.log(sections);
    return <div>{sections.map(renderSection)}</div>;
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
                        href={`${wikiUrl}${link.href}`}
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
