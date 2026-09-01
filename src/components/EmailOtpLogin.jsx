import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateEmail } from "../utils/validation";


const EmailOtpLogin = () => {
    const [step, setStep] = useState(1); // state 1 = entering the email, state 2 = entering the otp code
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [sending, setSending] = useState(false);

    const { sendOtp, verifyOtp } = useAuth();
    const navigate = useNavigate();

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');
        setInfo('');

        const emailError = validateEmail(email, true);
        if (emailError) {
            setError(emailError);
            return;
        }

        setSending(true);
        const result = await sendOtp(email);
        setSending(false);

        if (!result.success) {
            setError(result.message);
            return;
        }

        setStep(2);
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');

        if (!code.trim()) {
            setError('لطفاً کد ۶ رقمی را وارد کنید');
            return;
        }

        const result = await verifyOtp(email, code);

        if (!result.success) {
            setError(result.message);
            return;
        }

        if (result.role === 'patient') navigate('/patient/dashboard');
        else if (result.role === 'doctor') navigate('/doctor/dashboard');
    };

    if (step === 1) {
        return (
            <form onSubmit={ handleSendCode } className="flex flex-col gap-[1rem]">
                <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                    <label htmlFor="otpEmail">ایمیل</label>
                    <input
                        id="otpEmail"
                        type="email"
                        dir="ltr"
                        placeholder="example@email.com"
                        value={ email }
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full"
                    />
                </div>

                {error && <p className="text-red-500 text-[0.875rem]">{error}</p>}

                <button
                    type="submit"
                    disabled={sending}
                    className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white disabled:opacity-60"
                >
                    {sending ? 'در حال ارسال...' : 'ارسال کد ورود'}
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={ handleVerifyCode } className="flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="otpCode">کد ۶ رقمی ارسال‌شده به { email }</label>
                <input
                    id="otpCode"
                    type="text"
                    inputMode="numeric"
                    dir="ltr"
                    placeholder="123456"
                    value={ code }
                    onChange={(e) => setCode(e.target.value)}
                    className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full"
                />
            </div>

            {info && <p className="text-text-muted-foreground text-[0.8rem]">{info}</p>}
            {error && <p className="text-red-500 text-[0.875rem]">{error}</p>}

            <button type="submit" className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white">
                تایید و ورود
            </button>

            <button
                type="button"
                onClick={() => { setStep(1); setCode(''); setError(''); }}
                className="text-text-muted-foreground text-[0.8rem] underline"
            >
                اصلاح ایمیل / ارسال دوباره‌ی کد
            </button>
        </form>
    );
};

export default EmailOtpLogin;