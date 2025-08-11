import { PrismaClient } from "@prisma/client";

/**
 * PrismaService is a singleton instance of the PrismaClient class.
 * @description This service is used to connect to the database.
 */
export class PrismaService extends PrismaClient {}
