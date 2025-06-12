const API_URL = "https://en.wikipedia.org/w/api.php";

export const DEFAULT_PARAMS_LINKS_SEARCH = {
    action: "parse",
    prop: "text",
    formatversion: "2",
    origin: "*",
    format: "json",
    redirects: 1,
};

export const wikiUrl = "https://en.wikipedia.org";

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

function isIrrelevantLink(href) {
    return !href || href.startsWith("#") || href.includes(":");
}

function extractLinksFromElement(el) {
    const wikiPathRegex = /^\/wiki\/(.*)$/;

    return Array.from(el.querySelectorAll("a[href]"))
        .map((link) => {
            const href = link.getAttribute("href");
            const text = link.textContent.trim();
            if (isIrrelevantLink(href)) return null;

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

export function getLinksBySection(data) {
    if (!data) return undefined;
    const html = data.parse.text;
    const doc = parseHTML(html);
    console.log(doc);
    // const root = createSection(data.parse.title, 1);
    const root = createSection("Introduction", 1);
    const stack = [root];
    let shouldSkipLinks = false;

    const elements = doc.querySelectorAll(
        "h2, h3, h4, h5, h6, p, ul, ol, tbody" // hardcoded but eh for now
    );
    let tempLinks = [];

    const headerRegex = /^h[2-6]$/;
    elements.forEach((el) => {
        const tag = el.tagName.toLowerCase();

        // is header
        if (headerRegex.test(tag)) {
            // sort by text length for a complete header section
            if (tempLinks.length > 0) {
                tempLinks.sort(
                    (link1, link2) => link1.text.length - link2.text.length
                );
                stack[stack.length - 1].links.push(...tempLinks);
            }
            tempLinks = [];
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
            tempLinks.push(...links);
            // const links = extractLinksFromElement(el);
            // stack[stack.length - 1].links.push(...links);
        }
    });

    return [root];
}

import {
    SMALL_TEST_OBJ,
    BIG_TEST_OBJ,
    PREVIEW_TEST_OBJ,
} from "../lib/constants";

export async function getWikiText(params) {
    console.log("FETCHING...");
    // return BIG_TEST_OBJ;
    // return SMALL_TEST_OBJ;
    return Math.random() > 0.5 ? BIG_TEST_OBJ : SMALL_TEST_OBJ;
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

export async function getWikiSummary(title) {
    console.log("FETCHING PREVIEW...");
    return PREVIEW_TEST_OBJ;
    if (!title) return null; // Don't fetch if there's no title

    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
}
