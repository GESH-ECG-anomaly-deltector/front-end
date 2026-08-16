import { useState } from "react";
import { Outlet } from "react-router-dom";

import PatientSidebar from "../components/PatientSidebar";
import PatientOverview from '../components/PatientOverview'

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return ( 
        <div className="bg-primary/3 flex gap-[1.5rem] px-[2rem] py-[1.5rem] mx-[1.25rem]">
            <PatientSidebar activeTab={ activeTab } setActiveTab={ setActiveTab }/>
            <main>
                <Outlet />
            </main>
        </div>
     );
}
 
export default PatientDashboard;