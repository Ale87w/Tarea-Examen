import TourModal from "../components/TourModal";
import React, { useEffect, useState } from 'react';
import { eliminarTour, obtenerTours } from '../services/tourService';
import type { Tour } from '../interfaces/Tour';

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tourSeleccionado, setTourSeleccionado] = useState<Tour | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarTours = async () => {
    try {
      const datos = await obtenerTours();
      setTours(datos);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los tours. Asegúrate de que el backend esté corriendo.');
    } finally {
      setCargando(false);
    }
  };

  const abrirModalCrear = () => {
    setTourSeleccionado(null);
    setMostrarModal(true);
  };

  const abrirModalEditar = (tour: Tour) => {
    setTourSeleccionado(tour);
    setMostrarModal(true);
  };

  const borrarTour = async (id?: string) => {
    if (!id) return;

    if (confirm('¿Estás seguro de eliminar este tour?')) {
      await eliminarTour(id);
      cargarTours();
    }
  };

  useEffect(() => {
    cargarTours();
  }, []);

  const toursFiltrados = tours.filter((tour) =>
    tour.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <div className="p-6">Cargando tours...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">Administración de Tours</h2>
        <button 
          onClick={abrirModalCrear}
          className="bg-blue-700 text-white px-5 py-2 rounded hover:bg-blue-800"
        >
          Nuevo Tour
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border w-full md:w-1/3 p-2 rounded"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duración</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cupos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {toursFiltrados.length > 0 ? (
              toursFiltrados.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tour.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.destino}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${tour.precio}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.duracion}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tour.cupos}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex gap-2">
                      <button
                        onClick={() => abrirModalEditar(tour)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => borrarTour(tour._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No se encontraron tours</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {mostrarModal && (
        <TourModal
          onClose={() => setMostrarModal(false)}
          onRefresh={cargarTours}
          tourParaEditar={tourSeleccionado}
        />
      )}
    </div>
  );
};

export default Tours;