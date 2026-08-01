import { useState, useEffect } from "react";
import { registrarTour, actualizarTour } from "../services/tourService";
import type { Tour } from "../interfaces/Tour";

interface TourModalProps {
  onClose: () => void;
  onRefresh: () => void;
  tourParaEditar?: Tour | null; // Nuevo prop para recibir datos
}

const TourModal = ({ onClose, onRefresh, tourParaEditar }: TourModalProps) => {
  const [formData, setFormData] = useState({
    nombre: "",
    destino: "",
    precio: 0,
    duracion: "",
    cupos: 0
  });

  // Si recibimos un tour para editar, llenamos el formulario
  useEffect(() => {
    if (tourParaEditar) {
      setFormData({
        nombre: tourParaEditar.nombre,
        destino: tourParaEditar.destino,
        precio: tourParaEditar.precio,
        duracion: tourParaEditar.duracion,
        cupos: tourParaEditar.cupos
      });
    } else {
      // Si no, limpiamos el formulario (modo crear)
      setFormData({
        nombre: "",
        destino: "",
        precio: 0,
        duracion: "",
        cupos: 0
      });
    }
  }, [tourParaEditar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "precio" || name === "cupos" ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (tourParaEditar && tourParaEditar._id) {
      // Modo Edición
      await actualizarTour(tourParaEditar._id, formData);
    } else {
      // Modo Creación
      await registrarTour(formData);
    }
    
    onRefresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96 relative shadow-lg">
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        
        <h2 className="text-2xl font-bold mb-5">
          {tourParaEditar ? "Editar Tour" : "Nuevo Tour"}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <input 
            name="nombre" 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Nombre" 
            value={formData.nombre}
            onChange={handleChange} 
            required 
          />
          <input 
            name="destino" 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Destino" 
            value={formData.destino}
            onChange={handleChange} 
            required 
          />
          <input 
            name="precio" 
            type="number" 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Precio" 
            value={formData.precio}
            onChange={handleChange} 
            required 
          />
          <input 
            name="duracion" 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Duración" 
            value={formData.duracion}
            onChange={handleChange} 
            required 
          />
          <input 
            name="cupos" 
            type="number" 
            className="border w-full p-2 mb-3 rounded" 
            placeholder="Cupos" 
            value={formData.cupos}
            onChange={handleChange} 
            required 
          />
          
          <div className="flex gap-2 mt-4">
            <button 
              type="submit" 
              className="bg-blue-700 text-white px-5 py-2 rounded w-full hover:bg-blue-800 transition"
            >
              {tourParaEditar ? "Actualizar" : "Guardar"}
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-500 text-white px-5 py-2 rounded w-full hover:bg-gray-600 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TourModal;