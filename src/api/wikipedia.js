import { BIG_TEST_OBJ, SMALL_TEST_OBJ } from "../lib/constants";

export const DEFAULT_PARAMS_LINKS_SEARCH = {
    action: "parse",
    format: "json",
    prop: "links",
    formatversion: "2",
    origin: "*",
    redirects: "1",
};

const API_URL = "https://en.wikipedia.org/w/api.php";
export const getWikiLinks = async (params) => {
    console.log("FETCHING...");

    // debug or styling purposes
    await new Promise((res) => setTimeout(res, 500));
    // return new Promise((res, rej) =>
    //     rej(new Error("Simulated error for testing"))
    // );
    return SMALL_TEST_OBJ;
    // return BIG_TEST_OBJ;

    // actual logic
    // const url = new URL(API_URL);
    // url.search = new URLSearchParams(params).toString();
    // const links_endpoint = url.toString();

    // const res = await fetch(links_endpoint);
    // return res.json();
};
