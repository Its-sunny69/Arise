import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required." })
    .trim()
    .min(4, { message: "Username must be atleast of 4 char." })
    .max(20, { message: "Username must be 20 char or less." }),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid Email Address." }),

  password: z
    .string({ required_error: "Password is required." })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, {
      message:
        "Password must contain \n  - at least 8 characters \n - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n - Can contain special characters",
    }),
});

const LoginSchema = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid Email Address." }),

  password: z
    .string({ required_error: "Password is required." })
    .min(1, { message: "Invalid password." }),
});

export { signupSchema, LoginSchema };
