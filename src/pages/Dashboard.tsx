import DashboardCards from "../components/DashboardCards";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Tours from "./Tours";

const Dashboard = ()=> {
    return (
        <>
            <Header />
            <div className="flex">
                <Sidebar/>
                <main className="flex-1 p-8 bg-gray-100">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                        <DashboardCards />
                        <Tours />
                    </div>
                </main>
            </div>
        </>
    );
}

export default Dashboard;