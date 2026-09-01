import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import DoctorHeader from "./DoctorHeader";

const DoctorAssignmentRequests = () => {
    const { getPendingAssignmentRequests, acceptAssignmentRequest, rejectAssignmentRequest } = useAuth();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [respondingId, setRespondingId] = useState(null);

    const loadRequests = async () => {
        setLoading(true);
        const list = await getPendingAssignmentRequests();
        setRequests(list);
        setLoading(false);
    };

    useEffect(() => {
        loadRequests();
    }, []);

    const handleAccept = async (requestId) => {
        setRespondingId(requestId);
        await acceptAssignmentRequest(requestId);
        setRespondingId(null);
        loadRequests();
    };

    const handleReject = async (requestId) => {
        setRespondingId(requestId);
        await rejectAssignmentRequest(requestId);
        setRespondingId(null);
        loadRequests();
    };

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <DoctorHeader />

            <header>
                <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">درخواست‌های اتصال بیمار</h1>
                <p className="font-normal text-[0.875rem] text-text-muted-foreground">
                    {requests.length} بیمار منتظر پاسخ شما برای اتصال هستند
                </p>
            </header>

            {loading && <p className="text-text-muted-foreground">در حال بارگذاری...</p>}

            {!loading && requests.length === 0 && (
                <p className="text-text-muted-foreground">در حال حاضر درخواست اتصال جدیدی ندارید.</p>
            )}

            <ul className="flex flex-col gap-[0.75rem] list-none p-0 m-0">
                {requests.map((req) => {
                    return (
                        <li
                            key={ req.id }
                            className="bg-white border border-text-muted-foreground/24 rounded-[1.4rem] p-[1.25rem] flex items-center justify-between"
                        >
                            <div>
                                <p className="font-bold text-[1rem]">{ req.patientName || req.patientId}</p>
                                <p className="font-normal text-[0.75rem] text-text-muted-foreground">
                                    درخواست ثبت‌شده در {req.createdAt}
                                </p>
                            </div>

                            <div className="flex gap-[0.5rem]">
                                <button
                                    type="button"
                                    disabled={respondingId === req.id}
                                    onClick={() => handleReject(req.id)}
                                    className="border border-text-muted-foreground/24 rounded-full px-[1rem] py-[0.5rem] text-[0.875rem] disabled:opacity-60"
                                >
                                    رد کردن
                                </button>
                                <button
                                    type="button"
                                    disabled={respondingId === req.id}
                                    onClick={() => handleAccept(req.id)}
                                    className="bg-primary text-white rounded-full px-[1rem] py-[0.5rem] text-[0.875rem] disabled:opacity-60"
                                >
                                    قبول کردن
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DoctorAssignmentRequests;
