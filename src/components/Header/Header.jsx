import { useLayoutEffect, useRef } from "react";

import SearchBar from "./SearchBar";
import Breadcrumbs from "./Breadcrumbs";
function Header({ onSearch, isLoading, titles, curPageIdx, setCurPageIdx }) {
    console.log("RENDERING HEADER...");

    const breadCrumbRef = useRef(null);

    useLayoutEffect(() => {
        if (breadCrumbRef.current) {
            const container = breadCrumbRef.current;
            container.scrollLeft = container.scrollWidth;
        }
    }, [titles]);

    return (
        <header>
            <div className="search-wrapper">
                <h1>WikiTrek</h1>
                <SearchBar onSearch={onSearch} isLoading={isLoading} />
            </div>
            {titles.length > 0 && (
                <Breadcrumbs
                    titles={titles}
                    curPageIdx={curPageIdx}
                    setCurPageIdx={setCurPageIdx}
                    breadCrumbRef={breadCrumbRef}
                />
            )}
        </header>
    );
}

export default Header;
