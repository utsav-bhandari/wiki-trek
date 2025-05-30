const wikiUrl = "https://en.wikipedia.org";

const ArticleSection = ({ section }) => {
    return (
        <div
            key={section.title}
            style={{ marginLeft: `${(section.level - 1) * 20}px` }}
        >
            <h2
                id={section.title}
                style={{ fontSize: `${2.2 - (section.level - 1) * 0.2}em` }}
            >
                {section.title}
            </h2>
            <ul>
                {section.links.map((link, i) => (
                    <li key={i}>
                        <a href={`${wikiUrl}${link.href}`} target="_blank">
                            {link.text}
                        </a>
                    </li>
                ))}
            </ul>
            {/* Recursively render child sections */}
            {section.children.map((childSection) => (
                <ArticleSection
                    key={childSection.title}
                    section={childSection}
                />
            ))}
        </div>
    );
};

export default ArticleSection;
