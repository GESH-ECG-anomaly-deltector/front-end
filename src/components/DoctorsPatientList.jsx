import { Link } from "react-router-dom";

import { useDoctor } from "../context/DoctorContex";
import DoctorHeader from "./DoctorHeader";

const DoctorsPatientList = () => {
    // This is very very Static :)))) gotta FIX IT :))))
    const { doctorName, patients, first2letters } = useDoctor();
    return ( 
        <div className="flex flex-col gap-[1rem]">
            <DoctorHeader />
            <header className="whitespace-nowrap">
                <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">بیماران من</h1>
                <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">فهرست بیمارانی که نتایج آن‌ها در دسترس شماست</p>
            </header>

            {/* Search Box */}
            <div className="w-[24rem] pt-[0.5rem]">
                <div className="relative w-full">
                    <label htmlFor="patient-search" className="sr-only">جست‌وجوی بیمار</label>
                    <input
                        id='patient-search' 
                        type="search"
                        placeholder="جست‌وجوی بیمار"
                        className='border border-text-muted-foreground/24 bg-white font-normal text-[0.875rem] text-[#667384] pr-[2.26625rem] py-[0.7rem] rounded-[1.15rem] shadow-sm w-full'
                    />
                    <svg 
                        className="absolute top-[0.875rem] right-[0.75rem]"
                        width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 14L11.1067 11.1067" stroke="#667384" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="#667384" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>

            <ul className="grid grid-cols-2 gap-[0.75rem]">
                {patients.map((patient) =>(
                    <li key={ patient.id }>
                        <Link to={`/doctor/patients/${patient.id}`}
                              className="relative bg-white border rounded-[1.4rem] border-text-muted-foreground/24 flex gap-[1rem] p-[1.2375rem] justify-around items-center shadow-sm w-full whitespace-nowrap">
                                <div className="bg-primary/20 flex justify-center h-[2.75rem] items-center rounded-full w-[2.75rem]">
                                    <span className="font-normal leading-[1rem] text-[0.75rem]">{ first2letters }</span>
                                </div>
                                <div className="flex flex-col gap-[0.275rem]">
                                    <div className="flex justify-start gap-[0.5rem]">
                                        <p className="font-bold leading-[1.5rem] text-[1rem]">{ patient.name }</p>
                                        <span className="bg-primary/20 font-semibold leading-[1rem] text-accent px-[0.625rem] py-[0.25rem] rounded-full text-[0.75rem]">
                                            درخواست بررسی
                                        </span>
                                    </div>
                                    <p className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">{ patient.age } ساله. { patient.gender }. 4 آزمایش. آخرین ثبت 12/05/1405</p>
                                </div>

                                
                                <div className="flex gap-[0.75rem] font-semibold items-center leading-[1rem] text-[0.75rem] whitespace-nowrap">
                                    <span className="bg-success/20 px-[0.625rem] py-[0.25rem] rounded-full text-success">
                                        ریسک متوسط
                                    </span>
                                </div>

                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12L6 8L10 4" stroke="#667384" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                        </Link>
                    </li>
                ))}
            </ul>

        </div>
     );
}
 
export default DoctorsPatientList;