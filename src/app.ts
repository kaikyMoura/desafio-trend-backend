import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import clientRoutes from "./presentation/routes/client.routes";
import { swaggerSpec } from "./swagger";
import { errorHandler } from "./presentation/middlewares/error-handler.middleware";
import { LoggerService } from "./infrastructure/logger/logger.service";
import { loggerMiddleware } from "./presentation/middlewares/logger.middleware";

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api", clientRoutes);

app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    url: "/docs/swagger.json"
  }
}));

app.get("/docs/swagger.json", (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.get("/", (req: Request, res: Response) => {
  res.json({ 
    message: "It works!", 
    description: "To see the docs, go to /docs" 
  });
});

// Global error handler - deve vir ANTES do 404 handler
app.use(errorHandler);

app.use(/(.*)/, (req: Request, res: Response) => {
  res.status(404).json({ 
    error: "Not Found", 
    message: "Route not found" 
  });
});

app.use(loggerMiddleware(new LoggerService()));

export default app;