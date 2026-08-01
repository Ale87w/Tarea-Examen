import { useState } from "react";
import { registrarTour } from "../services/tourService";

interface TourModalProps {
  onClose: () => void;
  onRefresh: () => void;
}

const TourModal = ({ onClose, onRefresh }: TourModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    destino: "",
    precio: 0,
    duracion: "",
    cupos: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "precio" || name === "cupos" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registrarTour(formData);
    onRefresh(); // Recargar la tabla
    onClose();   // Cerrar modal
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 relative">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-5">Nuevo Tour</h2>
        <form onSubmit={handleSubmit}>
          <input name="nombre" className="border w-full p-2 mb-3" placeholder="Nombre" onChange={handleChange} required />
          <input name="destino" className="border w-full p-2 mb-3" placeholder="Destino" onChange={handleChange} required />
          <input name="precio" type="number" className="border w-full p-2 mb-3" placeholder="Precio" onChange={handleChange} required />
          <input name="duracion" className="border w-full p-2 mb-3" placeholder="Duración" onChange={handleChange} required />
          <input name="cupos" type="number" className="border w-full p-2 mb-3" placeholder="Cupos" onChange={handleChange} required />
          
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded w-full">Guardar</button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-5 py-2 rounded w-full">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourModal;