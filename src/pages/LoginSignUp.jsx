import { useState } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import Logo from "../assets/icons/Logo";

const LoginSignUp = () => {
    const [mode, setMode] = useState("signup");
    const [role, setRole] = useState("patient");
    return ( 
        <div className="flex h-screen">
            <div className="bg-primary flex flex-col justify-between p-[2.5rem]">
                <Link to='' className="flex gap-[0.5rem] items-center justify-start w-fit h-fit">
                    <div className="flex justify-center items-center h-[2.25rem] w-[2.25rem] flex-shrink-0">
                        <Logo width={36} height={36} className={""}/>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-vazir font-extrabold text-[1.125rem] text-white">گِش</span>
                        <span className="font-vazir font-regular text-[0.625rem] text-black">تحلیل هوشمند نوار قلب</span>
                    </div>
                </Link>
                <div className="">
                    <h1 className="font-extrabold leading-[2.625rem] text-white text-[1.875rem]">غربالگری قلب در چند ثانیه!</h1>
                    <p className="font-normal leading-[2rem] text-white text-[0.875rem]">حساب کاربری خود را بسازید تا نوار قلب را آپلود کنید و نتیجه‌ی تحلیل
                        مدل را همراه با نظر پزشک دریافت کنید.
                    </p>  
                </div>
                <svg width="606" height="110" viewBox="0 0 606 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7" clip-path="url(#clip0_11_1972)">
                    <path d="M0 54.9998H24.2284C30.9585 48.3998 37.6886 48.3998 44.4187 54.9998H60.571L66.6281 63.7997L74.7042 8.79999L82.7804 74.7997L92.8755 54.9998C109.028 44.7331 125.18 44.7331 141.332 54.9998H201.903H226.132C232.862 48.3998 239.592 48.3998 246.322 54.9998H262.474L268.531 63.7997L276.608 8.79999L284.684 74.7997L294.779 54.9998C310.931 44.7331 327.083 44.7331 343.236 54.9998H403.807H428.035C434.765 48.3998 441.495 48.3998 448.225 54.9998H464.378L470.435 63.7997L478.511 8.79999L486.587 74.7997L496.682 54.9998C512.834 44.7331 528.987 44.7331 545.139 54.9998H605.71" stroke="#F9FCFF" stroke-width="1.96889" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_11_1972">
                    <rect width="605.71" height="109.999" fill="white"/>
                    </clipPath>
                    </defs>
                </svg>
                
            </div>
            <div className="h-full px-[1rem] flex flex-1 justify-center items-center">
                <div className="border border-text-muted-foreground/25 flex font-medium justify-center h-auto items-center leading-[1.25rem] pb-[1.75rem] pt-[2.75rem] px-[1.75rem] text-[0.875rem] text-black w-[28rem] rounded-[1.65rem]">
                    <div className="h-auto flex flex-col gap-[1.5rem] w-full">
                        <div className="bg-text-muted-foreground/25 flex p-[0.25rem] rounded-full w-full">
                            <button
                                onClick={() => setMode("signup")}
                                className={ mode == 'signup' ? 'bg-white flex-1 py-[0.25rem] rounded-full': 'flex-1 py-[0.25rem] text-text-muted-foreground/90'}    
                            >
                                ثبت‌نام
                            </button>
                            <button
                                onClick={() => setMode("login")}
                                className={ mode == 'login' ? 'bg-white flex-1 py-[0.25rem] rounded-full': 'flex-1 py-[0.25rem] text-text-muted-foreground/90'}    
                            >
                                ورود
                            </button>
                        </div>

                        { mode == "signup" && < SignUpForm role={ role } setRole={ setRole } />}
                        { mode == "login" && < LoginForm />}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginSignUp;