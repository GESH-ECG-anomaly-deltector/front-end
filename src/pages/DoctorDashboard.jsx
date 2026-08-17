import { useState } from "react";
import { Outlet } from "react-router-dom";

import { DoctorProvider } from "../context/DoctorContex";
import DoctorSidebar from "../components/DoctorSidebar";

const DoctorDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return ( 
        <DoctorProvider>
            <div className="bg-primary/3 px-[1.25rem]">
                <main className="px-[2rem] py-[1.5rem] w-full flex gap-[1.5rem]">
                    <DoctorSidebar activeTab={ activeTab } setActiveTab={ setActiveTab }/>
                    <Outlet />
                </main>
            </div>
        </DoctorProvider>
     );
}
 
export default DoctorDashboard;