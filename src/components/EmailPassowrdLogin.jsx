import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const EmailPasswordLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [sending, setSending] = useState(false);

    const { loginWithEmailPassword } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setSending(true);
        const result = await loginWithEmailPassword(email, password);
        setSending(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        if (result.role === 'patient') navigate('/patient/dashboard');
        else if (result.role === 'doctor') navigate('/doctor/dashboard');
        else if (result.role === 'admin') navigate('/admin/dashboard');
    };

    return (
        <form onSubmit={ handleSubmit } className="flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="loginEmail">ایمیل</label>
                <input
                    id="loginEmail"
                    type="email"
                    dir="ltr"
                    placeholder="example@email.com"
                    value={ email }
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full"
                />
            </div>
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="loginEmailPassword" className="pr-[0.5rem]">رمز عبور</label>
                <input
                    id="loginEmailPassword"
                    type="password"
                    dir="ltr"
                    placeholder="••••••••"
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full"
                />
            </div>

            {error && <p className="text-red-500 text-[0.875rem]">{ error }</p>}

            <button type="submit" disabled={ sending } className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white disabled:opacity-60">
                { sending ? 'در حال ورود...' : 'ورود به سامانه' }
            </button>
        </form>
    );
};

export default EmailPasswordLogin;