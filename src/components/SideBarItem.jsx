function SideBarItem({ section }) {
    return (
        <li key={section.title}>
            <details>
                <summary>
                    <a href={`#${section.title}`}>{section.title}</a>
                </summary>
                {section.children.length > 0 && (
                    <ul className="sidebar-sublist">
                        {/* Recursively render children using SideBarItem */}
                        {section.children.map((childSection) => (
                            <SideBarItem
                                key={childSection.title}
                                section={childSection}
                            />
                        ))}
                    </ul>
                )}
            </details>
        </li>
    );
}

export default SideBarItem;
