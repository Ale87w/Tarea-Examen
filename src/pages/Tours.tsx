import type {Tour} from "../interfaces/Tour"

const Tours=()=>{
    const tours: Tour[] = [
    {
        _id: "1",
        nombre: "Tour a Chichen Itza",
        destino: "Cancun",
        precio: 2200,
        duracion: "1 dia"
    },
    {
        _id: "2",
        nombre: "Tour a Tulum",
        destino: "Tulum",
        precio: 1500,
        duracion: "Medio dia"
    },
    {
        _id: "3",
        nombre: "Tour a Playa del Carmen",
        destino: "Playa del Carmen",
        precio: 1200,
        duracion: "1 dia"
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Administración de Tours</h2>
      <table className="w-full bg-white shadow rounded-lg overflow-hidden">
        <thead className="bg-blue-700 text-white">
          <tr>
            <th className="text-left p-4">Tour</th>
            <th className="text-left">Destino</th>
            <th className="text-left">Precio</th>
            <th className="text-left">Duración</th>
          </tr>
        </thead>

        <tbody>
          {tours.map((tour) => (
            <tr key={tour._id} className="border-b hover:bg-gray-100">
              <td className="p-4">{tour.nombre}</td>
              <td>{tour.destino}</td>
              <td>${tour.precio}</td>
              <td>{tour.duracion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tours;
