import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type DownloadProps = {
  canvasRef: React.LegacyRef<HTMLCanvasElement> | undefined;
  outputImgRef: React.LegacyRef<HTMLImageElement> | undefined;
  downloadButtonRef: React.LegacyRef<HTMLButtonElement> | undefined;
  handleDownload: () => void;
};

const Download: React.FC<DownloadProps> = ({
  canvasRef,
  downloadButtonRef,
  outputImgRef,
  handleDownload,
}) => {
  return (
    <DialogContent className="sm:max-w-[425px] flex flex-col justify-center items-center bg-dark-400 ">
      <DialogHeader>
        <DialogTitle className="text-center">
          Image generated successfully{" "}
        </DialogTitle>
        <DialogDescription className="text-center">
          Thank you for using this apps 😊
        </DialogDescription>
      </DialogHeader>
      <canvas
        width="1024"
        height="1080"
        ref={canvasRef}
        style={{ display: "none" }}
      ></canvas>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={outputImgRef}
          alt=""
          className="max-w-xs h-auto rounded-lg shadow-xl"
        />
      }
      <button
        ref={downloadButtonRef}
        style={{ display: "none" }}
        onClick={handleDownload}
        className="w-full border border-green-500 rounded-md py-2 text-green-500 hover:bg-green-900"
      >
        Download Image
      </button>
    </DialogContent>
  );
};

export default Download;
