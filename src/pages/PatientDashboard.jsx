import { useState } from "react";
import { Outlet } from "react-router-dom";

import UserIcon from "../assets/icons/UserIcon";

import DashboardSidebar from "../components/DashboardSidebar";

const PatientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const patientNavItems = [
        { path: '/patient/dashboard', label: 'نمای کلی', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.75 2.25H3C2.58579 2.25 2.25 2.58579 2.25 3V8.25C2.25 8.66421 2.58579 9 3 9H6.75C7.16421 9 7.5 8.66421 7.5 8.25V3C7.5 2.58579 7.16421 2.25 6.75 2.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15 2.25H11.25C10.8358 2.25 10.5 2.58579 10.5 3V5.25C10.5 5.66421 10.8358 6 11.25 6H15C15.4142 6 15.75 5.66421 15.75 5.25V3C15.75 2.58579 15.4142 2.25 15 2.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15 9H11.25C10.8358 9 10.5 9.33579 10.5 9.75V15C10.5 15.4142 10.8358 15.75 11.25 15.75H15C15.4142 15.75 15.75 15.4142 15.75 15V9.75C15.75 9.33579 15.4142 9 15 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6.75 12H3C2.58579 12 2.25 12.3358 2.25 12.75V15C2.25 15.4142 2.58579 15.75 3 15.75H6.75C7.16421 15.75 7.5 15.4142 7.5 15V12.75C7.5 12.3358 7.16421 12 6.75 12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>},
        { path: '/patient/dashboard/ecg-upload', label: 'آپلود نوار قلب', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 9.75V15.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M3.00001 11.1743C2.44279 10.605 2.02244 9.9163 1.77079 9.16047C1.51914 8.40464 1.44279 7.60145 1.54753 6.81174C1.65227 6.02203 1.93535 5.26652 2.37533 4.60242C2.81531 3.93832 3.40065 3.38305 4.08701 2.97868C4.77337 2.57431 5.54276 2.33143 6.33689 2.26845C7.13102 2.20547 7.92906 2.32403 8.67059 2.61516C9.41211 2.90629 10.0777 3.36235 10.6168 3.94879C11.156 4.53524 11.5546 5.23669 11.7825 6.00001H13.125C13.8491 5.99993 14.5541 6.23276 15.1358 6.6641C15.7174 7.09543 16.1449 7.70241 16.3551 8.39537C16.5653 9.08833 16.547 9.83051 16.303 10.5123C16.059 11.1941 15.6022 11.7793 15 12.1815" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M6 12.75L9 9.75L12 12.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>},
        { path: '/patient/dashboard/history', label: 'تاریخچه آزمایش‌ها', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.25 9C2.25 10.335 2.64588 11.6401 3.38758 12.7501C4.12928 13.8601 5.18349 14.7253 6.41689 15.2362C7.65029 15.7471 9.00749 15.8808 10.3169 15.6203C11.6262 15.3599 12.829 14.717 13.773 13.773C14.717 12.829 15.3599 11.6262 15.6203 10.3169C15.8808 9.00749 15.7471 7.65029 15.2362 6.41689C14.7253 5.18349 13.8601 4.12928 12.7501 3.38758C11.6401 2.64588 10.335 2.25 9 2.25C7.11296 2.2571 5.30173 2.99342 3.945 4.305L2.25 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M2.25 2.25V6H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M9 5.25V9L12 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>},
        { path: '/patient/dashboard/profile', label: 'پروفایل', icon: < UserIcon/> },

        { path: '/patient/dashboard/choose-doctor', label: 'انتخاب پزشک', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                    <path d="M3.75 15.75C3.75 12.85 6.10051 10.5 9 10.5C10.0296 10.5 10.9903 10.7967 11.8016 11.3096" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                    <path d="M13.5 15.75L15.75 13.5M15.75 13.5L13.5 11.25M15.75 13.5H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg> }
    ]
    return ( 
        <div className="bg-primary/3 px-[1.25rem]">
            <main className="px-[2rem] py-[1.5rem] w-full flex gap-[1.5rem]">
                <DashboardSidebar navItems={ patientNavItems } roleLabel='پنل بیمار' logoLinkTo='/patient/dashboard' activeTab={ activeTab } setActiveTab={ setActiveTab }/>
                <Outlet />
            </main>
        </div>
     );
}
 
export default PatientDashboard;