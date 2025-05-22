import SearchBar from "./SearchBar";
import ArticleLinks from "./ArticleLinks";
import { useActionState } from "react";

function Main() {
    console.log("RENDERING MAIN...");

    const [query, formAction, isPending] = useActionState(
        logSearchedItem,
        null
    );

    async function logSearchedItem(prevState, formData) {
        await new Promise((res) => setTimeout(res, 2000));
        const searchedItem = formData.get("search");
        console.log(searchedItem);

        return searchedItem;
    }

    function getWikiLinks() {
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Data not found");
                    } else if (response.status === 500) {
                        throw new Error("Server error");
                    } else {
                        throw new Error("Network response was not ok");
                    }
                }
                return response.json();
            })
            .then((data) => {
                outputElement.textContent = JSON.stringify(data, null, 2);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return (
        <main>
            <SearchBar onSearch={formAction} isPending={isPending} />
            <ArticleLinks />
        </main>
    );
}

export default Main;
