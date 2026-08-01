const TourModal = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-2xl font-bold mb-5">Nuevo Tour</h2>
        <form>
          <input
            className="border w-full p-2 mb-3"
            placeholder="Nombre"
          />
          <input
            className="border w-full p-2 mb-3"
            placeholder="Destino"
          />
          <input
            className="border w-full p-2 mb-3"
            placeholder="Precio"
            type="number"
          />
          <input
            className="border w-full p-2 mb-3"
            placeholder="Duración"
          />
          <input
            className="border w-full p-2 mb-3"
            placeholder="Cupos"
            type="number"
          />
          <button
            className="bg-blue-700 text-white px-5 py-2 rounded w-full"
            type="submit"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default TourModal;