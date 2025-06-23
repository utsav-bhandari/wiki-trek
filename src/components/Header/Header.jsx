import { useState } from "react";
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
                    {/* The new container for the title and nav links */}
                    <div className="header-nav">
                        <h1>WiKiTreK</h1>
                        <a href="#" onClick={handleAboutClick}>
                            About
                        </a>
                        <a
                            href="https://github.com"
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
                    vast network of Wikipedia articles.
                </p>
                <p>
                    Start by searching for a topic. Then, click on any link from
                    the article to navigate deeper. Your path is tracked in the
                    breadcrumb trail above, allowing you to easily explore and
                    backtrack on your intellectual adventure.
                </p>
            </Modal>
        </>
    );
}
