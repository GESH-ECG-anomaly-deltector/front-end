import { useState, useEffect } from "react";

import AdminHeader from "./AdminHeader";
import UserManagementTable from "./UserManagementTable";
import { useAuth } from "../context/AuthContext";

const AdminOverview = () => {
    const { currentUser, getAllUsers } = useAuth();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        const list = await getAllUsers();
        setUsers(list.filter(user => user.role !== "admin"));
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const [tab, setTab] = useState('users');
    const tabClass = (isActive) => `flex font-medium leading-[1.25rem] px-[0.75rem] py-[0.25rem] rounded-full text-[0.875rem] ${
        isActive
            ? 'bg-white'
            : 'text-text-muted-foreground'
    }`;

    const [stats, setStats] = useState({
        todayRecords: 0,
        todayRecordsDelta: '0',

        serverLoad: 0,
        serverLoadDelta: 'پایدار',

        avgInferenceTime: 0,
        avgInferenceTimeDelta: '0',

        modelAccuracy: 0,
        modelAccuracyDelta: '0',
    });

    useEffect(() => {
        fetch('http://localhost:8080/api/admin/stats')
            .then(res => {
                if (!res.ok) {
                    throw new Error('خطا در دریافت آمار');
                }

                return res.json();
            })
            .then(data => {
                setStats(data);
            })
            .catch(error => {
                console.error('Error fetching admin stats:', error);
            });
    }, []);

    const statCards = [
        { id: 'todayRecords', label: 'رکوردهای امروز', value: stats.todayRecords, delta: stats.todayRecordsDelta },

        { id: 'serverLoad', label: 'بار پردازشی سرور', value: `${stats.serverLoad}%`, delta: 'پایدار' },

        { id: 'avgInferenceTime', label: 'میانگین زمان استنتاج', value: `${stats.avgInferenceTime} ثانیه`, delta: stats.avgInferenceTimeDelta },

        { id: 'modelAccuracy', label: 'دقت مدل روی داده اعتبارسنجی', value: `${stats.modelAccuracy}%`, delta: stats.modelAccuracyDelta },
    ];

    return ( 
        <div className="flex flex-2 flex-col gap-[1rem]">
            <AdminHeader />
            <section>
                <header className="whitespace-nowrap">
                    <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">مدیریت سامانه</h1>
                    <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">کاربران، عملکرد مدل و محتوای صفحه اصلی</p>
                </header>
            </section>

            <section aria-label="آمار کلی سامانه" className="flex gap-[1rem]">
                {statCards.map((card) => (
                    <div key={ card.id } className="bg-white flex-1 shadow-sm p-[1.2375rem] rounded-[1.4rem]">
                        <dl className="flex flex-col gap-[0.25rem] whitespace-nowrap">
                            <dt className="font-normal leading-[1rem] text-text-muted-foreground text-[0.75rem]">{card.label}</dt>
                            <dd className="font-extrabold leading-[2rem] text-[1.5rem]">{ card.value }</dd>
                            <dd className="leading-[1rem] text-text-muted-foreground text-[0.75rem]">{ card.delta }</dd>
                        </dl>
                    </div>
                ))}
            </section>

            <div className="flex flex-col gap-[1rem] w-full">
                <div role="tablist" aria-label="بخش‌های مدیریت" className="bg-primary/10 flex justify-end p-[0.25rem] rounded-full w-fit" >
                    {/* <button role="tab" aria-selected={ tab === 'content' } onClick={() => setTab('content')} className={ tabClass(tab === 'content') }>
                        محتوای صفحه اصلی
                    </button>
                    <button role="tab" aria-selected={ tab === 'monitoring' } onClick={() => setTab('monitoring')} className={ tabClass(tab === 'monitoring') }>
                        مانیتورینگ
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_13_2274)">
                            <path d="M14.6663 7.99998H13.013C12.7217 7.99936 12.4381 8.09418 12.2058 8.26996C11.9734 8.44573 11.805 8.69278 11.7263 8.97331L10.1597 14.5466C10.1496 14.5813 10.1285 14.6117 10.0997 14.6333C10.0708 14.655 10.0357 14.6666 9.99967 14.6666C9.96361 14.6666 9.92852 14.655 9.89967 14.6333C9.87083 14.6117 9.84977 14.5813 9.83967 14.5466L6.15967 1.45331C6.14958 1.41869 6.12852 1.38828 6.09967 1.36665C6.07083 1.34501 6.03574 1.33331 5.99967 1.33331C5.96361 1.33331 5.92852 1.34501 5.89967 1.36665C5.87083 1.38828 5.84977 1.41869 5.83967 1.45331L4.27301 7.02665C4.19465 7.30608 4.02726 7.55232 3.79625 7.72799C3.56524 7.90365 3.28322 7.99915 2.99301 7.99998H1.33301" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_13_2274">
                            <rect width="16" height="16" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </button> */}
                    <button role="tab" aria-selected={ tab === 'users' } onClick={() => setTab('users')} className={ tabClass(tab === 'users') }>
                        کاربران
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.6663 14V12.6667C10.6663 11.9594 10.3854 11.2811 9.88529 10.781C9.3852 10.281 8.70692 10 7.99967 10H3.99967C3.29243 10 2.61415 10.281 2.11406 10.781C1.61396 11.2811 1.33301 11.9594 1.33301 12.6667V14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10.667 2.08533C11.2388 2.23357 11.7453 2.5675 12.1068 3.0347C12.4683 3.5019 12.6645 4.07592 12.6645 4.66666C12.6645 5.2574 12.4683 5.83142 12.1068 6.29862C11.7453 6.76582 11.2388 7.09975 10.667 7.24799" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.667 14V12.6667C14.6666 12.0758 14.4699 11.5019 14.1079 11.0349C13.7459 10.5679 13.2391 10.2344 12.667 10.0867" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5.99967 7.33333C7.47243 7.33333 8.66634 6.13943 8.66634 4.66667C8.66634 3.19391 7.47243 2 5.99967 2C4.52692 2 3.33301 3.19391 3.33301 4.66667C3.33301 6.13943 4.52692 7.33333 5.99967 7.33333Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                { tab === 'users' && (
                    <section role="tabpanel" aria-label="جدول کاربران">
                        {loading && <p className="text-text-muted-foreground">در حال بارگذاری...</p>}
                        {!loading && <UserManagementTable users={ users } onUserChanged={ loadUsers } />}
                    </section>
                ) }
            </div>
        </div>
     );
}
    
export default AdminOverview;