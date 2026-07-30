import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { conectarDB } from "./config/database";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.get("/", (req, res) => {
  res.json({
    mensaje: "API Sistema de Tours"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor iniciado en puerto " + PORT);
});
