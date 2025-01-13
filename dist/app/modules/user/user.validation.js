"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required." }),
    email: zod_1.z.string().email({ message: "Invalid email format." }),
    password: zod_1.z
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
        message: "Password must contain at least one special character (!@#$%^&*).",
    }),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format." }),
    password: zod_1.z
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
        message: "Password must contain at least one special character (!@#$%^&*).",
    }),
});
const refreshTokenSchema = zod_1.z.string();
const updateUserSchema = zod_1.z
    .object({
    name: zod_1.z.string().min(1, { message: "Name is required." }).optional(),
})
    .partial();
const updateUserRoleSchema = zod_1.z.object({
    role: zod_1.z.enum(["user", "admin"], {
        required_error: "Role is required",
        invalid_type_error: "Role must be either 'user' or 'admin'",
    }),
});
exports.UserValidations = {
    registerSchema,
    loginSchema,
    refreshTokenSchema,
    updateUserSchema,
    updateUserRoleSchema,
};
