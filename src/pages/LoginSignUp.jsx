import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const LoginSignUp = () => {
    const [mode, setMode] = useState("signup");
    const [role, setRole] = useState("patient");
    return ( 
        <div className="flex flex-col">
            <div></div>
            <div className="px-[1rem] py-[16.5rem]">
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