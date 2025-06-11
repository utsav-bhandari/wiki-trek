function SearchBar({ onSearch, isLoading }) {
    console.log("RENDERING SEARCH BAR...");

    return (
        <form action={onSearch}>
            <input
                type="text"
                autoComplete="off"
                name="search"
                placeholder="Search Wikipedia"
                required
            />
            <button type="submit" disabled={isLoading}>
                img
            </button>
        </form>
    );
}

export default SearchBar;
