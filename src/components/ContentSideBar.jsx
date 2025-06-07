import SideBarItem from "./SideBarItem";

function ContentSideBar({ linksBySection }) {
    console.log("RENDERING CONTENT SIDEBAR...");

    const topSection = linksBySection[0];

    return (
        <div id="sticky-sidebar-wrapper">
            <nav className="content-sidebar">
                <header className="sidebar-header">
                    <h2>Contents</h2>
                </header>
                <ul className="sidebar-list">
                    {/* intro item */}
                    <SideBarItem
                        key={topSection.title}
                        section={topSection}
                        recurse={false}
                    />

                    {topSection.children.map((section) => (
                        <SideBarItem
                            key={section.title}
                            section={section}
                            recurse={true}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
}

export default ContentSideBar;
