import ReactDOM from "react-dom";

import { Application } from "./application";

import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.render(<Application />, rootElement);
