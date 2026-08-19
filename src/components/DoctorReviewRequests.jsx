import { Link } from "react-router-dom";

import DoctorHeader from "./DoctorHeader";
import { useDoctor } from "../context/DoctorContex";

const DoctorReviewRequests = () => {
        const { doctorName, patients, first2letters } = useDoctor();
        const currentPatientId = 1;
        const currentRecord = 2;
    return ( 
        <div className="flex flex-col gap-[1.5rem] w-full">
            <DoctorHeader />
            <header className="">
                <div>
                    <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>درخواست‌های بررسی</h1>
                    <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>3 درخواست در انتظار پاسخ شما</p>
                </div>
            </header>

            <ul className="flex flex-col gap-[0.75rem]">
                {patients.map((patient) =>(
                    <li key={ patient.id }>
                        <Link to={`/doctor/patients/${patient.id}`}
                              className="bg-white border rounded-[1.4rem] border-text-muted-foreground/24 flex gap-[1rem] p-[1.2375rem] justify-around items-center shadow-sm w-full whitespace-nowrap">
                                
                                <div className="flex flex-col gap-[0.275rem]">
                                    <p className="font-bold leading-[1.5rem] text-[1rem]">{ patient.name }</p>
                                    <p className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">{ patient.age } ساله. { patient.gender }. 4 آزمایش. آخرین ثبت 12/05/1405</p>
                                </div>

                            
                                <div className="flex gap-[0.75rem] font-semibold items-center leading-[1rem] text-[0.75rem] whitespace-nowrap">
                                    <span className="bg-warning/20 px-[0.625rem] py-[0.25rem] rounded-full text-warning">
                                        ریسک متوسط
                                    </span>
                                    <Link to={`/doctor/dashboard/patients/${ currentPatientId }/records/${ currentRecord }`} className="bg-primary flex gap-[0.5rem] items-center justify-center px-[0.75rem] py-[0.25rem] rounded-full text-white">
                                        بررسی
                                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.6665 8.66663L0.666504 4.66663L4.6665 0.666626" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </Link>
                                </div>

                        </Link>
                    </li>
                ))}
            </ul>
        </div>
     );
}
 
export default DoctorReviewRequests;