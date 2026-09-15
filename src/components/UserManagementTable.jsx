import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getUserStatusLabel, getUserStatusColorClass } from "../utils/UserStatusHelpers";

const roleLabel = (role) => (role === 'patient' ? 'بیمار' : 'پزشک');

const effectiveStatus = (user) =>
    user.role === 'doctor' && user.doctorApprovalStatus ? user.doctorApprovalStatus : user.status;

const resolveAction = (user) => {
    const status = (effectiveStatus(user) || '').toString().toUpperCase();

    if (user.role === 'doctor' && status === 'PENDING') {
        return { type: 'approve', label: 'تایید', className: 'bg-primary text-white' };
    }
    if (status === 'ACTIVE' || status === 'APPROVED') {
        return { type: 'deactivate', label: 'غیرفعال‌سازی', className: 'bg-white border border-text-muted-foreground/24 text-text-muted-foreground' };
    }
    if (status === 'INACTIVE' || status === 'REJECTED') {
        return { type: 'activate', label: 'فعال‌سازی', className: 'bg-white border border-text-muted-foreground/24 text-text-muted-foreground' };
    }
    return null;
};

const UserManagementTable = ({ users, onUserChanged }) => {
    const { setUserActive, approveDoctorFromAdmin } = useAuth();
    const [pendingId, setPendingId] = useState(null);
    const [errorFor, setErrorFor] = useState({ id: null, message: '' });

    const handleAction = async (user, actionType) => {
        setPendingId(user.id);
        setErrorFor({ id: null, message: '' });
        try {
            const result = actionType === 'approve'
                ? await approveDoctorFromAdmin(user.profileId)
                : await setUserActive(user.id, actionType === 'activate');

            if (!result?.success) {
                setErrorFor({ id: user.id, message: result?.message || 'عملیات ناموفق بود' });
                return;
            }
            await onUserChanged?.();
        } finally {
            setPendingId(null);
        }
    };

    return (
        <table dir="rtl" className="bg-white font-medium leading-[1.25rem] rounded-[1rem] text-[0.875rem] text-text-muted-foreground shadow-sm w-full h-fit">
            <thead>
                <tr className="text-right">
                    <th className="px-[0.75rem] py-[0.75rem]">کاربر</th>
                    <th className="px-[0.75rem] py-[0.75rem]">نقش</th>
                    <th className="px-[0.75rem] py-[0.75rem]">نظام پزشکی</th>
                    <th className="px-[0.75rem] py-[0.75rem]">تاریخ عضویت</th>
                    <th className="px-[0.75rem] py-[0.75rem]">وضعیت</th>
                    <th className="px-[0.75rem] py-[0.75rem]">عملیات</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    const status = effectiveStatus(user);
                    const action = resolveAction(user);
                    const isBusy = pendingId === user.id;
                    const rowError = errorFor.id === user.id ? errorFor.message : null;
                    return (
                        <tr key={user.id} className="border-t border-text-muted-foreground/10">
                            <td className="px-[0.75rem] py-[0.75rem] text-black">{user.name || '—'}</td>
                            <td className="px-[0.75rem] py-[0.75rem]">{roleLabel(user.role)}</td>
                            <td className="px-[0.75rem] py-[0.75rem]">{user.medicalCode || '—'}</td>
                            <td className="px-[0.75rem] py-[0.75rem]">{user.createdAt || '—'}</td>
                            <td className="px-[0.75rem] py-[0.75rem]">
                                <span className={`font-semibold px-[0.625rem] py-[0.25rem] rounded-full text-[0.75rem] w-fit ${getUserStatusColorClass(status)}`}>
                                    {getUserStatusLabel(status)}
                                </span>
                            </td>
                            <td className="px-[0.75rem] py-[0.75rem]">
                                <div className="flex flex-col items-center gap-[0.25rem]">
                                    {action ? (
                                        <button
                                            type="button"
                                            disabled={isBusy}
                                            onClick={() => handleAction(user, action.type)}
                                            className={`px-[0.875rem] py-[0.375rem] rounded-full text-[0.8rem] font-medium disabled:opacity-50 ${action.className}`}
                                        >
                                            {isBusy ? '...' : action.label}
                                        </button>
                                    ) : (
                                        <span className="text-[0.7rem]">—</span>
                                    )}
                                    {rowError && (
                                        <span className="text-[0.65rem] text-red-500">{rowError}</span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default UserManagementTable;