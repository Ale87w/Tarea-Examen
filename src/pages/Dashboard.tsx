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
                    <Tours />
                </main>
            </div>
        </>
    );
}

export default Dashboard;