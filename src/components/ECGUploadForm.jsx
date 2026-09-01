import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// همون الگوریتم رقم کنترلی که سمت بک‌اند هست (NationalCodeUtil) - فقط برای فیدبک سریع‌تر به کاربر
const isValidNationalCode = (code) => {
    if (!/^\d{10}$/.test(code)) return false;
    if (new Set(code.split('')).size === 1) return false; // 0000000000 و مشابه

    const digits = code.split('').map(Number);
    const checkDigit = digits[9];
    const sum = digits.slice(0, 9).reduce((acc, d, i) => acc + d * (10 - i), 0);
    const remainder = sum % 11;

    return remainder < 2 ? checkDigit === remainder : checkDigit === 11 - remainder;
};

const ECGUploadForm = ({ currentStep, setCurrentStep }) => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    //TODO: This 10 and 12-lead is supposed to be dynamic right?
    const [duration, setDuration] = useState("10");
    const [source, setSource] = useState("12-lead");
    const [symptoms, setSymptoms] = useState("");
    //This is defualt and when the user opens the page, the state of doctorReview is on! user can change that btw.
    const [doctorReview, setDoctorReview] = useState(true);
    const [fileError, setFileError] = useState('');
    const fileInputRef = useRef(null);
    const { currentUser, addRecord, getNationalCode } = useAuth();
    const navigate = useNavigate();

    // اگه کاربر از قبل کد ملی ثبت‌شده نداره، باید همین‌جا ازش بگیریم
    const [needsNationalCode, setNeedsNationalCode] = useState(null); // null = هنوز چک نشده
    const [nationalCode, setNationalCode] = useState('');
    const [nationalCodeError, setNationalCodeError] = useState('');

    useEffect(() => {
        if (!currentUser?.profile?.id) return;
        getNationalCode(currentUser.profile.id).then((code) => {
            setNeedsNationalCode(!code);
        });
    }, [currentUser, getNationalCode]);

    const acceptedFormats = [".wfdb", ".csv", ".edf", ".xml"];
    const maxSizeMB = 20;
    
    const handleFileSelect = (selectedFile) => {
        if (!selectedFile) return;

        const sizeMB = selectedFile.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            alert(`حجم فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد.`);
            return;
        }

        setFile(selectedFile);
        setFileError(''); // If there was an error because of not correctly selecting the file, the error will be none cause this time the process of selecting the file is valid.
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files[0]);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setFileError("لطفاً یک فایل انتخاب کنید یا آن را در این کادر رها کنید.");
            return;
        }

        setNationalCodeError('');
        if (needsNationalCode) {
            if (!nationalCode.trim()) {
                setNationalCodeError('برای ثبت اولین نوار قلب، وارد کردن کد ملی الزامی است');
                return;
            }
            if (!isValidNationalCode(nationalCode.trim())) {
                setNationalCodeError('کد ملی وارد شده معتبر نیست');
                return;
            }
        }

        setCurrentStep(1);
        await new Promise((r) => setTimeout(r, 500));

        setCurrentStep(2);
        await new Promise((r) => setTimeout(r, 500));

        setCurrentStep(3);
        await new Promise((r) => setTimeout(r, 500));

        const result = await addRecord({
            duration: Number(duration),
            source,
            symptoms: symptoms || null,
            needsDoctorReview: doctorReview,
            nationalCode: needsNationalCode ? nationalCode.trim() : undefined,
        });

        setCurrentStep(4);
        await new Promise((r) => setTimeout(r, 500));

        if (!result.success) {
            setFileError(result.message || 'ثبت رکورد با خطا مواجه شد. مطمئن شوید بک‌اند روشن است و دوباره تلاش کنید.');
            return;
        }

        navigate(`/patient/dashboard/records/${result.record.recId}`);

    }

    const handleInputChange = (e) => {
        handleFileSelect(e.target.files[0]);
    };

    return (
        <form
            onSubmit={ handleSubmit }
            aria-labelledby='upload-heading'
            className='bg-white border border-text-muted-foreground/25 flex flex-[2] flex-col gap-[1rem] p-[1.55rem] rounded-[1.4rem] shadow-sm whitespace-nowrap'
        >
            {/* DropZone */}
            <div 
                onDrop={ handleDrop }
                onDragOver={ handleDragOver }
                onDragLeave={ handleDragLeave }
                className={`relative bg-primary/10 border border-dotted flex flex-col justify-center items-center px-[1.5375rem] overflow-hidden py-[3.5375rem] rounded-[1.4rem] ${
                    fileError ? 'border-red-400' : 'border-text-muted-foreground/25'
                }`}
            >
                <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>

                <div className="bg-white h-[3.5rem] flex justify-center items-center py-[1rem] rounded-full w-[3.5rem]">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 13V21" stroke="#2671D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.00009 14.899C3.25714 14.1399 2.69666 13.2217 2.36113 12.214C2.0256 11.2062 1.9238 10.1353 2.06346 9.08232C2.20311 8.02938 2.58055 7.02202 3.16719 6.13655C3.75383 5.25109 4.53428 4.51074 5.44943 3.97157C6.36458 3.43241 7.39042 3.10857 8.44926 3.0246C9.5081 2.94062 10.5722 3.09871 11.5609 3.48688C12.5496 3.87505 13.4369 4.48313 14.1558 5.26506C14.8747 6.04698 15.4062 6.98225 15.7101 8.00002H17.5001C18.4656 7.99991 19.4056 8.31034 20.1811 8.88546C20.9566 9.46058 21.5266 10.2699 21.8069 11.1938C22.0871 12.1178 22.0628 13.1074 21.7374 14.0164C21.4121 14.9254 20.803 15.7057 20.0001 16.242" stroke="#2671D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 17L12 13L16 17" stroke="#2671D9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                </div>

                <div className="pt-[1rem]">
                    <h2 className="font-semibold leading-[1.5rem] text-[1rem]">{ file ? file.name : 'فایل را اینجا رها کنید'}</h2>
                </div>
                <p className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">
                    {file
                        ? `${(file.size / (1024 * 1024)).toFixed(2)} مگابایت`
                        : `فرمت‌های مجاز: ${ acceptedFormats
                            .map((form) => form.replace(".", "").toUpperCase())
                            .join('،')} - حداکثر ${ maxSizeMB } مگابایت`
                    }
                </p>
                <label
                    htmlFor="file-upload" 
                    className="bg-white flex font-normal justify-center gap-[0.375rem] items-center leading-[1.25rem] p-[0.5rem] rounded-full text-[0.875rem] shadow-sm mt-[1rem]">
                    <span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.00008 14.6667C3.64646 14.6667 3.30732 14.5262 3.05727 14.2762C2.80722 14.0261 2.66675 13.687 2.66675 13.3334V2.66671C2.66675 2.31309 2.80722 1.97395 3.05727 1.7239C3.30732 1.47385 3.64646 1.33338 4.00008 1.33338H9.33341C9.54445 1.33303 9.75347 1.37444 9.94844 1.45522C10.1434 1.536 10.3205 1.65455 10.4694 1.80404L12.8614 4.19604C13.0113 4.34505 13.1302 4.52227 13.2112 4.71748C13.2922 4.91269 13.3338 5.12202 13.3334 5.33338V13.3334C13.3334 13.687 13.1929 14.0261 12.9429 14.2762C12.6928 14.5262 12.3537 14.6667 12.0001 14.6667H4.00008Z" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.33325 1.33337V4.66671C9.33325 4.84352 9.40349 5.01309 9.52851 5.13811C9.65354 5.26314 9.82311 5.33337 9.99992 5.33337H13.3333" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 8V12" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 10L8 8L6 10" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    انتخاب فایل
                        <input
                            ref={ fileInputRef } 
                            id='file-upload'
                            type="file"
                            accept={ acceptedFormats.join(',')}
                            onChange= { handleInputChange }
                            className="sr-only"
                            />
                </label>
            </div>
            {fileError && <p className="text-red-500 text-[0.75rem] -mt-[0.5rem]">{fileError}</p>}

            {needsNationalCode && (
                <div className="flex flex-col gap-[0.3125rem] pt-[0.125rem]">
                    <label htmlFor="nationalCode" className="font-medium leading-[0.875rem] text-[0.875rem]">
                        کد ملی <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="nationalCode"
                        type="text"
                        inputMode="numeric"
                        dir="ltr"
                        placeholder="0012345678"
                        value={ nationalCode }
                        onChange={(e) => setNationalCode(e.target.value)}
                        className={`border ${nationalCodeError ? 'border-red-400' : 'border-text-muted-foreground/25'} h-[2.75rem] px-[0.8rem] rounded-[1.15rem] shadow-sm w-full`}
                    />
                    <p className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">
                        برای ثبت اولین نوار قلب لازم است؛ دفعات بعد دیگر نیازی به وارد کردنش نیست.
                    </p>
                    {nationalCodeError && <p className="text-red-500 text-[0.75rem]">{nationalCodeError}</p>}
                </div>
            )}

            {/* Duration and Source */}
            {/* fixed width it has */}
            {/* TODO: فلش مربوط به تگ سلکت و فوکس شدن اینپوت ها رو درست باید کرد */}
            <div className="grid grid-cols-2 gap-[1rem] pt-[0.5rem] w-[34.81625rem]">
                <div className="flex flex-1 flex-col gap-[0.3125rem]">
                    <label htmlFor="duration" className="font-medium leading-[0.875rem] text-[0.875rem]">منبع داده</label>
                    <select 
                        name="source" 
                        id="source" 
                        value={ source }
                        onChange={(e) => setSource(e.target.value)}
                        dir='ltr' 
                        className="border border-text-muted-foreground/25 font-normal leading-[1.25rem] px-[0.75rem] py-[0.5rem] rounded-full text-[0.875rem] shadow-sm">
                        <option value="12-lead">فایل خام 12 لیدی</option>
                        <option value="device">اتصال مستقیم دستگاه</option>
                    </select>
                </div>
                <div className="flex flex-1 flex-col gap-[0.3125rem]">
                    <label htmlFor="duration" className="font-medium leading-[0.875rem] text-[0.875rem]">مدت ثبت</label>
                    <select name="duration" id="duration" dir='ltr' className="border border-text-muted-foreground/25 font-normal leading-[1.25rem] px-[0.75rem] py-[0.5rem] rounded-full text-[0.875rem] shadow-sm">
                        <option value="10">10 ثانیه</option>
                    </select>
                </div>
            </div>

            {/* Signs */}
            <div className="flex flex-col gap-[0.3125rem] pt-[0.125rem]">
                <label htmlFor="symptoms" className="font-medium leading-[0.875rem] text-[0.875rem]">توضیح علائم (اختیاری)</label>
                <textarea 
                    name="symptoms" 
                    id="symptoms"
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="مثلاً تپش قلب هنگام فعالیت، سرگیجه صبحگاهی…"
                    className="border border-text-muted-foreground/40 font-normal leading-[1.25rem] pt-[0.5626rem] pr-[0.75rem] rounded-[1.15rem] text-[0.875rem] shadow-sm"
                    ></textarea>
            </div>

            <div>
                <label 
                    htmlFor="doctor-review"
                    className="bg-primary/20 flex justify-between px-[1rem] py-[0.75rem] rounded-[1.15rem]"
                    >
                    <div className="flex flex-col">
                        <span className="font-medium leading-[1.25rem] text-[0.875rem]">درخواست بررسی توسط پزشک</span>
                        <span className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">نتیجه پس از تحلیل برای پزشک ارسال می‌شود</span>
                    </div>
                    <button
                        type="button"
                        role="switch"
                        aria-checked = { doctorReview }
                        onClick={() => setDoctorReview(!doctorReview)}
                        className={ `relative h-[1.25rem] rounded-full w-[2.25rem] transition-colors ${
                            doctorReview ? 'bg-primary' : 'bg-gray-300'
                        }`}
                    >
                        <span
                            className={ `absolute bg-white h-[1rem] rounded-full top-[0.15rem] transition-transform w-[1rem] ${
                                doctorReview ? "right-[0.125rem]" : "right-[1.2rem]"
                            }`}    
                        ></span>
                    </button>
                    <input 
                        id="doctor-review"
                        type="checkbox" 
                        checked={ doctorReview }
                        onChange={() => setDoctorReview(!doctorReview)}
                        className="sr-only"
                    />
                </label>
            </div>
            <button
                type="submit"
                disabled={ needsNationalCode === null }
                className="bg-primary h-[2.5rem] font-medium leading-[1.25rem] text-white rounded-[1.15rem] text-[0.875rem] w-full disabled:opacity-60"
            >
                شروع تحلیل
            </button>
        </form>
    
     );
}
 
export default ECGUploadForm;