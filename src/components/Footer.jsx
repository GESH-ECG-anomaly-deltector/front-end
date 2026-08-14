import { Link } from "react-router-dom";
import Logo from "../assets/icons/Logo";

const Footer = () => {
    return ( 
        <footer className="flex flex-1 justify-between items-center p-[2rem]">
            <Link to='' className="flex gap-[0.5rem] items-center w-fit h-fit">
                <div className="flex justify-center items-center h-[2.25rem] w-[2.25rem] flex-shrink-0">
                    <Logo width={36} height={36} className={""}/>
                </div>
                <div className="flex flex-col">
                    <span className="font-vazir font-extrabold text-[1.125rem]">گِش</span>
                    <span className="font-vazir font-regular text-[0.625rem] text-text-muted-foreground">تحلیل هوشمند نوار قلب</span>
                </div>
            </Link>
            <p className="font-normal leading-[1.25rem] text-text-muted-foreground text-[0.875rem] whitespace-nowrap">گِش — ابزار تشخیص بیماری‌های قلبی به کمک هوش مصنوعی</p>
        </footer>
     );
}
 
export default Footer;