import { BreadcrumbSeparator } from "../Svg";

function Breadcrumbs({ titles, curPageIdx, setCurPageIdx, breadCrumbRef }) {
    return (
        <nav aria-label="breadcrumbs">
            <ul ref={breadCrumbRef} className="breadcrumbs">
                {titles.map((title, idx) => {
                    const formattedTitle = title.replace(/_/g, " ");
                    const isCur = idx === curPageIdx;

                    return (
                        <li key={idx} className={isCur ? "current-page" : ""}>
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
    );
}

export default Breadcrumbs;
