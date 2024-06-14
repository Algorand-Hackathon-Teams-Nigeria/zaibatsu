import { z } from "zod";

export const validZodNumber = () => {
	return z.string().refine(
		(v) => {
			let n = Number(v);
			return !isNaN(n) && v?.length > 0;
		},
		{ message: "Invalid number" },
	);
};
