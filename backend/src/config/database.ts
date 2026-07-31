import mongoose from "mongoose";

export const conectarDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    if (!uri) {
      throw new Error("La variable MONGO_URI no está definida en el .env");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error de conexión:", error);
    process.exit(1); // Detiene el servidor si no hay conexión
  }
};
