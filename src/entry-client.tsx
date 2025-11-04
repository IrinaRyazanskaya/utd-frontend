import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Application } from "./application";
import { setApiToken } from "./api/auth-token";

import "./global-styles.css";

const rootElement = document.getElementById("root")!;
const apiTokenElement = document.getElementById("api-token")!;

const token = apiTokenElement.textContent?.trim();
apiTokenElement.remove();
setApiToken(token);

hydrateRoot(
  rootElement,
  <StrictMode>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </StrictMode>,
);
