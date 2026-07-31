import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./config/database";
import tourRoutes from "./routes/tourRoutes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar DB
conectarDB();

// Rutas
app.get("/", (req, res) => {
  res.json({ mensaje: "API Sistema de Tours" });
});

// Registrar rutas de tours
app.use("/api/tours", tourRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
