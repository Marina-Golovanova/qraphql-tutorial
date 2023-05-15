import React from "react";
import { AppContext } from "./context";

export const useApp = () => {
  const app = React.useContext(AppContext);

  return app;
};

export const useTick = (fn) => {
  const { ticker } = useApp();

  React.useEffect(() => {
    ticker.add(fn);

    return () => {
      ticker.remove(fn);
    };
  }, [fn, ticker]);
};
