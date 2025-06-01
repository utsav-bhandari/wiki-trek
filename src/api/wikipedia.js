function parseHTML(html) {
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

function createSection(title, level) {
    return {
        title,
        level,
        links: [],
        children: [],
    };
}

function trimStackToLevel(stack, level) {
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
    }
}

function isContentTag(tag) {
    const validTags = ["p", "ul", "ol", "tbody"];
    return validTags.includes(tag);
}

function extractLinksFromElement(el) {
    const wikiPathRegex = /^\/wiki\/(.*)$/;

    return Array.from(el.querySelectorAll("a[href]"))
        .map((link) => {
            const href = link.getAttribute("href");
            const text = link.textContent.trim();

            if (!href || href.startsWith("#") || !text) return null;

            let displayText = text;
            const match = href.match(wikiPathRegex);

            if (match && match[1]) {
                const decodedHref = decodeURIComponent(match[1]).replace(
                    /_/g,
                    " "
                );
                if (decodedHref.length > text.length) {
                    displayText = decodedHref;
                }
            }

            return { href, text: displayText };
        })
        .filter(Boolean); // filter truthy hack
}

export const DEFAULT_PARAMS_LINKS_SEARCH = {
    action: "parse",
    prop: "text",
    formatversion: "2",
    origin: "*",
    format: "json",
    redirects: 1,
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
    "other sources",
]);

const API_URL = "https://en.wikipedia.org/w/api.php";
// "https://en.wikipedia.org/w/api.php?action=parse&page=Philosophy&prop=text&formatversion=2&origin=*&format=json";

export function getLinksBySection(data) {
    if (!data) return undefined;
    const html = data.parse.text;
    const doc = parseHTML(html);
    // const root = createSection(data.parse.title, 1);
    const root = createSection("Introduction", 1);
    const stack = [root];
    let shouldSkipLinks = false;

    const elements = doc.querySelectorAll(
        "h2, h3, h4, h5, h6, p, ul, ol, tbody" // hardcoded but eh for now
    );

    elements.forEach((el) => {
        const tag = el.tagName.toLowerCase();

        // is header
        if (/^h[2-6]$/.test(tag)) {
            const heading = el.textContent.trim();
            if (!heading) return;

            // get heading level
            const level = parseInt(tag[1]);
            const lcaseHeading = heading.toLowerCase();

            // filter references and such sections
            if (unrequiredSections.has(lcaseHeading)) {
                shouldSkipLinks = true;
                return;
            }

            // create level hierarchy
            trimStackToLevel(stack, level); // mutating function

            const newSection = createSection(heading, level);
            stack[stack.length - 1].children.push(newSection);
            stack.push(newSection);

            shouldSkipLinks = false;
        } else if (isContentTag(tag) && !shouldSkipLinks) {
            const links = extractLinksFromElement(el);
            stack[stack.length - 1].links.push(...links);
        }
    });

    return [root];
}

import { SMALL_TEST_OBJ, BIG_TEST_OBJ } from "../lib/constants";

export async function getWikiText(params) {
    console.log("FETCHING...");
    // return BIG_TEST_OBJ;
    return SMALL_TEST_OBJ;
    const url = new URL(API_URL);
    url.search = new URLSearchParams(params).toString();
    const linksEndpoint = url.toString();

    const res = await fetch(linksEndpoint);

    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    // Check if the response contains an error field (e.g., missing title)
    if (data.error) {
        throw new Error(data.error.info);
    }

    // cache with calculation duh!
    return getLinksBySection(data);
}
