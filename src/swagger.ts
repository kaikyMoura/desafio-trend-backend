import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { envConfig } from "./application/config/env.config";

const PORT = envConfig().PORT;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API to manage clients",
    version: "1.0.0",
    description: "API to manage clients",
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development Server"
    },
    {
      url: `https://api.example.com`,
      description: "Production Server"
    }
  ],
  tags: [
    {
      name: "Clients",
      description: "Operations related to clients"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ["./src/presentation/routes/*.ts"],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API to manage clients",
      version: "1.0.0",
      description: "API to manage clients"
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Development Server"
      }
    ]
  }
};

export const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
