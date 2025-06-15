function SideBarItem({ section, recurse }) {
    return (
        <li key={section.title}>
            <details id={getSidbarNavItemId(section.title)}>
                <summary>
                    <a href={`#${section.title}`}>
                        {!recurse ? "(Top)" : section.title}
                    </a>
                </summary>
                {section.children.length > 0 && recurse && (
                    <ul className="sidebar-sublist">
                        {/* Recursively render children using SideBarItem */}
                        {section.children.map((childSection) => (
                            <SideBarItem
                                key={childSection.title}
                                section={childSection}
                                recurse={true}
                            />
                        ))}
                    </ul>
                )}
            </details>
        </li>
    );
}

export function getSidbarNavItemId(title) {
    return `nav-${title}`;
}

export default SideBarItem;
