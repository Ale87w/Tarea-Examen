import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const conectarDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI no está definida en el archivo .env");
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
};
