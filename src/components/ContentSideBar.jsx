import SideBarItem from "./SideBarItem";

function ContentSideBar({ linksBySection }) {
    console.log("RENDERING CONTENT SIDEBAR...");

    const topSection = linksBySection[0];
    const articleHeader = topSection.title;

    return (
        <div id="sticky-sidebar-wrapper">
            <nav className="content-sidebar">
                <header className="sidebar-header">
                    <h2>Contents</h2>
                </header>
                <ul className="sidebar-list">
                    <li>
                        <a href="#">(Top)</a>
                    </li>
                    {topSection.children.map((section) => (
                        <SideBarItem key={section.title} section={section} />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ContentSideBar;
