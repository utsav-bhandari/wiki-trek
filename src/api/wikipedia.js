export const DEFAULT_PARAMS_LINKS_SEARCH = {
    action: "parse",
    format: "json",
    prop: "links",
    formatversion: "2",
    origin: "*",
};

const unrequiredSections = new Set([
    "references",
    "citations",
    "bibliography",
    "notes",
    "external links",
    "further reading",
    "publications",
    "discography",
    "filmography",
    "honours",
    "categories",
    "footnotes",
    "acknowledgements",
    "sources",
]);

const API_URL = "https://en.wikipedia.org/w/api.php";
