import type { Empresa } from '../types/Empresa';
import { FiGlobe, FiRefreshCw, FiHome, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Props {
  empresas: Empresa[];
  onEditar: (e: Empresa) => void;
  onEliminar: (id: string) => void;
}

// Paleta de avatares — se elige de forma determinista según el nombre,
// para que cada empresa siempre tenga el mismo color de identificación.
const AVATAR_PALETTE = [
  { bg: 'var(--color-teal-100)', fg: 'var(--color-teal-700)' },
  { bg: 'var(--color-amber-100)', fg: 'var(--color-amber-600)' },
  { bg: 'var(--color-brick-100)', fg: 'var(--color-brick-600)' },
  { bg: '#b4c2e9', fg: '#2c49a6' },
  { bg: '#EAE3F5', fg: '#3c877c' },
];

function avatarColor(nombre: string) {
  const idx = nombre.charCodeAt(0) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[idx];
}

export default function TablaEmpresas({ empresas, onEditar, onEliminar }: Props) {
  const getEstadoStyle = (estado: string) => {
    switch (estado) {
      case 'Disponible':
        return { classes: 'bg-[var(--color-teal-100)] text-[var(--color-teal-700)] border-[var(--color-teal-600)]/25', dot: 'bg-[var(--color-teal-600)]' };
      case 'Sin vacantes':
        return { classes: 'bg-[var(--color-amber-100)] text-[var(--color-amber-600)] border-[var(--color-amber-600)]/25', dot: 'bg-[var(--color-amber-600)]' };
      case 'Inactiva':
        return { classes: 'bg-[var(--color-brick-100)] text-[var(--color-brick-600)] border-[var(--color-brick-600)]/25', dot: 'bg-[var(--color-brick-600)]' };
      default:
        return { classes: 'bg-gray-100 text-gray-700 border-gray-300', dot: 'bg-gray-400' };
    }
  };

  const getModalidadIcon = (modalidad: string) => {
    if (modalidad === 'Remota') return <FiGlobe size={14} />;
    if (modalidad === 'Híbrida') return <FiRefreshCw size={14} />;
    return <FiHome size={14} />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[var(--color-ink-950)] text-[var(--color-paper-100)] text-xs font-mono uppercase tracking-wider">
            <th className="p-4 font-medium">Empresa</th>
            <th className="p-4 font-medium">Sector</th>
            <th className="p-4 font-medium">Ciudad</th>
            <th className="p-4 font-medium text-center">Vacantes</th>
            <th className="p-4 font-medium">Modalidad</th>
            <th className="p-4 font-medium">Estado</th>
            <th className="p-4 font-medium text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--color-line)]">
          {empresas.map((e) => {
            const estadoStyle = getEstadoStyle(e.estado);
            const avatar = avatarColor(e.nombre || '?');
            return (
              <tr
                key={e._id}
                className="group relative bg-white hover:z-10 hover:shadow-card-hover transition-all duration-200"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center [font-family:var(--font-display)] font-semibold text-sm"
                      style={{ backgroundColor: avatar.bg, color: avatar.fg }}
                    >
                      {e.nombre?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <span className="font-medium text-[var(--color-ink-950)]">{e.nombre}</span>
                  </div>
                </td>
                <td className="p-4 text-[var(--color-ink-500)]">{e.sector}</td>
                <td className="p-4 text-[var(--color-ink-500)]">{e.ciudad}</td>
                <td className="p-4 text-center">
                  <span className={`font-mono font-semibold ${e.vacantes === 0 ? 'text-[var(--color-brick-600)]' : 'text-[var(--color-ink-900)]'}`}>
                    {e.vacantes}
                  </span>
                </td>
                <td className="p-4 text-[var(--color-ink-500)]">
                  <span className="inline-flex items-center gap-2">
                    <span className="text-[var(--color-ink-500)]">{getModalidadIcon(e.modalidad)}</span> {e.modalidad}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${estadoStyle.classes}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${estadoStyle.dot}`} />
                    {e.estado}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEditar(e)}
                      title="Editar"
                      aria-label="Editar"
                      className="w-8 h-8 flex items-center justify-center bg-[var(--color-teal-50)] text-[var(--color-teal-700)] hover:bg-[var(--color-teal-600)] hover:text-white rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => onEliminar(e._id!)}
                      title="Eliminar"
                      aria-label="Eliminar"
                      className="w-8 h-8 flex items-center justify-center bg-[var(--color-brick-100)] text-[var(--color-brick-600)] hover:bg-[var(--color-brick-500)] hover:text-white rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}