const URL = "http://localhost:3001/api/tours";

export const obtenerTours = async () => {
  const respuesta = await fetch(URL);
  return await respuesta.json();
};

export const registrarTour = async (tour: any) => {
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tour)
  });
};

export const actualizarTour = async (id: string, tour: any) => {
  await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(tour)
  });
};

export const eliminarTour = async (id: string) => {
  await fetch(`${URL}/${id}`, {
    method: "DELETE"
  });
};