import { useState } from "react";

import PatientSidebar from "../components/PatientSidebar";
import PatientOverview from '../components/PatientOverview'

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <PatientOverview />
            case 'ecg-upload':
                return <PatientUploadPanel />
            case 'history':
                return <PatientHistory />
            case 'profile':
                return <PatientProfile />
            default:
                return <Overview />
        }
    };

    return ( 
        <div className="bg-primary/3 flex gap-[1.5rem] px-[2rem] py-[1.5rem] mx-[1.25rem]">
            <PatientSidebar activeTab={ activeTab } setActiveTab={ setActiveTab }/>
            <main>
                { renderContent() }
            </main>
        </div>
     );
}
 
export default PatientDashboard;