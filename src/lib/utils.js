import { wikiUrl } from "../api/wikipedia";

export function determineSectionHref(isTopLevel, pageTitle, sectionTitle) {
    if (isTopLevel) {
        return `${wikiUrl}/wiki/${pageTitle}#`;
    }
    return `${wikiUrl}/wiki/${pageTitle}#${sectionTitle.replace(/ /g, "_")}`;
}

export function extractTitleFromWikiHref(href) {
    return decodeURIComponent(href.substring(href.lastIndexOf("/") + 1));
}
