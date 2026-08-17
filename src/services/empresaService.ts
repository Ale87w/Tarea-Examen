import type { Empresa } from '../types/Empresa';

const URL = 'http://localhost:3002/api/empresas';

export const obtenerEmpresas = async () => {
  const res = await fetch(URL);
  return res.json();
};

export const buscarEmpresas = async (texto: string) => {
  const res = await fetch(`${URL}/buscar?texto=${texto}`);
  return res.json();
};

export const eliminarEmpresa = async (id: string) => {
  await fetch(`${URL}/${id}`, { method: 'DELETE' });
};

export const guardarEmpresa = async (empresa: Empresa) => {
  if (empresa._id) {
    await fetch(`${URL}/${empresa._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empresa)
    });
  } else {
    await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(empresa)
    });
  }
};