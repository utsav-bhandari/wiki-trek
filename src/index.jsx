import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import WikiTrek from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <WikiTrek />
    </StrictMode>
);
