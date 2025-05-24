const wikiUrl = new URL("https://en.wikipedia.org/wiki/");

function ArticleInfo({ title }) {
    return (
        <div>
            <a href={`${wikiUrl}${title}`} target="_blank">
                Icon to wiki page
            </a>
            <button>{title}</button>
            <a href="#">Further links</a>
        </div>
    );
}

export default ArticleInfo;
