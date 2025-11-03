import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { renderToString } from "react-dom/server";

import { Application } from "./application";

type RenderResult = {
  html: string;
};

function render(url: string): RenderResult {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Application />
      </StaticRouter>
    </StrictMode>,
  );

  return { html };
}

export { render };
export type { RenderResult };
