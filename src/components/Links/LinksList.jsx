import { wikiUrl } from "../../api/wikipedia";
import { OutLink } from "../Svg";
import { extractTitleFromWikiHref } from "../../lib/utils";

function LinksList({ section, titles }) {
    return (
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
                        {titles.has(extractTitleFromWikiHref(link.href)) &&
                            "✅"}
                    </button>
                </li>
            ))}
        </ul>
    );
}

export default LinksList;
