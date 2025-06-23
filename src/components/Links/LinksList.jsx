import { wikiUrl } from "../../api/wikipedia";
import { OutLink } from "../Svg";
import { extractTitleFromWikiHref } from "../../lib/utils";

function LinksList({ section, titles, onTitleClick }) {
    // Using a Set to filter out duplicate links is a great approach.
    const dupLinks = new Set();

    return (
        <ul>
            {section.links.map((link, i) => {
                const lowerCaseText = link.text.toLocaleLowerCase();
                if (dupLinks.has(lowerCaseText)) return null;
                dupLinks.add(lowerCaseText);

                const titleFromHref = extractTitleFromWikiHref(link.href);

                return (
                    <li key={`${titleFromHref}-${i}`}>
                        {/* The primary action is the button, covering most of the card */}
                        <button onClick={() => onTitleClick(link.href)}>
                            {link.text}
                            {titles.has(titleFromHref) && " ✅"}
                        </button>

                        {/* The secondary action is the external link icon */}
                        <a
                            className="out-link"
                            href={`${wikiUrl}${link.href}`}
                            target="_blank"
                            rel="noopener"
                            // Prevents the button's onClick from firing when the icon is clicked
                            onClick={(e) => e.stopPropagation()}
                            title={`Open "${link.text}" in new tab `}
                        >
                            <OutLink />
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default LinksList;
