import * as PIXI from "pixi.js";

export const Sprite = ({ img, ...args }) => {
  const texture = PIXI.Texture.from(img);

  return <sprite texture={texture} {...args} />;
};
