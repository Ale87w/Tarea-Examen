import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { conectarDB } from "./config/database"; 
import empresasRoutes from "./routes/empresas.routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión DB
conectarDB();

// Rutas
app.use('/api/empresas', empresasRoutes);

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API de Empresas para Estadías' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3002; // Usamos puerto 3002 para no chocar con el anterior
app.listen(PORT, () => {
  console.log(`Servidor de Empresas iniciado en puerto ${PORT}`);
});