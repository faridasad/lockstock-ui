import { decode } from "blurhash";

const decodeImg = (blurhash: string, width: number, height: number) => {
  const pixels = decode(blurhash, width, height);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(width, height);
  imageData.data.set(pixels);
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

export default decodeImg;
