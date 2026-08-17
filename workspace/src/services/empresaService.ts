const URL = "http://localhost:3002/api/empresas";

export const obtenerEmpresas = async () => {
  const respuesta = await fetch(URL);
  return await respuesta.json();
};

export const buscarEmpresas = async (texto: string) => {
  const respuesta = await fetch(`${URL}/buscar?texto=${texto}`);
  return await respuesta.json();
};

export const obtenerEmpresasConVacantes = async () => {
  const respuesta = await fetch(`${URL}/vacantes`);
  return await respuesta.json();
};

export const crearEmpresa = async (empresa: any) => {
  await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(empresa)
  });
};

export const actualizarEmpresa = async (id: string, empresa: any) => {
  await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(empresa)
  });
};

export const eliminarEmpresa = async (id: string) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });
};