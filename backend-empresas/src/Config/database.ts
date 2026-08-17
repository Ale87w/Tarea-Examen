import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1);
  }
};