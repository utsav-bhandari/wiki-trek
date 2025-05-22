function SearchBar({ onSearch, isPending }) {
    console.log("RENDERING SEARCH BAR...");

    return (
        <form action={onSearch}>
            <input type="text" name="search" placeholder="Search Wikipedia" />
            <button type="submit" disabled={isPending}>
                Search svg here
            </button>
        </form>
    );
}

export default SearchBar;
