import { useState } from "react";
import { Outlet } from "react-router-dom";

import { PatientProvider } from "../context/PatientContext";
import PatientSidebar from "../components/PatientSidebar";
import PatientOverview from '../components/PatientOverview'

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return ( 
        <PatientProvider>
            <div className="bg-primary/3 px-[1.25rem]">
                <main className="px-[2rem] py-[1.5rem] w-full flex gap-[1.5rem]">
                    <PatientSidebar activeTab={ activeTab } setActiveTab={ setActiveTab }/>
                    <Outlet />
                </main>
            </div>
        </PatientProvider>
     );
}
 
export default PatientDashboard;