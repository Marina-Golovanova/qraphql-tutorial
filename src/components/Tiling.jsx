import * as PIXI from "pixi.js";

export const Tiling = ({ img, ...args }) => {
  const texture = PIXI.Texture.from(img);

  return <tiling texture={texture} {...args} />;
};
