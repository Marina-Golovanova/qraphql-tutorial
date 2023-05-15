import React from "react";
import * as PIXI from "pixi.js";
import { render } from "../renderer";
import { AppProvider } from "../context";

export const Stage = ({ width, height, options, children }) => {
  const mountStage = React.useCallback(
    (canvas) => {
      const app = new PIXI.Application({
        view: canvas,
        width,
        height,
        ...options,
      });

      const provider = <AppProvider app={app}>{children}</AppProvider>;

      render(provider, app.stage);
    },
    [children, height, options, width]
  );

  return <canvas ref={mountStage} />;
};
