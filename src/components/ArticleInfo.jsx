const wikiUrl = new URL("https://en.wikipedia.org/wiki/");

function ArticleInfo({ onLoadFurtherLinks, title }) {
    return (
        <div className="artcl-info-cntnr">
            <a href={`${wikiUrl}${title}`} target="_blank">
                Icon
            </a>
            <button>{title}</button>
            <button
                className="frthr-lnks-btn"
                onClick={() => onLoadFurtherLinks(title)}
            >
                further links
            </button>
        </div>
    );
}

export default ArticleInfo;
