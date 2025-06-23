import { useState, useRef, useLayoutEffect } from "react";
import SearchBar from "./SearchBar";
import Breadcrumbs from "./Breadcrumbs";
import Modal from "../Modal"; // <-- Import the new Modal component

function Header({ onSearch, isLoading, titles, curPageIdx, setCurPageIdx }) {
    // State to control the visibility of the "About" modal
    const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

    // Handler to open the modal and prevent the link's default behavior
    const handleAboutClick = (e) => {
        e.preventDefault();
        setIsAboutModalOpen(true);
    };

    const breadCrumbRef = useRef(null);

    useLayoutEffect(() => {
        if (breadCrumbRef.current) {
            const container = breadCrumbRef.current;
            container.scrollLeft = container.scrollWidth;
        }
    }, [titles]);

    return (
        <>
            <header>
                <div className="search-wrapper">
                    <div className="header-nav">
                        <h1>WiKiTreK</h1>
                        <a href="#" onClick={handleAboutClick}>
                            About
                        </a>
                        <a
                            href="https://github.com/utsav-bhandari/wiki-trek"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Code
                        </a>
                    </div>
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

            {/* The Modal, rendered conditionally based on its state */}
            <Modal
                isOpen={isAboutModalOpen}
                onClose={() => setIsAboutModalOpen(false)}
                title="About WikiTrek"
            >
                <p>
                    Welcome to WikiTrek! This site lets you journey through the
                    vast network of Wikipedia articles through its links.
                </p>
                <p>
                    Start by searching for a topic. Hover over the link icon to
                    preview its contents. Then, click on any card from the
                    article to navigate deeper. Your path is tracked in the
                    breadcrumb trail above, allowing you to easily explore and
                    backtrack on your adventure.
                </p>
                <p>
                    Already visited topics in the current trek will have a ✅
                    next to them for reference.
                </p>
            </Modal>
        </>
    );
}

export default Header;
