import { wikiUrl } from "../../api/wikipedia";
import { OutLink } from "../Svg";
import { extractTitleFromWikiHref } from "../../lib/utils";

function LinksList({ section, titles, onTitleClick }) {
    const dupLinks = new Set();
    return (
        <ul>
            {section.links.map((link, i) => {
                if (dupLinks.has(link.text.toLocaleLowerCase())) return null;
                dupLinks.add(link.text.toLocaleLowerCase());
                return (
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
                );
            })}
        </ul>
    );
}

export default LinksList;
