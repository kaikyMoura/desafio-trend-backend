import { envSchema, EnvSchemaType } from "../schemas/env.schema";

/**
 * Environment configuration.
 * @description This function is used to validate the environment configuration.
 * @returns The environment configuration.
 */
export const envConfig = (): EnvSchemaType => {
    return envSchema.parse(process.env);
}

/**
 * Type of the environment configuration.
 * @description This type is used to validate the environment configuration.
 */
export type EnvConfigType = ReturnType<typeof envConfig>;