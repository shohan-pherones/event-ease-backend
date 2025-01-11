import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*).",
    }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number.",
    })
    .regex(/[@$!%*?&]/, {
      message:
        "Password must contain at least one special character (!@#$%^&*).",
    }),
});

const refreshTokenSchema = z.string();

const updateUserSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required." }).optional(),
  })
  .partial();

const updateUserRoleSchema = z.object({
  role: z.enum(["user", "admin"], {
    required_error: "Role is required",
    invalid_type_error: "Role must be either 'user' or 'admin'",
  }),
});

export const UserValidations = {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  updateUserSchema,
  updateUserRoleSchema,
};
