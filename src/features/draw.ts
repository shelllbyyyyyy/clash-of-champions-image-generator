import { fonts } from "@/components/custom-font";

export const getTextWidth = (
  ctx: CanvasRenderingContext2D,
  text: string,
  fontSize: number,
  font: keyof typeof fonts
): number => {
  ctx.font = `${fontSize}px ${fonts[font]}`;
  return ctx.measureText(text).width;
};

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  font: keyof typeof fonts,
  initialSize: number,
  color: string,
  align: CanvasTextAlign = "center",
  arr?: string[]
) => {
  let fontSize = initialSize;

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${font}`;
  ctx.textAlign = align;

  while (getTextWidth(ctx, text, fontSize, font) > maxWidth) {
    fontSize -= 1;
  }
  ctx.fillText(text, x, y);

  if (arr && arr.length) {
    fontSize = Math.max(40, initialSize - (arr.length - 6) * 5);
    const lineHeight = fontSize + 15;
    const yStart = y - ((arr.length - 1) * lineHeight) / 2;
    for (let i = 0; i < arr.length; i++) {
      ctx.fillText(arr[i], x, yStart + i * lineHeight);
    }
  }
};
