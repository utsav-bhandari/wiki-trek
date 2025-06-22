import { useEffect, useLayoutEffect, useRef } from "react";
import { BreadcrumbSeparator } from "../Svg";

import SearchBar from "./SearchBar";
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
                <nav aria-label="breadcrumb">
                    <ul ref={breadCrumbRef} className="breadcrumb">
                        {titles.map((title, idx) => {
                            const formattedTitle = title.replace(/_/g, " ");
                            const isCur = idx === curPageIdx;

                            return (
                                <li
                                    key={idx}
                                    className={isCur ? "current-page" : ""}
                                >
                                    {idx > 0 && <BreadcrumbSeparator />}

                                    {isCur ? (
                                        <span title={formattedTitle}>
                                            {formattedTitle}
                                        </span>
                                    ) : (
                                        <button
                                            onClick={() => setCurPageIdx(idx)}
                                            title={formattedTitle}
                                        >
                                            {formattedTitle}
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            )}
        </header>
    );
}

export default Header;

// import SearchBar from "./SearchBar";

// function Header({ onSearch, isLoading, titles, setCurPageIdx }) {
//     console.log("RENDERING HEADER...");
//     return (
//         <header>
//             <div className="search-wrapper">
//                 <h1>WikiTrek</h1>
//                 <SearchBar onSearch={onSearch} isLoading={isLoading} />
//             </div>
//             {titles.length > 0 && (
//                 <ul className="breadcrumb">
//                     {titles.map((title, idx) => (
//                         <li>
//                             <button onClick={() => setCurPageIdx(idx)}>
//                                 {title.replace((/_/g, " "))}
//                             </button>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </header>
//     );
// }

// export default Header;
