import { useState } from "react";
import { Outlet } from "react-router-dom";

import { PatientProvider } from "../context/PatientContext";
import PatientSidebar from "../components/PatientSidebar";
import PatientOverview from '../components/PatientOverview'

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return ( 
        <PatientProvider>
            <div className="bg-primary/3 flex gap-[1.5rem] px-[2rem] py-[1.5rem] mx-[1.25rem]">
                <PatientSidebar activeTab={ activeTab } setActiveTab={ setActiveTab }/>
                <main>
                    <Outlet />
                </main>
            </div>
        </PatientProvider>
     );
}
 
export default PatientDashboard;