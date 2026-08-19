import { Link, useParams } from "react-router-dom";

import DoctorHeader from "./DoctorHeader";
import ecgSample from '../assets/images/ecg-sample2.png'
import { mockPatients } from "../data/mockPatients";
import { mockRecords } from "../data/mockRecords";

const DoctorPatientDetails = () => {
    const { currentPatientId } = useParams();
    const patientName = 'زینب جنتی';

    const diagnosisColorClass = (diagnosis) => {
        switch(diagnosis) {
            case 'ریتم سینوسی طبیعی':
                return 'bg-success/15 text-success';
            case 'فیبرلاسیون دهلیزی':
                return 'bg-pulse/15 text-pulse';
            case 'بلوک شاخه‌ای راست':
                return 'bg-warning/15 text-warning'
            case 'برادی‌کاری خفیف':
                return '';
            case 'در حال پردازش':
                return 'bg-text-muted-foreground/15 text-text-muted-foreground';
        }
    };

    return ( 
        <div className="flex flex-col gap-[1.5rem] w-full whitespace-nowrap">
            <doctorHeader />
            <section className="flex justify-between">
                <header className="whitespace-nowrap">
                    <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">{patientName}</h1>
                    <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">PT-204 · 34 ساله · زن · کد ملی ۰۰۲۳۴۵۶۷۸۹</p>
                </header>
                <div className="flex items-end">
                    <Link to='/doctor/dashboard/reviews' className="bg-white border border-text-muted-foreground/24 flex gap-[0.5rem] h-[2.25rem] items-center px-[1rem] py-[0.8rem] rounded-full shadow-sm w-fit">
                        <span className="font-medium leading-[1.25rem] text-black text-[0.875rem]">بازگشت</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12L6 8L10 4" stroke="#152030" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                </div>
            </section>

            <section className="flex gap-[1rem]">
                {/* Right Column */}
                <article className='flex flex-[2] flex-col gap-[1rem] '>
                    <section className='bg-white border border-text-muted-foreground/24 flex flex-col relative rounded-[1.4rem]'>
                        <div className='flex justify-between items-center px-[1.125rem] py-[0.75rem]'>
                            <h2 className='font-bold leading-[1.125rem] text-[0.875rem]'>آخرین سیگنال</h2>
                            <span className='font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground' dir='ltr'>
                                ۱۴۰۵/۰۵/۱۲ — ۰۹:۲۴
                            </span>
                        </div>
                        <figure className='relative'>
                            <div className="h-fit overflow-hidden px-[0.5rem] py-[1rem] w-fit">
                                <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div>
                                    <img src={ ecgSample } alt="ecg-sample" />
                                </div>
                            </div>
                        </figure>

                        <ul className="pt-[0.75rem] flex flex-col gap-[0.75rem] p-[1.25rem]">
                        {/* { record.diagnoses.map((data) => ( */}
                            <li key={''} className=" flex flex-col gap-[0.375rem]">
                                <div className="flex justify-between font-normal leading-[1.25rem] text-[0.875rem]">
                                    <span className="">ریتم سینوسی طبیعی</span>
                                    <span className="">{ 94 }%</span>
                                </div>
                                <div dir="ltr" className="bg-primary/20 rounded-full">
                                    <div 
                                        className="bg-primary h-[0.375rem] rounded-full w-full" 
                                        // style={{width: `${ data.confidence }%`}}
                                        style={{width: '94%'}}
                                        dir="ltr"
                                    ></div>
                                </div>
                            </li>
                        {/* ))} */}
                        </ul>
                    </section>
                    

                    <section className='bg-white border border-text-muted-foreground/25 flex flex-col gap-[0.75rem] p-[1.25rem] rounded-[1.4rem]'>
                        <div className="flex flex-col gap-[0.75rem] pt-[0.125rem]">
                            <label htmlFor="" className="font-medium leading-[0.875rem] text-[0.875rem]">ثبت نظر و تایید تشخیص</label>
                            <textarea 
                                name="symptoms" 
                                id="symptoms"
                                onChange={(e) => setSymptoms(e.target.value)}
                                placeholder="نظر تخصصی خود درباره‌ی این نتیجه را بنویسید…"
                                className="border border-text-muted-foreground/40 font-normal leading-[1.25rem] pt-[0.5626rem] pr-[0.75rem] rounded-[1.15rem] text-[0.875rem] shadow-sm"
                                ></textarea>
                        </div>
                        <div className="flex flex-col pt-[0.25rem] pl-[0.625rem]">
                            <div className="flex gap-[0.5rem] font-medium justify-end leading-[1.25rem] text-[0.875rem]">
                                <button className="border border-text-muted-foreground/24 px-[1rem] py-[0.5rem] rounded-full shadow-sm">
                                    رد تشخیص و ثبت نظر جایگزین
                                </button>
                                <button className="px-[1rem] py-[0.5rem]">
                                    درخواست آزمایش تکمیلی
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <button className="bg-primary flex gap-[0.5rem] items-center leading-[1.25rem] px-[1rem] py-[0.5rem] rounded-[1.15rem] text-[0.875rem] text-white w-fit">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_32_260)">
                                    <path d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 8.00008L7.33333 9.33341L10 6.66675" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_32_260">
                                    <rect width="16" height="16" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                                تایید تشخیص مدل
                            </button>
                            </div>
                        </div>
                    </section>
                </article>

                {/* Left Column */}
                <article className="flex flex-1 flex-col gap-[1rem] p-[1.2375rem] rounded-[1.4rem]">
                    <header className="bg-white border border-text-muted-foreground/25 flex flex-col gap-[1rem] p-[1.25rem] rounded-[1.4rem]">
                        <div className="flex gap-[0.75rem]">
                            <div className="bg-primary/20 flex justify-center h-[2.25rem] items-center rounded-full w-[2.25rem]">
                                <span className="font-normal leading-[1rem] text-[0.75rem]">{ mockPatients[0].first2letters }</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold leading-[1.1.25rem] text-[0.875rem]">{ patientName }</span>
                                <span className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">{ mockPatients[0].testCount} آزمایش ثبت‌شده</span>
                            </div>
                        </div>
                        <div className="flex font-semibold leading-[1rem gap-[0.5rem] text-[0.75rem]">
                            <span className="bg-warning/20 text-warning px-[0.625rem] pt-[0.2125rem] pb-[0.261875rem] rounded-full">
                                ریسک متوسط
                            </span>
                            <span className="bg-primary/20 text-accent px-[0.625rem] pt-[0.2125rem] pb-[0.261875rem] rounded-full">
                                منتظر بررسی
                            </span>
                        </div>
                    </header>

                    <section className="bg-white border border-text-muted-foreground/25 flex flex-col gap-[1rem] p-[1.2375rem] rounded-[1.4rem]">
                        <h2 className="font-bold leading-[1.5rem] text-[1rem]">تاریخچه نتایج</h2>
                        <ul className="flex flex-col gap-[0.75rem]">
                            { mockRecords.map((record) => (
                                <li key={ record.recId } className="border-b border-text-muted-foreground/24 flex justify-between">
                                    <div>
                                        <p className="font-medium leading-[1.25rem] text-[0.875rem]">REC-{ record.recId }</p>
                                        <p className="font-normal leading-[1rem] text-text-muted-foreground text-[0.75rem]">{ record.date }</p>
                                    </div>
                                    <span className={`font-semibold flex justify-center items-center leading-[1rem] rounded-full px-[0.6125rem] py-[0.2375rem] text-[0.75rem] ${ diagnosisColorClass(record.diagnoses[0].label) }`}>
                                        { record.diagnoses[0].label }
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </article>
            </section>
        </div>
     );
}
 
export default DoctorPatientDetails;