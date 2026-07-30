const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-gray-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-5">
                Menu
            </h2>
            <ul className="space-4">
                <li className="hover:text-400 cursor-pointer">
                    Dashboard
                </li >
                <li className="hover:text-400 cursor-pointer">
                    Tablas tours
                </li >
            </ul >
        </aside>
    );
};

export default Sidebar;