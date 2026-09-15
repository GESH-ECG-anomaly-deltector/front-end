import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import UserIcon from '../assets/icons/UserIcon'
import DoctorIcon from '../assets/icons/DoctorIcon'
import {
    validatePersianName,
    validateIranPhone,
    validateEmail,
    validateRequired,
} from '../utils/validation';

const SignUpForm = ({ role, setRole }) => {
    const [step, setStep] = useState(1);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [medicalCode, setMedicalCode] = useState('');
    const [code, setCode] = useState('');

    const [sending, setSending] = useState(false);

    const [fieldErrors, setFieldErrors] = useState({});
    const [generalErrors, setGeneralErrors] = useState('');

    const { sendOtp, signupWithEmail } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const errors = {};

        const nameError = validatePersianName(name);
        if (nameError) errors.name = nameError;

        const phoneError = validateIranPhone(phone);
        if (phoneError) errors.phone = phoneError;

        const emailError = validateEmail(email, true);
        if (emailError) errors.email = emailError;

        const passwordError = validateRequired(password, 'رمز عبور');
        if (passwordError) errors.password = passwordError;

        if (role === 'doctor') {
            const medicalCodeError = validateRequired(medicalCode, 'شماره نظام پزشکی');
            if (medicalCodeError) errors.medicalCode = medicalCodeError;
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        setGeneralErrors('');

        if (!validate()) return;

        setSending(true);
        const result = await sendOtp(email);
        setSending(false);

        if (!result.success) {
            setGeneralErrors(result.message);
            return;
        }

        setStep(2);
    };

    const handleVerifyAndSignup = async (e) => {
        e.preventDefault();
        setGeneralErrors('');

        if (!code.trim()) {
            setGeneralErrors('لطفاً کد ۶ رقمی ارسال‌شده به ایمیلتان را وارد کنید');
            return;
        }

        setSending(true);
        const result = await signupWithEmail({ role, name, phone, email, code, password, medicalCode });
        setSending(false);

        if (!result.success) {
            setGeneralErrors(result.message);
            return;
        }

        if (result.role === 'patient')
            navigate('/patient/dashboard')
        else if (result.role === 'doctor')
            navigate('/doctor/dashboard')
    };

    const handleResend = async () => {
        setGeneralErrors('');
        setSending(true);
        const result = await sendOtp(email);
        setSending(false);
        if (!result.success) setGeneralErrors(result.message);
    };

    const errorBorder = (field) => (fieldErrors[field] ? 'border-red-400' : 'border-text-muted-foreground/25');

    if (step === 2) {
        return (
            <form onSubmit={ handleVerifyAndSignup } className="flex flex-col gap-[1rem]">
                <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                    <label htmlFor="signupOtpCode">کد ۶ رقمی ارسال‌شده به { email }</label>
                    <input
                        id="signupOtpCode"
                        type="text"
                        inputMode="numeric"
                        dir="ltr"
                        placeholder="123456"
                        value={ code }
                        onChange={ (e) => setCode(e.target.value) }
                        className="border border-text-muted-foreground/25 h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full"
                    />
                </div>

                {generalErrors && (
                    <p className="text-red-500 text-[0.875rem]">{ generalErrors }</p>
                )}

                <button type="submit" disabled={ sending } className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white disabled:opacity-60">
                    { sending ? 'در حال ساخت حساب...' : 'تایید و ساخت حساب' }
                </button>

                <div className="flex justify-between text-[0.8rem]">
                    <button type="button" onClick={ () => { setStep(1); setCode(''); setGeneralErrors(''); } } className="text-text-muted-foreground underline">
                        بازگشت و ویرایش اطلاعات
                    </button>
                    <button type="button" onClick={ handleResend } disabled={ sending } className="text-primary underline disabled:opacity-60">
                        ارسال دوباره‌ی کد
                    </button>
                </div>
            </form>
        );
    }

    return ( 
        <form onSubmit={ handleSendCode } action="" className="flex flex-col gap-[1rem]">
            <fieldset className="flex flex-col gap-[0.5rem]">
                <legend className="sr-only">نقش خود را انتخاب کنید</legend>
                <div className='flex flex-1 gap-[0.75rem]'>
                    <label className={`border flex flex-1 flex-col justify-center items-center px-[5.05rem] py-[0.98rem] rounded-[1.15rem] ${
                        role === "doctor" ? "border-primary bg-primary/5 text-accent" : "border-text-muted-foreground/24 text-text-muted-foreground/90"
                    }`}>
                        <input 
                            type="radio"
                            name="role"
                            value="doctor"
                            checked={ role === "doctor" }
                            onChange={() => { setRole("doctor");}}
                            className='sr-only'
                        />
                        <DoctorIcon />
                        پزشک
                    </label>
                    <label className={`border flex flex-1 flex-col justify-center items-center px-[5.05rem] py-[0.98rem] rounded-[1.15rem] ${
                        role === "patient" ? "border-primary bg-primary/5 text-accent" : "border-text-muted-foreground/24 text-text-muted-foreground/90"
                    }`}>
                        <input 
                            type="radio"
                            name="role"
                            value="patient"
                            checked={ role === "patient" }
                            onChange={() => { setRole("patient")}}
                            className='sr-only'
                        />
                        <UserIcon />
                        بیمار
                    </label>
                </div> 
            </fieldset>

            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="fullName" className="">
                   نام و نام خانوادگی <span className="text-red-500">*</span>
                </label>
                <input 
                    id="fullName"
                    type="text"
                    dir="rtl"
                    placeholder="مثلا زینب جنتی"
                    value={ name }
                    onChange={(e) => setName(e.target.value)}
                    className={`border ${errorBorder('name')} h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full`}
                />
                {fieldErrors.name && <p className="text-red-500 text-[0.75rem]">{fieldErrors.name}</p>}
            </div>

            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="phone" className="">
                    شماره موبایل <span className="text-red-500">*</span>
                </label>
                <input 
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern='[0-9]*'
                    dir="ltr"
                    placeholder="0913456997"
                    value={ phone }
                    onChange={(e) => setPhone(e.target.value)}
                    className={`border ${errorBorder('phone')} h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full`}
                />
                {fieldErrors.phone && <p className="text-red-500 text-[0.75rem]">{fieldErrors.phone}</p>}
            </div>

            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="email" className="">
                    ایمیل <span className="text-red-500">*</span>
                </label>
                <input 
                    id="email"
                    type="email"
                    dir="ltr"
                    placeholder="example@email.com"
                    value={ email }
                    onChange={(e) => setEmail(e.target.value)}
                    className={`border ${errorBorder('email')} h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full`}
                />
                {fieldErrors.email && <p className="text-red-500 text-[0.75rem]">{fieldErrors.email}</p>}
                <p className="text-[0.7rem] text-text-muted-foreground pr-[0.5rem]">یک کد تایید ۶ رقمی به همین ایمیل ارسال می‌شود.</p>
            </div>

            { role == "doctor" && 
                <div className='bg-primary bg-primary/17 border border-text-muted-foreground/25 border-dotted flex flex-col gap-[0.5rem] p-[1rem] rounded-[1.15rem] w-full'>
                    <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                        <label htmlFor="medicalCode" className="">
                            شماره نظام پزشکی <span className="text-red-500">*</span>
                        </label>
                        <input 
                            id="medicalCode"
                            type="text"
                            inputMode="numeric"
                            dir="ltr"
                            placeholder="12345"
                            value={ medicalCode }
                            onChange={(e) => setMedicalCode(e.target.value)}
                            className={`bg-white border ${errorBorder('medicalCode')} h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full`}
                        />
                        {fieldErrors.medicalCode && <p className="text-red-500 text-[0.75rem]">{fieldErrors.medicalCode}</p>}
                    </div>
                    <p className="flex font-normal gap-[0.3rem] justify-start items-center landing-[1.5rem] text-[0.75rem] text-center text-text-muted-foreground">
                        <span className="">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_13_2140)">
                                <path d="M2.5668 5.74657C2.46949 5.30825 2.48443 4.85246 2.61023 4.42146C2.73604 3.99046 2.96863 3.5982 3.28644 3.28105C3.60425 2.9639 3.997 2.73213 4.42827 2.60723C4.85953 2.48233 5.31535 2.46835 5.75346 2.56657C5.9946 2.18944 6.3268 1.87907 6.71943 1.66409C7.11206 1.44911 7.55249 1.33643 8.00013 1.33643C8.44776 1.33643 8.8882 1.44911 9.28083 1.66409C9.67346 1.87907 10.0057 2.18944 10.2468 2.56657C10.6856 2.46792 11.1422 2.48184 11.5741 2.60704C12.0061 2.73225 12.3994 2.96466 12.7174 3.28267C13.0354 3.60068 13.2678 3.99395 13.393 4.4259C13.5182 4.85786 13.5321 5.31446 13.4335 5.75324C13.8106 5.99437 14.121 6.32657 14.3359 6.7192C14.5509 7.11183 14.6636 7.55227 14.6636 7.9999C14.6636 8.44754 14.5509 8.88797 14.3359 9.2806C14.121 9.67323 13.8106 10.0054 13.4335 10.2466C13.5317 10.6847 13.5177 11.1405 13.3928 11.5718C13.2679 12.003 13.0361 12.3958 12.719 12.7136C12.4018 13.0314 12.0096 13.264 11.5786 13.3898C11.1476 13.5156 10.6918 13.5305 10.2535 13.4332C10.0126 13.8118 9.68018 14.1235 9.28688 14.3394C8.89358 14.5554 8.45215 14.6686 8.00346 14.6686C7.55478 14.6686 7.11335 14.5554 6.72004 14.3394C6.32674 14.1235 5.99429 13.8118 5.75346 13.4332C5.31535 13.5315 4.85953 13.5175 4.42827 13.3926C3.997 13.2677 3.60425 13.0359 3.28644 12.7188C2.96863 12.4016 2.73604 12.0093 2.61023 11.5783C2.48443 11.1473 2.46949 10.6916 2.5668 10.2532C2.18677 10.0127 1.87374 9.68002 1.65683 9.28605C1.43992 8.89207 1.32617 8.44964 1.32617 7.9999C1.32617 7.55016 1.43992 7.10773 1.65683 6.71376C1.87374 6.31979 2.18677 5.98707 2.5668 5.74657Z" stroke="#2671D9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 8.00008L7.33333 9.33341L10 6.66675" stroke="#2671D9" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_13_2140">
                                <rect width="16" height="16" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg>
                        </span>
                        حساب پزشکان پس از تایید مدیر سامانه فعال می‌شود.
                    </p>
                </div>
            }
            <div className="flex flex-col gap-[0.125rem] items-start pt-[0.15rem]">
                <label htmlFor="password" className="pr-[0.5rem]">
                    رمز عبور <span className="text-red-500">*</span>
                </label>
                <input 
                    id="password"
                    type="password"
                    dir="ltr"
                    placeholder="••••••••"
                    value={ password }
                    onChange={(e) => setPassword(e.target.value)}
                    className={`border ${errorBorder('password')} h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full`}
                />
                {fieldErrors.password && <p className="text-red-500 text-[0.75rem]">{fieldErrors.password}</p>}
            </div>

            {generalErrors && (
                <p className="text-red-500 text-[0.875rem]">{ generalErrors }</p>
            )}

            <button type="submit" disabled={ sending } className="bg-primary px-[2rem] py-[0.625rem] rounded-[1.15rem] text-white disabled:opacity-60">
                {sending ? 'در حال ارسال کد...': 'ارسال کد تایید' }
            </button>
        </form>
     );
}
 
export default SignUpForm;