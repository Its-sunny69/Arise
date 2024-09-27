import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(4, { message: "Username must be atleast of 4 char." })
    .max(225, { message: "Usename must be 255 char or less" }),

  email: z
    .string({ required_error: "Username is required." })
    .trim()
    .email({ message: "Invalid Email Address" }),

  password: z
    .string({ required_error: "Username is required." })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {message: "- at least 8 characters \n- must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n- Can contain special characters"})
});

export default signupSchema