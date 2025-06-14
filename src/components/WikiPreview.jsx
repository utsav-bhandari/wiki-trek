import { wikiUrl } from "../api/wikipedia";

const PREVIEW_THUMBNAIL_DIM = { height: 250, width: 200 };
const PREVIEW_TEXT_DIM = { height: 210, width: 250 };
const CURSOR_OFFSET = 20;
window.onclick = function (e) {
    var evt = e;
    console.log("Mouse position (" + evt.clientX + "," + evt.clientY + ")");
};

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
    const { x: previewContentX, y: previewContentY } = position
        ? calculateOptimalPosition(position.x, position.y)
        : { x: 0, y: 0 };

    const style = {
        position: "fixed",
        top: `${previewContentY}px`,
        left: `${previewContentX}px`,
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

    function calculateOptimalPosition(clientX, clientY) {
        const previewWidth = data?.thumbnail
            ? PREVIEW_TEXT_DIM.width + PREVIEW_THUMBNAIL_DIM.width
            : PREVIEW_TEXT_DIM.width;

        const previewHeight = PREVIEW_THUMBNAIL_DIM.height;
        let top = clientY + CURSOR_OFFSET;
        let left = clientX + CURSOR_OFFSET;

        // Check for right edge collision and flip if necessary
        if (left + previewWidth > window.innerWidth) {
            left = clientX - previewWidth - CURSOR_OFFSET;
        }

        // Check for bottom edge collision and flip if necessary
        if (top + previewHeight > window.innerHeight) {
            top = clientY - previewHeight - CURSOR_OFFSET;
        }

        // Prevent clipping on the top or left edges as well
        if (top < 0) top = CURSOR_OFFSET;
        if (left < 0) left = CURSOR_OFFSET;
        return { x: left, y: top };
    }

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
                                {/* size defined in css */}
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
