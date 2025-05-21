function SearchBar() {
    console.log("RENDERING SEARCH BAR...");
    return (
        <form action="#">
            <input type="search" name="search" placeholder="Search Wikipedia" />
            <button>Search svg here</button>
        </form>
    );
}

export default SearchBar;
