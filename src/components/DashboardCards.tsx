const DashboardCards = () => {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <div className="bg-blue-700 text-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Total Tours</h3>
        <h1 className="text-4xl font-bold">5</h1>
      </div>
      
      <div className="bg-green-700 text-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Precio Promedio</h3>
        <h1 className="text-4xl font-bold">$1,900</h1>
      </div>
      
      <div className="bg-purple-700 text-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Más Caro</h3>
        <h1 className="text-4xl font-bold">$3,200</h1>
      </div>
      
      <div className="bg-orange-600 text-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Más Económico</h3>
        <h1 className="text-4xl font-bold">$1,400</h1>
      </div>
      
      <div className="bg-red-600 text-white p-5 rounded shadow">
        <h3 className="text-lg font-semibold">Cupos Totales</h3>
        <h1 className="text-4xl font-bold">108</h1>
      </div>
    </div>
  );
};

export default DashboardCards;