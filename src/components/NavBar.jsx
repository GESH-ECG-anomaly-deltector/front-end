import React, { useState } from "react";
import { Link } from "react-router-dom";

import Logo from '../assets/icons/Logo'

const NavBar = () => {
    return ( 
        <div className = "bg-white flex gap-[22.5375rem] items-center px-[2rem] py-[1.25rem] whitespace-nowrap">
            <Link to='' className="flex gap-[0.5rem] items-center w-fit h-fit">
                <div className="flex justify-center items-center h-[2.25rem] w-[2.25rem] flex-shrink-0">
                    <Logo width={36} height={36} className={""}/>
                </div>
                <div className="flex flex-col">
                    <span className="font-vazir font-extrabold text-[1.125rem]">گِش</span>
                    <span className="font-vazir font-regular text-[0.625rem] text-text-muted-foreground">تحلیل هوشمند نوار قلب</span>
                </div>
            </Link>
            <div className="flex font-vazir font-regular gap-[1.5rem] justify-center items-center text-[0.875rem] text-text-muted-foreground">
                <Link to="">نحوه کار</Link>
                <Link to="">شروع</Link>
            </div>
            <div className="flex gap-[0.5rem] h-fit w-fit">
                <Link to="" className="bg-primary flex font-vazir font-medium h-[2rem] items-center justify-center pb-[0.525rem] pt-[0.475rem] px-[0.75rem] rounded-full text-[0.75rem] text-background w-fit">
                    شروع کنید
                </Link>
                <Link to="" className="flex font-vazir font-medium h-[2rem] items-center justify-center pb-[0.525rem] pt-[0.475rem] px-[0.75rem] text-[0.75rem]">ورود</Link>
            </div>
        </div>
     );
}
 
export default NavBar;