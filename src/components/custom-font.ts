import localFont from "next/font/local";

const GaboedBold = localFont({
  src: "../../public/assets/fonts/gaboed-bold.ttf",
  variable: "--font-gaboed-bold",
  display: "swap",
});

const GaboedThin = localFont({
  src: "../../public/assets/fonts/gaboed-thin.ttf",
  variable: "--font-gaboed-thin",
  display: "swap",
});

const Gaboed = localFont({
  src: "../../public/assets/fonts/gaboed.ttf",
  variable: "--font-gaboed",
  display: "swap",
});

const Moby = localFont({
  src: "../../public/assets/fonts/moby-reg.ttf",
  variable: "--font-moby",
  display: "swap",
});

export const fonts = {
  gaboedBold: GaboedBold.style.fontFamily,
  gaboedThin: GaboedThin.style.fontFamily,
  moby: Moby.style.fontFamily,
};
