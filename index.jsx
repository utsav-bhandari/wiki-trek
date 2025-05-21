import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./src/styles/index.css";
import WikiTrek from "./src/App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <WikiTrek />
    </StrictMode>
);
