function SideBarItem({ section }) {
    return (
        <li key={section.title}>
            <a href={`#${section.title}`}>{section.title}</a>
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
        </li>
    );
}

export default SideBarItem;
