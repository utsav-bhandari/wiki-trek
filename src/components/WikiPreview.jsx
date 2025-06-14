import { wikiUrl } from "../api/wikipedia";

function WikiPreview({
    isVisible,
    position,
    isLoading,
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
        maxHeight: "250px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        display: "flex",
        overflow: "hidden",
        color: "black",
        textDecoration: "none",
    };

    const renderContent = () => {
        if (isLoading) {
            return <p>Loading...</p>;
        }
        if (error) {
            return <p style={{ color: "red" }}>{error.message}</p>;
        }
        if (data) {
            return (
                <>
                    <div
                        dangerouslySetInnerHTML={{ __html: data.extract_html }}
                        style={{
                            fontSize: "0.875rem",
                            margin: "16px",
                            maxWidth: "250px",
                            maxHeight: "210px",
                            overflowY: "auto",
                        }}
                    />
                    {data.thumbnail && (
                        <>
                            <div className="thumbnail-cntnr">
                                <img
                                    className="preview-thumbnail"
                                    src={data.thumbnail.source}
                                    alt={data.title}
                                />
                            </div>
                        </>
                    )}
                </>
            );
        }
        return null;
    };

    return (
        <a
            href={`${wikiUrl}/wiki/${data?.title}`}
            target="_blank"
            style={style}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {renderContent()}
        </a>
    );
}

export default WikiPreview;
