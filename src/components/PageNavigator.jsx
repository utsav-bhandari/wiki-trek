function PageNavigator({
    onPrev,
    onNext,
    currentPage,
    totalPages,
    currentPageTitle,
}) {
    // page starts from 1
    const canGoPrev = currentPage - 1 > 0;
    const canGoNext = totalPages > 1 && currentPage - 1 < totalPages - 1;
    return (
        <div className="page-navigator">
            <button onClick={onPrev} disabled={!canGoPrev}>
                &larr; Prev
            </button>
            <div className="page-info">
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <span className="page-title">"{currentPageTitle}"</span>
            </div>
            <button onClick={onNext} disabled={!canGoNext}>
                Next &rarr;
            </button>
        </div>
    );
}

export default PageNavigator;
