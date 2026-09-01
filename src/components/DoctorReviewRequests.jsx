import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DoctorHeader from "./DoctorHeader";
import { useAuth } from "../context/AuthContext";
import { getRiskColorClass, getRiskLabel } from "../utils/diagnosisHelpers";

const API_BASE_URL = 'http://localhost:8080/api';

const DoctorReviewRequests = () => {
    const { currentUser, recordsData } = useAuth();

    const [myPatients, setMyPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE_URL}/doctors/${currentUser.profile.id}/patients`)
            .then((res) => (res.ok ? res.json() : []))
            .then((data) => setMyPatients(data))
            .catch(() => setMyPatients([]))
            .finally(() => setLoading(false));
    }, [currentUser.profile.id]);

    const myPatientIds = myPatients.map((p) => p.id);

    const requests = recordsData.filter(
        (r) => r.status === 'pending' && myPatientIds.includes(r.patientId)
    );

    return ( 
        <div className="flex flex-col gap-[1.5rem] w-full">
            <DoctorHeader />
            <header className="">
                <div>
                    <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>درخواست‌های بررسی</h1>
                    <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>{ requests.length } درخواست در انتظار پاسخ شما</p>
                </div>
            </header>

            {loading && (
                <p className="text-text-muted-foreground">در حال دریافت اطلاعات...</p>
            )}

            {!loading && requests.length === 0 && (
                <p className="text-text-muted-foreground">در حال حاضر هیچ درخواست بررسی در انتظار ندارید.</p>
            )}

            <ul className="flex flex-col gap-[0.75rem]">
                {requests.map((request) =>{
                    const patient = myPatients.find((patient) => patient.id === request.patientId);
                    if (!patient) return null;

                    return(
                        <li key={ request.recId } className="bg-white border rounded-[1.4rem] border-text-muted-foreground/24 flex gap-[1rem] p-[1.2375rem] justify-around items-center shadow-sm w-full whitespace-nowrap">
                            <div className="flex flex-col gap-[0.275rem]">
                                <p className="font-bold leading-[1.5rem] text-[1rem]">{ patient.name }</p>
                                <p className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground"> { patient.patientCode } · { request.lastRecDate }</p>
                            </div>
                        
                            <div className="flex gap-[0.75rem] font-semibold items-center leading-[1rem] text-[0.75rem] whitespace-nowrap">
                                <span className={`${ getRiskColorClass(patient.riskLevel) } px-[0.625rem] py-[0.25rem] rounded-full`}>
                                    { getRiskLabel(patient.riskLevel) }
                                </span>
                                <Link to={`/doctor/dashboard/patients/${ patient.id }`} className="bg-primary flex gap-[0.5rem] items-center justify-center px-[0.75rem] py-[0.25rem] rounded-full text-white">
                                    بررسی
                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.6665 8.66663L0.666504 4.66663L4.6665 0.666626" stroke="#F9FCFF" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
     );
}
 
export default DoctorReviewRequests;