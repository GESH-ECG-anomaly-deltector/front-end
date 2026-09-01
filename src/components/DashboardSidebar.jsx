import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Logo from "../assets/icons/Logo";
import { useAuth } from "../context/AuthContext";

const DashboardSidebar = ({ navItems, roleLabel, logoLinkTo }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return ( 
        <aside className="bg-white border border-text-muted-foreground/24 flex flex-col h-[100vh] justify-between p-[0.9875rem] rounded-[1.65rem] w-[16rem] whitespace-nowrap">
            <div>
                <Link to={ logoLinkTo } className="flex gap-[0.5rem] items-center w-fit h-fit">
                    <div className="flex justify-center items-center h-[2.25rem] w-[2.25rem] flex-shrink-0">
                        <Logo width={36} height={36} className={""}/>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-vazir font-extrabold text-[1.125rem]">گِش</span>
                        <span className="font-vazir font-regular text-[0.625rem] text-text-muted-foreground">تحلیل هوشمند نوار قلب</span>
                    </div>
                </Link>
                <p className="font-medium leading-[1rem] text-[0.6875rem] text-text-muted-foreground pr-[0.75rem] pt-[0.94rem]">{ roleLabel }</p>
                <nav>
                    <ul className="flex flex-col gap-[0.25rem] leading-[1.25rem] pt-[0.5rem] text-[0.875rem]">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li 
                                    key={ item.path }
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
            <button onClick={ handleLogout } 
                className="flex font-normal hover:font-semibold gap-[0.75rem] items-center cursor-pointer leading-[1.25rem] pr-[0.75rem] py-[0.625rem] rounded-full text-[0.875rem] hover:text-accent text-text-muted-foreground">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12.75L15.75 9L12 5.25" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.75 9H6.75" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.75 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H6.75" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>خروج از حساب</span>

            </button>

        </aside>
     );
}
 
export default DashboardSidebar;