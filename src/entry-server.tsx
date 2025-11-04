import { StrictMode } from "react";
import { StaticRouter } from "react-router";
import { renderToPipeableStream, type PipeableStream } from "react-dom/server";

import { Application } from "./application";

type RenderResult = {
  stream: PipeableStream;
};

function render(url: string): RenderResult {
  const stream = renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={url}>
        <Application />
      </StaticRouter>
    </StrictMode>,
  );

  return { stream };
}

export { render };
export type { RenderResult };
