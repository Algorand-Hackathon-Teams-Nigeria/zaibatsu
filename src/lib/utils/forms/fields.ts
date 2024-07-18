import { z } from "zod";

export const validZodNumber = (message = "Invalid number") => {
  return z.string().refine(
    (v) => {
      let n = Number(v);
      return !isNaN(n) && v?.length > 0;
    },
    { message },
  );
};
