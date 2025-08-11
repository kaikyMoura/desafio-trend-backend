import { z } from "zod";

/**
 * Schema of the environment variables.
 * @description This schema is used to validate the environment variables.
 */
export const envSchema = z.object({
    PORT: z.coerce.number().default(5000),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string(),
});

/**
 * Type of the environment variables.
 * @description This type is used to validate the environment variables.
 */
export type EnvSchemaType = z.infer<typeof envSchema>;