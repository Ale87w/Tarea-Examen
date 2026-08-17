import type { Empresa } from "../types/Empresa";
import { eliminarEmpresa } from "../services/empresaService";

interface TablaEmpresasProps {
  empresas: Empresa[];
  onEditar: (empresa: Empresa) => void;
  onEliminar: (id: string) => void;
  onRecargar: () => void;
}

const TablaEmpresas = ({ empresas, onEditar, onEliminar, onRecargar }: TablaEmpresasProps) => {
  
  const handleEliminar = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta empresa?")) {
      await eliminarEmpresa(id);
      onRecargar();
    }
  };

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="border p-2">Nombre</th>
          <th className="border p-2">Sector</th>
          <th className="border p-2">Ciudad</th>
          <th className="border p-2">Vacantes</th>
          <th className="border p-2">Modalidad</th>
          <th className="border p-2">Estado</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {empresas.map((emp) => (
          <tr key={emp._id} className="text-center hover:bg-gray-50">
            <td className="border p-2">{emp.nombre}</td>
            <td className="border p-2">{emp.sector}</td>
            <td className="border p-2">{emp.ciudad}</td>
            <td className="border p-2">{emp.vacantes}</td>
            <td className="border p-2">{emp.modalidad}</td>
            <td className="border p-2">
              <span className={`px-2 py-1 rounded text-xs ${
                emp.estado === 'Disponible' ? 'bg-green-200 text-green-800' : 
                emp.estado === 'Sin vacantes' ? 'bg-yellow-200 text-yellow-800' : 'bg-red-200 text-red-800'
              }`}>
                {emp.estado}
              </span>
            </td>
            <td className="border p-2 flex justify-center gap-2">
              <button onClick={() => onEditar(emp)} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600">
                Actualizar
              </button>
              <button onClick={() => handleEliminar(emp._id!)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaEmpresas;