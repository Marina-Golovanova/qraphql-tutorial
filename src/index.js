import React from "react";
import ReactDOM from "react-dom/client";
import { useApp, useTick } from "./hooks";
import { randomInteger } from "./utils";
import { Tiling } from "./components/Tiling";
import { Sprite } from "./components/Sprite";
import { Stage } from "./components/Stage";

import boy from "./resources/boy.png";
import apple from "./resources/apple.png";
import arrow from "./resources/arrow.png";
import tree1 from "./resources/tree1.png";
import tree2 from "./resources/tree2.png";
import trava100 from "./resources/trava100.png";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Stage width={800} height={600} options={{ backgroundColor: 0xfff000 }}>
    <App />
  </Stage>
);

function App() {
  const [boyY, setBoyY] = React.useState(50);

  const [arrowPosition, setArrowPosition] = React.useState({ x: 900, y: 65 });
  const [applePosition, setApplePosition] = React.useState({ x: 700, y: 30 });
  const [counter, setCounter] = React.useState(0);
  const [appleVisible, setAppleVisible] = React.useState(true);
  const app = useApp();

  const randomForest = React.useMemo(() => {
    const background = [];

    for (let i = 0; i < 25; i++) {
      const number = randomInteger(1, 2);

      const treePosition = {
        x: randomInteger(20, 800),
        y: randomInteger(20, 600),
      };

      background.push({ x: treePosition.x, y: treePosition.y, number });
    }

    return background;
  }, []);

  const handleMouseMove = (e) => {
    setBoyY(e.data.global.y);
  };

  const arrowTicker = (delta) => {
    setArrowPosition((prev) => ({ x: prev.x + 10 * delta, y: prev.y }));
  };

  useTick(arrowTicker);

  const handleClick = React.useCallback((event) => {
    setArrowPosition({ x: 30, y: event.offsetY });
  }, []);

  const getIntersection = React.useCallback((positionA, positionB, size) => {
    const { x: xA, y: yA } = positionA;
    const { x: xB, y: yB } = positionB;

    return xA + size > xB && xA < xB + size && yA + size > yB && yA < yB + size;
  }, []);

  React.useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click");
    };
  }, [handleClick]);

  React.useEffect(() => {
    const isIntersection = getIntersection(arrowPosition, applePosition, 25);
    if (isIntersection && appleVisible) {
      setCounter((prev) => prev + 1);
      setAppleVisible(false);
    }
  }, [applePosition, appleVisible, arrowPosition, getIntersection]);

  React.useEffect(() => {
    setInterval(() => {
      setApplePosition({ x: 700, y: randomInteger(30, 550) });
      setAppleVisible(true);
    }, 2500);
  }, []);

  return (
    <>
      <Tiling
        img={trava100}
        width={app.screen.width}
        height={app.screen.height}
      />

      {randomForest.map(({ x, y, number }, idx) => (
        <Sprite
          img={number === 1 ? tree1 : tree2}
          x={x}
          y={y}
          width={100}
          height={100}
          key={idx}
        />
      ))}

      <Sprite
        x={50}
        y={boyY}
        img={boy}
        width={150}
        height={120}
        anchor={0.5}
        onMouseMove={handleMouseMove}
      />

      <Sprite
        img={arrow}
        width={70}
        height={40}
        x={arrowPosition.x}
        y={arrowPosition.y}
        anchor={0.5}
      />

      {appleVisible && (
        <Sprite
          img={apple}
          width={70}
          height={50}
          x={applePosition.x}
          y={applePosition.y}
          anchor={0.5}
        />
      )}

      <text
        text={counter}
        x={750}
        y={0}
        style={{ fontSize: 48, fill: 0xffffff }}
      />
    </>
  );
}
