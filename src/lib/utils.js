export function extractTitleFromWikiHref(href) {
    return decodeURIComponent(href.substring(href.lastIndexOf("/") + 1));
}
