import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getWikiSuggestions } from "../api/wikipedia";
import { useDebounce } from "../hooks/useDebounce";
import { Search } from "./Svg";

function SearchBar({ onSearch, isLoading }) {
    console.log("RENDERING SEARCH BAR...");
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(true);

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    // Fetch suggestions using the debounced term
    const { data: suggestions } = useQuery({
        queryKey: ["wikiSuggestions", debouncedSearchTerm],
        queryFn: () => getWikiSuggestions(debouncedSearchTerm),
        enabled: debouncedSearchTerm.length > 0, // Only fetch if there's a search term
        staleTime: 1000 * 60 * 1, // api calls to a minimum
        gcTime: 1000 * 60 * 2, // Cache suggestions for 2 minute
        refetchOnWindowFocus: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        onSearch(searchTerm);

        // Clear input and hide suggestions after search
        setSearchTerm("");
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion) => {
        onSearch(suggestion);

        // Clear input and hide suggestions after click
        setSearchTerm("");
        setShowSuggestions(false);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSubmit} autoComplete="off">
                <input
                    type="text"
                    name="search"
                    placeholder="Search Wikipedia"
                    required
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    // Hide suggestions on blur, with a small delay
                    onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 150)
                    }
                />
                <button type="submit" disabled={isLoading}>
                    <Search />
                </button>
            </form>

            {showSuggestions && suggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onMouseDown={() =>
                                handleSuggestionClick(suggestion)
                            }
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;
