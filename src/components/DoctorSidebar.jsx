import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Logo from "../assets/icons/Logo";

const DoctorSidebar = () => {

    const location = useLocation();
    const navItems = [
        { path: '/doctor/patients-list', label: 'لیست بیماران', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        { path: '/doctor/review-requests', label: 'درخواست‌های بررسی', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M11.25 1.5H6.75C6.33579 1.5 6 1.83579 6 2.25V3.75C6 4.16421 6.33579 4.5 6.75 4.5H11.25C11.6642 4.5 12 4.16421 12 3.75V2.25C12 1.83579 11.6642 1.5 11.25 1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M12 3H13.5C13.8978 3 14.2794 3.15804 14.5607 3.43934C14.842 3.72064 15 4.10218 15 4.5V15C15 15.3978 14.842 15.7794 14.5607 16.0607C14.2794 16.342 13.8978 16.5 13.5 16.5H4.5C4.10218 16.5 3.72064 16.342 3.43934 16.0607C3.15804 15.7794 3 15.3978 3 15V4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M9 8.25H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M9 12H12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M6 8.25H6.0075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                        <path d="M6 12H6.0075" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                                                    </svg>},
    ]

    const handleLogout = () => {

    }

    return ( 
        <aside className="bg-white border border-text-muted-foreground/24 flex flex-col h-[100vh] justify-between p-[0.9875rem] rounded-[1.65rem] w-[16rem]">
            <div>
                <Link to='' className="flex gap-[0.5rem] items-center w-fit h-fit">
                    <div className="flex justify-center items-center h-[2.25rem] w-[2.25rem] flex-shrink-0">
                        <Logo width={36} height={36} className={""}/>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-vazir font-extrabold text-[1.125rem]">گِش</span>
                        <span className="font-vazir font-regular text-[0.625rem] text-text-muted-foreground">تحلیل هوشمند نوار قلب</span>
                    </div>
                </Link>
                <p className="font-medium leading-[1rem] text-[0.6875rem] text-text-muted-foreground pr-[0.75rem] pt-[0.94rem]">پنل پزشک</p>
                <nav>
                    <ul className="flex flex-col gap-[0.25rem] leading-[1.25rem] pt-[0.5rem] text-[0.875rem]">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li 
                                    key={ item.id }
                                    className={`${ isActive ? 'bg-primary/20 font-semibold rounded-[1.15rem] text-accent' : 'bg-white font-normal rounded-[1.15rem] text-text-muted-foreground' }`}
                                >
                                    <Link to={ item.path } className={`flex gap-[0.75rem] items-center pr-[0.75rem] py-[0.625rem]`}>
                                        { item.icon }
                                        <span>{ item.label }</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <button onClick={ handleLogout } className="flex font-normal gap-[0.75rem] items-center cursor-pointer leading-[1.25rem] pr-[0.75rem] py-[0.625rem] text-[0.875rem] text-text-muted-foreground">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12.75L15.75 9L12 5.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.75 9H6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>خروج از حساب</span>

            </button>

        </aside>
     );
}
 
export default DoctorSidebar;