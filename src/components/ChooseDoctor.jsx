import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import PatientHeader from "./PatientHeader";


const ChooseDoctor = () => {
    const { currentUser, getApprovedDoctors, requestDoctorAssignment } = useAuth();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sendingId, setSendingId] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const list = await getApprovedDoctors();
            setDoctors(list);
            setLoading(false);
        })();
    }, []);


    if (currentUser?.profile?.assignedDoctorId) {
        return (
            <div className="flex flex-col gap-[1rem]">
                <PatientHeader />
                <div className="bg-white border border-text-muted-foreground/24 rounded-[1.4rem] p-[1.5rem]">
                    <p className="font-medium">شما در حال حاضر به یک پزشک متصل هستید.</p>
                </div>
            </div>
        );
    }

    const handleRequest = async (doctorId) => {
        setSendingId(doctorId);
        setMessage(null);

        const result = await requestDoctorAssignment(doctorId);

        setSendingId(null);
        setMessage({
            type: result.success ? 'success' : 'error',
            text: result.success ? 'درخواست شما ارسال شد. پس از قبول پزشک، مطلع خواهید شد.' : result.message,
        });
    };

    return (
        <div className="flex flex-col gap-[1rem]">
            <PatientHeader />

            <header>
                <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">انتخاب پزشک</h1>
                <p className="font-normal text-[0.875rem] text-text-muted-foreground">
                    برای اینکه نتایج آزمایش‌ها توسط یک پزشک واقعی بررسی بشه، اول باید به یک پزشک متصل بشید.
                </p>
            </header>

            {message && (
                <p className={message.type === 'success' ? 'text-success text-[0.875rem]' : 'text-red-500 text-[0.875rem]'}>
                    {message.text}
                </p>
            )}

            {loading && <p className="text-text-muted-foreground">در حال بارگذاری فهرست پزشکان...</p>}

            {!loading && doctors.length === 0 && (
                <p className="text-text-muted-foreground">در حال حاضر هیچ پزشک تاییدشده‌ای در سامانه ثبت نشده است.</p>
            )}

            <ul className="grid grid-cols-2 gap-[1rem] list-none p-0 m-0">
                {doctors.map((doctor) => (
                    <li
                        key={doctor.id}
                        className="bg-white border border-text-muted-foreground/24 rounded-[1.4rem] p-[1.25rem] flex items-center justify-between gap-[1rem]"
                    >
                        <div className="flex items-center gap-[0.75rem]">
                            <div className="bg-primary/20 flex justify-center items-center h-[2.75rem] w-[2.75rem] rounded-full">
                                <span className="text-[0.75rem]">{doctor.first2letters}</span>
                            </div>
                            <div>
                                <p className="font-bold text-[1rem]">{doctor.name}</p>
                                <p className="font-normal text-[0.75rem] text-text-muted-foreground">{doctor.specialty || 'پزشک عمومی'}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={sendingId === doctor.id}
                            onClick={() => handleRequest(doctor.id)}
                            className="bg-primary text-white rounded-full px-[1rem] py-[0.5rem] text-[0.875rem] disabled:opacity-60"
                        >
                            {sendingId === doctor.id ? 'در حال ارسال...' : 'درخواست اتصال'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChooseDoctor;
