import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const adminNavItems = [
        {path: '/admin/dashboard', label: 'نمای کلی', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M6.75 2.25H3C2.58579 2.25 2.25 2.58579 2.25 3V8.25C2.25 8.66421 2.58579 9 3 9H6.75C7.16421 9 7.5 8.66421 7.5 8.25V3C7.5 2.58579 7.16421 2.25 6.75 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
                                                                            <path d="M15 2.25H11.25C10.8358 2.25 10.5 2.58579 10.5 3V5.25C10.5 5.66421 10.8358 6 11.25 6H15C15.4142 6 15.75 5.66421 15.75 5.25V3C15.75 2.58579 15.4142 2.25 15 2.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
                                                                            <path d="M15 9H11.25C10.8358 9 10.5 9.33579 10.5 9.75V15C10.5 15.4142 10.8358 15.75 11.25 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V9.75C15.75 9.33579 15.4142 9 15 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
                                                                            <path d="M6.75 12H3C2.58579 12 2.25 12.3358 2.25 12.75V15C2.25 15.4142 2.58579 15.75 3 15.75H6.75C7.16421 15.75 7.5 15.4142 7.5 15V12.75C7.5 12.3358 7.16421 12 6.75 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"/>
                                                                            </svg>
                                                                            },
    ]

    return ( 
        <div className="bg-primary/3 px-[1.25rem]">
            <main className="px-[2rem] py-[1.5rem] w-full flex gap-[1.5rem]">
                <DashboardSidebar navItems={ adminNavItems } roleLabel='پنل مدیر سامانه' logoLinkTo='/admin/dashboard' activeTab={ activeTab } setActiveTab={ setActiveTab }/>
                <Outlet />
            </main>
        </div>
     );
}
 
export default AdminDashboard;