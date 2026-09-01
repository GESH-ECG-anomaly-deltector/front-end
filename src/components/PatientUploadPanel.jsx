import { useState } from "react";

import PatientHeader from "./PatientHeader";
import ECGUploadForm from "./ECGUploadForm";
import ProcessingStatusPanel from "./ProcessingStatusPanel";

const PatientUploadPanel = () => {
    const [currentStep, setCurrentStep] = useState(0);
    // 0 = هنوز شروع نشده
    // 1 = بارگذاری
    // 2 = ... پایین تعریف کردم:

    const steps = [
        {id: 1, label: 'بارگذاری فایل'},
        {id: 2, label: 'پیش‌پردازش سیگنال'},
        {id: 3, label: 'استنتاج مدل'},
        {id: 4, label: 'آماده‌سازی گزارش'},
    ];

    return ( 
        <div className="flex flex-col gap-[1.5rem]">
            <PatientHeader />
            <header>
                <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>آپلود نوار قلب</h1>
                <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>فایل خام ۱۲ لیدی را بارگذاری کنید یا دستگاه را متصل کنید</p>
            </header>
            <div className="flex gap-[1rem]">
                {/* Right Column */}
                <div className="rounded-[1.4rem]">
                    <ECGUploadForm currentStep = { currentStep } setCurrentStep = { setCurrentStep } />
                </div>

                {/* Left Column */}
                <ProcessingStatusPanel currentStep = { currentStep } steps = { steps } />
            </div>
        </div>
     );
}
 
export default PatientUploadPanel;