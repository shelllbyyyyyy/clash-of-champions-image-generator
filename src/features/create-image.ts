import { drawText } from "./draw";

type CreateImageProps = {
  values: {
    degree: string;
    desc_medal1: string;
    desc_medal2: string;
    gpa: number;
    image?: any;
    medal1: string;
    medal2: string;
    name: string;
    univercity: string;
  };
  canvasRef: React.RefObject<HTMLCanvasElement>;
  outputImgRef: React.RefObject<HTMLImageElement>;
  downloadButtonRef: React.RefObject<HTMLButtonElement>;
};

export const createImage = async ({
  downloadButtonRef,
  canvasRef,
  outputImgRef,
  values,
}: CreateImageProps) => {
  const {
    degree,
    desc_medal1,
    desc_medal2,
    gpa,
    image,
    medal1,
    medal2,
    name,
    univercity,
  } = values;
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext("2d");
  const outputImg = outputImgRef.current;
  const downloadButton = downloadButtonRef.current;

  if (!canvas || !ctx || !outputImg || !downloadButton) return;

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  const loadFont = async (name: string, url: string) => {
    const font = new FontFace(name, `url(${url})`);
    return font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    });
  };

  await Promise.all([
    loadFont("moby", "/assets/fonts/moby-reg.ttf"),
    loadFont("gaboedBold", "/assets/fonts/gaboed-bold.ttf"),
    loadFont("gaboedThin", "/assets/fonts/gaboed-thin.ttf"),
  ]);

  const img = await loadImage("/assets/images/template.webp");
  ctx.drawImage(img, 0, 0, 1024, 1080);

  const centerImage = await loadImage(image);
  const desiredWidth = 500;
  const desiredHeight = 600;
  const scale = Math.min(
    desiredWidth / centerImage.width,
    desiredHeight / centerImage.height
  );
  const newWidth = centerImage.width * scale;
  const newHeight = centerImage.height * scale;
  const centerX = (canvas.width - newWidth) / 2;
  const centerY = (canvas.height - newHeight) / 2;
  ctx.drawImage(centerImage, centerX, centerY, newWidth, newHeight);

  const arrName = name.toUpperCase().split("");
  drawText(ctx, "", 100, 500, 200, "moby", 80, "#f5ca02", "center", arrName);
  drawText(
    ctx,
    univercity.toUpperCase(),
    155,
    915,
    200,
    "gaboedBold",
    40,
    "#ffffff"
  );
  drawText(ctx, degree, 480, 915, 350, "gaboedBold", 40, "#ffffff");
  drawText(ctx, gpa.toString(), 760, 925, 350, "gaboedBold", 40, "#ffffff");

  drawText(ctx, "   / 4.0", 820, 925, 350, "gaboedThin", 40, "#ffffff");

  drawText(
    ctx,
    medal2.toUpperCase(),
    145,
    993,
    350,
    "gaboedBold",
    22,
    "#f5ca02",
    "left"
  );
  drawText(
    ctx,
    desc_medal2.toUpperCase(),
    145,
    1020,
    380,
    "gaboedThin",
    22,
    "#ffffff",
    "left"
  );
  drawText(
    ctx,
    medal1.toUpperCase(),
    650,
    993,
    350,
    "gaboedBold",
    22,
    "#f5ca02",
    "left"
  );
  drawText(
    ctx,
    desc_medal1.toUpperCase(),
    650,
    1020,
    380,
    "gaboedThin",
    22,
    "#ffffff",
    "left"
  );

  outputImg.src = canvas.toDataURL();
  outputImg.style.display = "block";
  downloadButton.style.display = "inline-block";
};
