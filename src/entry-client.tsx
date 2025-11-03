import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Application } from "./application";

import "./global-styles.css";

const container = document.getElementById("root")!;

hydrateRoot(
  container,
  <StrictMode>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </StrictMode>,
);
