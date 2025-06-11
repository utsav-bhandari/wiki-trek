function WikiPreview({
    isVisible,
    position,
    isLoading,
    isError,
    error,
    data,
    onMouseEnter,
    onMouseLeave,
}) {
    if (!isVisible) {
        return null;
    }

    const style = {
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: "350px",
        maxHeight: "300px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        overflowY: "auto",
    };

    const renderContent = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (isError) {
            return <p style={{ color: "red" }}>{error.message}</p>;
        }
        if (data) {
            return (
                <>
                    <h4 style={{ margin: 0, fontSize: "1rem" }}>
                        {data.title}
                    </h4>
                    {data.thumbnail && (
                        <img
                            src={data.thumbnail.source}
                            alt={data.title}
                            style={{
                                width: "100px",
                                float: "right",
                                marginLeft: "1rem",
                                marginBottom: "0.5rem",
                            }}
                        />
                    )}
                    <p
                        dangerouslySetInnerHTML={{ __html: data.extract_html }}
                        style={{ fontSize: "0.875rem", margin: 0 }}
                    />
                </>
            );
        }
        return null;
    };

    return (
        <div
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {renderContent()}
        </div>
    );
}

export default WikiPreview;
