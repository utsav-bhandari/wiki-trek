import { useEffect, useState } from "react";
import TEST_OBJ from "../lib/constants";
// const unrequiredSections = new Set([
//     "references",
//     "citations",
//     "bibliography",
//     "notes",
//     "external links",
//     "further reading",
// ]);

const WikipediaLinksBySection = () => {
    // const [sections, setSections] = useState([]);

    // useEffect(() => {
    //     const fetchWikipedia = async () => {
    //         const url =
    //             "https://en.wikipedia.org/w/api.php?action=parse&page=Philosophy&prop=text&formatversion=2&origin=*&format=json";

    //         const unrequiredSections = new Set([
    //             "references",
    //             "citations",
    //             "bibliography",
    //             "notes",
    //             "external links",
    //             "further reading",
    //             "publications",
    //             "discography",
    //             "filmography",
    //             "honours",
    //             "categories",
    //             "footnotes",
    //             "acknowledgements",
    //             "other sources",
    //         ]);

    //         try {
    //             const res = await fetch(url);
    //             const data = await res.json();
    //             const html = data.parse.text;

    //             const parser = new DOMParser();
    //             const doc = parser.parseFromString(html, "text/html");

    //             const root = {
    //                 title: data.parse.title,
    //                 level: 1,
    //                 links: [],
    //                 children: [],
    //             };
    //             const stack = [root];
    //             let shouldSkipLinks = false;

    //             const elements = doc.querySelectorAll(
    //                 "h2, h3, h4, h5, h6, p, ul, ol"
    //             );

    //             elements.forEach((el) => {
    //                 const tag = el.tagName.toLowerCase();

    //                 if (/^h[2-6]$/.test(tag)) {
    //                     const heading = el.textContent.trim();
    //                     if (!heading) return;

    //                     const level = parseInt(tag[1]);
    //                     const lcaseHeading = heading.toLowerCase();

    //                     if (unrequiredSections.has(lcaseHeading)) {
    //                         shouldSkipLinks = true;
    //                         return;
    //                     }

    //                     // Pop from stack until we find the correct parent level
    //                     while (
    //                         stack.length > 0 &&
    //                         stack[stack.length - 1].level >= level
    //                     ) {
    //                         stack.pop();
    //                     }

    //                     const newSection = {
    //                         title: heading,
    //                         level,
    //                         links: [],
    //                         children: [],
    //                     };

    //                     stack[stack.length - 1].children.push(newSection);
    //                     stack.push(newSection);

    //                     shouldSkipLinks = false;
    //                 } else if (
    //                     (tag === "p" || tag === "ul" || tag === "ol") &&
    //                     !shouldSkipLinks
    //                 ) {
    //                     const links = el.querySelectorAll("a[href]");
    //                     links.forEach((link) => {
    //                         const wikiPathRegex = /^\/wiki\/(.*)$/; // /wiki/<this is captured>

    //                         const href = link.getAttribute("href");
    //                         const text = link.textContent.trim();

    //                         if (href && !href.startsWith("#") && text) {
    //                             const match = href.match(wikiPathRegex);
    //                             let displayText = text; // Default to the link's text content

    //                             if (match && match[1]) {
    //                                 const capturedHrefText = decodeURIComponent(
    //                                     match[1]
    //                                 ).replace(/_/g, " "); // Decode and replace underscores

    //                                 // If the captured text from href is longer, or if the original text is short/generic,
    //                                 if (capturedHrefText.length > text.length) {
    //                                     displayText = capturedHrefText;
    //                                 }
    //                             }

    //                             stack[stack.length - 1].links.push({
    //                                 href,
    //                                 text: displayText,
    //                             });
    //                         }
    //                     });
    //                 }
    //             });

    //             setSections([root]);
    //         } catch (err) {
    //             console.error("Error fetching or parsing:", err);
    //         }
    //     };

    //     fetchWikipedia();
    // }, []);
    const sections = TEST_OBJ;
    const renderSection = (section) => (
        <div
            key={section.title}
            style={{ marginLeft: `${(section.level - 1) * 20}px` }}
        >
            <h2 style={{ fontSize: `${2.2 - (section.level - 1) * 0.2}em` }}>
                {section.title}
            </h2>
            <ul>
                {section.links.map((link, i) => (
                    <li key={i}>
                        <a
                            href={`https://en.wikipedia.org${link.href}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {link.text}
                        </a>
                    </li>
                ))}
            </ul>
            {section.children.map(renderSection)}
        </div>
    );

    return (
        <div>
            <h1>Links by Section ({sections?.[0]?.title})</h1>
            {sections.map(renderSection)}
        </div>
    );
};

export default WikipediaLinksBySection;
