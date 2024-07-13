"use client";

import React, { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Dialog } from "../ui/dialog";
import Download from "@/components/section/canvas";

import { createImage } from "@/features/create-image";
import FormInner from "@/features/form-inner";

import { FormSchema, formSchema } from "@/validation/form-validation";

const FormClash = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const outputImgRef = useRef<HTMLImageElement>(null);
  const downloadButtonRef = useRef<HTMLButtonElement>(null);

  const [selectedProductImageFile, setSelectedProductImageFile] =
    useState<File | null>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      univercity: "",
      degree: "",
      gpa: 0,
      medal1: "",
      desc_medal1: "",
      medal2: "",
      desc_medal2: "",
      image: null,
    },
    reValidateMode: "onChange",
  });

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const outputImg = outputImgRef.current;
    const downloadButton = downloadButtonRef.current;

    if (!canvas || !outputImg || !downloadButton) return;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob as Blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "clash-of-champions.png";
      link.click();
      URL.revokeObjectURL(url); // revoke the URL to avoid memory leaks
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0] as File;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setSelectedProductImageFile(file);
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      form.setValue("image", imageDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateImage: SubmitHandler<FormSchema> = async (values) => {
    try {
      setIsLoading(true);
      await createImage({
        canvasRef,
        downloadButtonRef,
        outputImgRef,
        values,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <section id="form">
          <FormInner
            form={form}
            handleGenerateImage={handleGenerateImage}
            handleImageChange={handleImageChange}
            isLoading={isLoading}
            preview={preview}
            selectedProductImageFile={selectedProductImageFile}
          />
        </section>

        <section id="download">
          <Download
            canvasRef={canvasRef}
            downloadButtonRef={downloadButtonRef}
            handleDownload={handleDownload}
            outputImgRef={outputImgRef}
          />
        </section>
      </Dialog>
    </>
  );
};

export default FormClash;
