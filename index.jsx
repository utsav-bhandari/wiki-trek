import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/styles/index.css";
import "/node_modules/wikipedia-preview/dist/wikipedia-preview.css";
import "/node_modules/wikipedia-preview/dist/wikipedia-preview-link.css";
import WikiTrek from "./src/App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <WikiTrek />
    </StrictMode>
);
