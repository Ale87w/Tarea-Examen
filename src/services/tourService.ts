const URL = "http://localhost:3001/api/tours";

export const obtenerTours = async () => {
  const respuesta = await fetch(URL);
  const datos = await respuesta.json();
  return datos;
};