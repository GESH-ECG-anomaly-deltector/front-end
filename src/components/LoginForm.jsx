import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import EmailOtpLogin from "./EmailOtpLogin";

const LoginForm = () => {
    const [loginMethod, setLoginMethod] = useState('phone'); // 'phone' | 'email'
    const [sending, setSending] = useState(false);

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        setSending(true);
        const result = await login(phone, password);
        setSending(false)

        if(!result.success) {
            setError(result.message);
            return;
        }

        if (result.role === 'patient')
            navigate('/patient/dashboard')
        else if (result.role === 'doctor')
            navigate('/doctor/dashboard')
        else if (result.role === 'admin')
            navigate('/admin/dashboard')
    };

    if (loginMethod === 'email') {
        return (
            <div className="flex flex-col gap-[1rem]">
                <EmailOtpLogin />
                <button
                    type="button"
                    onClick={() => setLoginMethod('phone')}
                    className="text-primary text-center text-[0.875rem]"
                >
                    ورود با شماره موبایل و رمز عبور
                </button>
            </div>
        );
    }

    return ( 
        <form onSubmit={ handleSubmit } action="" className="flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="" className="">
                    شماره موبایل یا کد ملی
                </label>
                <input 
                    id=""
                    type="numeric"
                    pattern="[0-9]*"
                    dir="ltr"
                    placeholder="0913456997"
                    value={ phone }
                    onChange={ (e) => setPhone(e.target.value)}
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full" 
                />
            </div>
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="" className="pr-[0.5rem]">
                    رمز عبور
                </label>
                <input 
                    id=""
                    type="password"
                    dir="ltr"
                    placeholder="••••••••"
                    value={ password }
                    onChange={ (e) => setPassword(e.target.value)}
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full" 
                />
            </div>

            {error && (
                <p className="text-red-500 text-[0.875rem]">{ error }</p>
            )}

            <button type="submit" disabled={ sending } className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white">
                {sending ? 'در حال ورود...' : 'ورود به سامانه'}
            </button>
            <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className="text-primary text-center text-[0.875rem]"
            >
                ورود با کد ایمیل
            </button>
        </form>
     );
}
 
export default LoginForm;