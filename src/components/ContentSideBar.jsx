import SideBarItem from "./SideBarItem";

function ContentSideBar({ linksBySection }) {
    console.log("RENDERING CONTENT SIDEBAR...");

    const topSection = linksBySection[0];
    const articleHeader = topSection.title;

    return (
        <div className="sticky-sidebar-wrapper">
            <nav className="content-sidebar">
                <div className="sidebar-header">
                    <h2>Contents</h2>
                </div>
                <ul className="sidebar-list">
                    <div id="sidebar-top">
                        <a href="#">(Top)</a>
                    </div>
                    {/* Render the top-level items using SideBarItem */}
                    {topSection.children.map((section) => (
                        <SideBarItem key={section.title} section={section} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ContentSideBar;
