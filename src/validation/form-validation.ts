import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/svg",
];

export const formSchema = z.object({
  name: z.string().min(3),
  univercity: z.string().min(2).max(6),
  degree: z.string().min(8),
  gpa: z.number().min(0).max(4.0),
  medal1: z.string().min(8),
  desc_medal1: z.string().min(8),
  medal2: z.string().min(8),
  desc_medal2: z.string().min(8),
  image: z.any().refine((f) => {
    if (!ACCEPTED_MIME_TYPES.includes(f.type)) {
      return {
        message: `File must be one of [${ACCEPTED_MIME_TYPES.join(
          ", "
        )}] but was ${f.type}`,
      };
    }

    if (f.size > MAX_FILE_SIZE) {
      return {
        message: `The file must not be larger than ${MAX_FILE_SIZE} bytes: ${f.size}`,
      };
    }

    return true; // Return true if the file is valid
  }),
});

export type FormSchema = z.infer<typeof formSchema>;
