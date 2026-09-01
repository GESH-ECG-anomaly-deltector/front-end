import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ecgSample from '../assets/images/ecg-sample2.png'
import { useAuth } from "../context/AuthContext";

import DoctorHeader from "./DoctorHeader";
import { getDiagnosisColorClass } from "../utils/diagnosisHelpers";

import PatientCard from "./PatientCard";

const API_BASE_URL = 'http://localhost:8080/api';

const DoctorPatientDetails = () => {
    const { patientId } = useParams();
    const { currentUser, recordsData } = useAuth();
    const navigate = useNavigate();

    const [patient, setPatient] = useState(null);
    const [patientLoading, setPatientLoading] = useState(true);
    const [nationalCode, setNationalCode] = useState('');

    useEffect(() => {
        setPatientLoading(true);
        fetch(`${ API_BASE_URL }/patients/${ patientId }`)
            .then((res) => {
                if (!res.ok) throw new Error('patient not found');
                return res.json();
            })
            .then((data) => setPatient(data))
            .catch(() => setPatient(null))
            .finally(() => setPatientLoading(false));

        fetch(`${API_BASE_URL}/users/by-profile/${patientId}`)
            .then((res) => (res.ok ? res.json() : { nationalCode: '' }))
            .then((data) => setNationalCode(data.nationalCode || ''))
            .catch(() => setNationalCode(''));
    }, [patientId]);

    const [doctorNote, setDoctorNote] = useState("");

    if (patientLoading) {
        return (
            <div className="flex flex-col gap-[1.5rem] w-full">
                <DoctorHeader />
                <p className="text-text-muted-foreground">در حال دریافت اطلاعات بیمار...</p>
            </div>
        );
    }

    if (!patient) {
        return <p>بیمار یافت نشد.</p>;
    }

    const patientRecords = recordsData.filter((r) => r.patientId === patientId);

    if (patientRecords.length === 0) {
        return (
            <div className="flex flex-col gap-[1.5rem] w-full">
                <DoctorHeader />
                <p className="text-text-muted-foreground">این بیمار هنوز هیچ آزمایشی ثبت نکرده است.</p>
            </div>
        );
    }

    const latestResult = patientRecords[0];

    const primaryDiagnosis = latestResult.diagnoses.find(
        (d) => d.code === latestResult.primaryDiagnosisCode
    ) || latestResult.diagnoses[0];


    return ( 
        <div className="flex flex-col gap-[1.5rem] w-full whitespace-nowrap">
            <DoctorHeader />
            <section className="flex justify-between">
                <header className="whitespace-nowrap">
                    <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">{ patient.name }</h1>
                    <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">
                        { patient.patientCode } · کد ملی { nationalCode || 'ثبت نشده' } · { patient.age } ساله · { patient.gender }
                    </p>
                </header>
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="bg-white border border-text-muted-foreground/24 flex gap-[0.5rem] h-[2.25rem] items-center px-[1rem] py-[0.8rem] rounded-full shadow-sm w-fit"
                    >
                        <span className="font-medium leading-[1.25rem] text-black text-[0.875rem]">بازگشت</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 12L6 8L10 4" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </section>

            <section className="flex gap-[1rem]">
                {/* Right Column */}
                <article className='flex flex-[2] flex-col gap-[1rem] '>
                    <section className='bg-white border border-text-muted-foreground/24 flex flex-col relative rounded-[1.4rem]'>
                        <div className='flex justify-between items-center px-[1.125rem] py-[0.75rem]'>
                            <h2 className='font-bold leading-[1.125rem] text-[0.875rem]'>آخرین سیگنال - REC-{ latestResult.recId }</h2>
                            <span className='font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground' dir='ltr'>
                              { latestResult.lastRecDate }
                            </span>
                        </div>
                        <figure className='relative'>
                            <figcaption className="absolute bg-success/15 font-semibold top-[1rem] left-[1.25rem] px-[0.625rem] py-[0.25rem] rounded-full text-[0.75rem] text-success">
                                { primaryDiagnosis.label } · { primaryDiagnosis.confidence }%
                            </figcaption>
                            <div className="h-fit overflow-hidden px-[0.5rem] py-[1rem] w-fit">
                                <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div>
                                    <img src={ ecgSample } alt="ecg-sample" />
                                </div>
                            </div>
                        </figure>

                        <ul className="pt-[0.75rem] flex flex-col gap-[0.75rem] p-[1.25rem]">
                        { latestResult.diagnoses.map((d) => (
                            <li key={ d.code } className=" flex flex-col gap-[0.375rem]">
                                <div className="flex justify-between font-normal leading-[1.25rem] text-[0.875rem]">
                                    <span className="">{ d.label }</span>
                                    <span className="">{ d.confidence }%</span>
                                </div>
                                <div dir="ltr" className="bg-primary/20 rounded-full">
                                    <div 
                                        className="bg-primary h-[0.375rem] rounded-full w-full" 
                                        style={{width: `${ d.confidence }%`}}
                                        dir="ltr"
                                    ></div>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </section>
                    

                    <section className='bg-white border border-text-muted-foreground/25 flex flex-col gap-[0.75rem] p-[1.25rem] rounded-[1.4rem]'>
                        <div className="flex flex-col gap-[0.75rem] pt-[0.125rem]">
                            <label htmlFor="doctorNote" className="font-medium leading-[0.875rem] text-[0.875rem]">ثبت نظر و تایید تشخیص</label>
                            <textarea 
                                name="doctorNote" 
                                id="doctorNote"
                                value={ doctorNote }
                                onChange={(e) => setDoctorNote(e.target.value)}
                                placeholder="نظر تخصصی خود درباره‌ی این نتیجه را بنویسید…"
                                className="border border-text-muted-foreground/40 font-normal leading-[1.25rem] pt-[0.5626rem] pr-[0.75rem] rounded-[1.15rem] text-[0.875rem] shadow-sm"
                                ></textarea>
                        </div>
                        <div className="flex flex-col pt-[0.25rem] pl-[0.625rem]">
                            <div className="flex gap-[0.5rem] font-medium justify-end leading-[1.25rem] text-[0.875rem]">
                                <button type="button" className="border border-text-muted-foreground/24 px-[1rem] py-[0.5rem] rounded-full shadow-sm">
                                    رد تشخیص و ثبت نظر جایگزین
                                </button>
                                <button type="button" className="px-[1rem] py-[0.5rem]">
                                    درخواست آزمایش تکمیلی
                                </button>
                            </div>
                            <div className="flex justify-end">
                                <button type="button" className="bg-primary flex gap-[0.5rem] items-center leading-[1.25rem] px-[1rem] py-[0.5rem] rounded-[1.15rem] text-[0.875rem] text-white w-fit">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_32_260)">
                                    <path d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z" stroke="#F9FCFF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 8.00008L7.33333 9.33341L10 6.66675" stroke="#F9FCFF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
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
                    <PatientCard patient={ patient } />
                    <section className="bg-white border border-text-muted-foreground/25 flex flex-col gap-[1rem] p-[1.2375rem] rounded-[1.4rem]">
                        <h2 className="font-bold leading-[1.5rem] text-[1rem]">تاریخچه نتایج</h2>
                        <ul className="flex flex-col gap-[0.75rem]">
                            { patientRecords.map((record) => {
                                const recordDiagnosis = record.diagnoses.find(
                                    (d) => d.code === record.primaryDiagnosisCode
                                ) || record.diagnoses[0];

                                return (
                                    <li key={ record.recId } className="border-b border-text-muted-foreground/24 pb-[0.75rem] flex justify-between">
                                        <div>
                                            <p className="font-medium leading-[1.25rem] text-[0.875rem]">REC-{ record.recId }</p>
                                            <p className="font-normal leading-[1rem] text-text-muted-foreground text-[0.75rem]">{ record.lastRecDate }</p>
                                        </div>
                                        <span className={`font-semibold flex justify-center items-center leading-[1rem] rounded-full px-[0.6125rem] py-[0.2375rem] text-[0.75rem] ${ getDiagnosisColorClass(recordDiagnosis.code) }`}>
                                            { recordDiagnosis.label }
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                </article>
            </section>
        </div>
     );
}
 
export default DoctorPatientDetails;