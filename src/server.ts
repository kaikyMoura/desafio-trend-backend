import { envConfig } from "@/application/config/env.config";
import app from "./app";

const PORT = envConfig().PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger running on http://localhost:${PORT}/docs`);
  });
  