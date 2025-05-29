import SearchBar from "./SearchBar";

function Header({ onSearch, isLoading }) {
    console.log("RENDERING HEADER...");
    return (
        <header>
            <h1>WikiTrek</h1>
            <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </header>
    );
}

export default Header;
