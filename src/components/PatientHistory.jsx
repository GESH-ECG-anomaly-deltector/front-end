import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import PatientHeader from "./PatientHeader";
import { getDiagnosisColorClass, getStatusColorClass, getStatusLabel } from "../utils/diagnosisHelpers";

const PatientHistory = () => {
    const { currentUser, recordsData } = useAuth();

    const [searchQuery, setSearchQuery] = useState("");

    const patientsRecords = recordsData.filter((r) => (
        r.patientId === currentUser.profile.id
    ));

    if (patientsRecords.length === 0) {
        return (
            <div className="flex flex-col gap-[1rem]">
                <PatientHeader />
                <header>
                    <h1 className="font-extrabold text-[1.5rem]">سلام، {currentUser.profile.name}</h1>
                    <p className="text-text-muted-foreground">هنوز هیچ آزمایشی ثبت نکرده‌اید</p>
                </header>

                <div className="bg-white rounded-[1.4rem] shadow-sm p-8 flex flex-col items-center gap-4">
                    <p className="text-text-muted-foreground text-center">
                        برای دیدن تحلیل نوار قلب، اولین آزمایش خود را آپلود کنید.
                    </p>
                    <Link 
                        to="/patient/dashboard/ecg-upload" 
                        className="bg-primary text-white rounded-full px-6 py-2"
                    >
                        آپلود نوار قلب
                    </Link>
                </div>
            </div>
        )
    }

    const visibleRecords = patientsRecords.filter((r) => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return (
            r.recId.toLowerCase().includes(query) ||
            r.lastRecDate.includes(query)
        );
    });

    return ( 
        <div className="flex flex-col gap-[1rem] w-full">
            <PatientHeader />
            <header className="">
                <div>
                    <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>تاریخچه آزمایش‌ها</h1>
                    <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>همه‌ی نوارهای قلبِ ثبت‌شده و نتیجه‌ی تحلیل آن‌ها</p>
                </div>
            </header>

            {/* Search Box */}
            <div className="w-[24rem] pt-[0.5rem]">
                <div className="relative w-full">
                    <label htmlFor="search" className="sr-only">جست‌وجو براساس شناسه یا تاریخ</label>
                    <input
                        id='search' 
                        type="search"
                        placeholder="جست‌وجو بر اساس شناسه یا تاریخ"
                        value={ searchQuery }
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='border border-text-muted-foreground/24 bg-white font-normal text-[0.875rem] text-[#667384] pr-[2.26625rem] py-[0.7rem] rounded-[1.15rem] shadow-sm w-full'
                    />
                    <svg 
                        className="absolute top-[0.875rem] right-[0.75rem]"
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 14L11.1067 11.1067" stroke="#667384" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#667384" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>

            {/* list of Records */}
            <ul className="flex flex-col gap-[0.75rem]">
                {visibleRecords.map((record) => {
                    const primaryDiagnosis = record.diagnoses.find(
                        (d) => d.code === record.primaryDiagnosisCode
                    ) || record.diagnoses[0];

                    return (
                        <li key={ record.recId }>
                            <Link to={`/patient/dashboard/records/${record.recId}`}
                                  className="bg-white border rounded-[1.4rem] border-text-muted-foreground/24 flex p-[1.2375rem] justify-around items-center shadow-sm w-full whitespace-nowrap">
                                    <div className="flex flex-col gap-[0.375rem]">
                                        <p className="font-bold leading-[1.5rem] text-[1rem]">REC-{ record.recId }</p>
                                        <p className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">{ record.lastRecDate }</p>
                                    </div>

                                    <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">
                                        { record.source } · { record.leadCount } لید · { record.duration } ثانیه
                                    </p>

                                    <div className="flex gap-[0.75rem] font-semibold items-center leading-[1rem] text-[0.75rem] whitespace-nowrap">
                                        <span className={`${ getDiagnosisColorClass(primaryDiagnosis.code) } px-[0.625rem] py-[0.25rem] rounded-full`}>
                                            { primaryDiagnosis.label }
                                        </span>
                                        <span className={`${ getStatusColorClass(record.status) } px-[0.625rem] py-[0.25rem] rounded-full`}>
                                            { getStatusLabel(record.status) }
                                        </span>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 12L6 8L10 4" stroke="#667384" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
     );
}
 
export default PatientHistory;
