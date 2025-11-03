import { createRoot } from "react-dom/client";

import { Application } from "./application";

import "./styles.css";

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(<Application />);
