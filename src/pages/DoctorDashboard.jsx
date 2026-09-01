import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardSidebar from "../components/DashboardSidebar";

const DoctorDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const DoctorNavItems = [
        { path: '/doctor/dashboard', label: 'لیست بیماران', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_10_1251)">
                                                                        <path d="M12 15.75V14.25C12 13.4544 11.6839 12.6913 11.1213 12.1287C10.5587 11.5661 9.79565 11.25 9 11.25H4.5C3.70435 11.25 2.94129 11.5661 2.37868 12.1287C1.81607 12.6913 1.5 13.4544 1.5 14.25V15.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M12 2.34601C12.6433 2.51279 13.213 2.88846 13.6198 3.41406C14.0265 3.93965 14.2471 4.58543 14.2471 5.25001C14.2471 5.91459 14.0265 6.56036 13.6198 7.08596C13.213 7.61156 12.6433 7.98723 12 8.15401" stroke="#currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M16.5 15.75V14.25C16.4995 13.5853 16.2783 12.9396 15.871 12.4142C15.4638 11.8889 14.8936 11.5137 14.25 11.3475" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M6.75 8.25C8.40685 8.25 9.75 6.90685 9.75 5.25C9.75 3.59315 8.40685 2.25 6.75 2.25C5.09315 2.25 3.75 3.59315 3.75 5.25C3.75 6.90685 5.09315 8.25 6.75 8.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        </g>
                                                                        <defs>
                                                                        <clipPath id="clip0_10_1251">
                                                                        <rect width="18" height="18" fill="white"/>
                                                                        </clipPath>
                                                                        </defs>
                                                                    </svg>},
        { path: '/doctor/dashboard/reviews', label: 'درخواست‌های بررسی', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M11.25 1.5H6.75C6.33579 1.5 6 1.83579 6 2.25V3.75C6 4.16421 6.33579 4.5 6.75 4.5H11.25C11.6642 4.5 12 4.16421 12 3.75V2.25C12 1.83579 11.6642 1.5 11.25 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M12 3H13.5C13.8978 3 14.2794 3.15804 14.5607 3.43934C14.842 3.72064 15 4.10218 15 4.5V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M9 8.25H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M9 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M6 8.25H6.0075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M6 12H6.0075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    </svg>},
        { path: '/doctor/dashboard/assignment-requests', label: 'درخواست‌های اتصال', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                <path d="M6.75 9.75L8.25 11.25L11.25 6.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                                <path d="M9 15.75C12.7279 15.75 15.75 12.7279 15.75 9C15.75 5.27208 12.7279 2.25 9 2.25C5.27208 2.25 2.25 5.27208 2.25 9C2.25 12.7279 5.27208 15.75 9 15.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                            </svg> },
    ]

    return ( 
        
        <div className="bg-primary/3 px-[1.25rem]">
            <main className="px-[2rem] py-[1.5rem] w-full flex gap-[1.5rem]">
                <DashboardSidebar navItems={ DoctorNavItems } roleLabel='پنل پزشک' logoLinkTo='/doctor/dashboard' activeTab={ activeTab } setActiveTab={ setActiveTab }/>
                <Outlet />
            </main>
        </div>
    
     );
}
 
export default DoctorDashboard;