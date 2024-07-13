import React from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

import CustomFormField, { FormFieldType } from "@/components/custom-form";
import { FileUploader } from "@/components/file-uploader";
import SubmitButton from "@/components/submit-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSchema } from "@/validation/form-validation";

type FormInnerProps = {
  form: UseFormReturn<FormSchema, any, undefined>;
  handleGenerateImage: SubmitHandler<FormSchema>;
  handleImageChange: React.ChangeEventHandler<HTMLInputElement>;
  preview: string;
  selectedProductImageFile: File | null | undefined;
  isLoading: boolean;
};

const FormInner: React.FC<FormInnerProps> = ({
  form,
  handleGenerateImage,
  handleImageChange,
  preview,
  selectedProductImageFile,
  isLoading,
}) => {
  return (
    <>
      <Card className="w-full shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleGenerateImage)}>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">
                Clash of Champions
              </CardTitle>
              <CardDescription>
                Custom image generator by shelllbyyyyy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="name"
                  label="Nama"
                  type="text"
                  placeholder="Masukan nama kamu"
                />
              </div>
              <div className="flex items-center justify-between gap-5">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="univercity"
                  label="Universitas"
                  type="text"
                  placeholder="Singkatan e.g. UI, ITB etc."
                />

                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="degree"
                  label="Fakultas"
                  type="text"
                  placeholder="e.g. Teknik Informatika"
                />
              </div>
              <div className="space-y-1">
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="gpa"
                  label="IPK"
                  type="number"
                  placeholder="IPK"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <Input
                        {...form.register("gpa", {
                          valueAsNumber: true,
                        })}
                      />
                    </FormControl>
                  )}
                />
              </div>
              <div className="flex items-center justify-between gap-5">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="medal1"
                  label="Medal 1"
                  type="text"
                  placeholder="e.g. Gold Medal"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="desc_medal1"
                  label="Deskripsi Medal 1"
                  type="text"
                  placeholder="e.g. Lomba ngehalu"
                />
              </div>
              <div className="flex justify-between items-center gap-5">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="medal2"
                  label="Medal 2"
                  type="text"
                  placeholder="e.g. Silver medal"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="desc_medal2"
                  label="Deskripsi Medal 2"
                  type="text"
                  placeholder="e.g. Lomba mengejar harapan palsu"
                />
              </div>
              <div className="space-y-1">
                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="image"
                  label="Upload Photo"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <FileUploader
                        handleImageChange={handleImageChange}
                        preview={preview}
                        selectedProductImageFile={selectedProductImageFile}
                      />
                    </FormControl>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <DialogTrigger asChild>
                <SubmitButton isLoading={isLoading}>Generate</SubmitButton>
              </DialogTrigger>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default FormInner;
