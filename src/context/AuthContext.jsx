import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const API_BASE_URL = 'http://localhost:8080/api';

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [recordsData, setRecordsData] = useState([]);

    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const savedSession = localStorage.getItem('authSession');
        if (savedSession) {
            try {
                const parsed = JSON.parse(savedSession);
                setCurrentUser(parsed);
                fetchRecordsForCurrentUser(parsed).finally(() => setIsAuthLoading(false));
            } catch (err) {
                console.error('خطا در خواندن سشن ذخیره‌شده:', err);
                localStorage.removeItem('authSession');
                setIsAuthLoading(false);
            }
        } else {
            setIsAuthLoading(false);
        }
    }, []);

    const fetchRecordsForCurrentUser = async (user) => {
        try {
            if (user.role === 'admin')
            {
                setRecordsData([]);
                return;
            }
            if (user.role === 'patient') {
                // why there is records in the url?
                const res = await fetch(`${API_BASE_URL}/records/patient/${user.profile.id}`);
                if (!res.ok) return;
                setRecordsData(await res.json());
            } else {
                // getting the records of each patient
                const patientsRes = await fetch(`${API_BASE_URL}/doctors/${user.profile.id}/patients`);
                if (!patientsRes.ok) return;
                const myPatients = await patientsRes.json();

                const allRecordsNested = await Promise.all(
                    myPatients.map((p) =>
                        fetch(`${API_BASE_URL}/records/patient/${p.id}`).then((r) => r.json())
                    )
                );
                setRecordsData(allRecordsNested.flat());
            }
        } catch (err) {
            console.error('خطا در دریافت رکوردها از سرور:', err);
        }
    };

    const login = async (phone, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: phone, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            const user = { role: data.role, profile: data.profile, token: data.token, userId: data.userId };
            setCurrentUser(user);
            localStorage.setItem('authSession', JSON.stringify(user));

            await fetchRecordsForCurrentUser(user);

            return { success: true, role: data.role };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const loginWithEmailPassword = async (email, password) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/login/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            const user = { role: data.role, profile: data.profile, token: data.token, userId: data.userId };
            setCurrentUser(user);
            localStorage.setItem('authSession', JSON.stringify(user));

            await fetchRecordsForCurrentUser(user);

            return { success: true, role: data.role };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    
    const signup = async ({ role, name, phone, email, password, medicalCode }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, name, phone, email, password, medicalCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            const user = { role: data.role, profile: data.profile, token: data.token, userId: data.userId };
            setCurrentUser(user);
            localStorage.setItem('authSession', JSON.stringify(user));

            return { success: true, role: data.role };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const signupWithEmail = async ({ role, name, phone, email, code, password, medicalCode }) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/signup/email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role, name, phone, email, code, password, medicalCode }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            const user = { role: data.role, profile: data.profile, token: data.token, userId: data.userId };
            setCurrentUser(user);
            localStorage.setItem('authSession', JSON.stringify(user));

            return { success: true, role: data.role };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setRecordsData([]);
        localStorage.removeItem('authSession');
    };


    const updateProfile = async (updates) => {
        if (!currentUser) return;

        try {
            const res = await fetch(`${API_BASE_URL}/patients/${currentUser.profile.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...currentUser.profile, ...updates }),
            });

            if (!res.ok) return;

            const updatedProfile = await res.json();
            const updatedUser = { ...currentUser, profile: updatedProfile };
            setCurrentUser(updatedUser);
            localStorage.setItem('authSession', JSON.stringify(updatedUser));
        } catch (err) {
            console.error('خطا در ذخیره‌ی پروفایل:', err);
        }
    };

    const addRecord = async ({ file, duration, source, symptoms, needsDoctorReview, nationalCode }) => {
        if (!currentUser) return { success: false, message: 'ابتدا وارد شوید' };

        try {
            const formData = new FormData();
            formData.append('patientId', currentUser.profile.id);
            formData.append('duration', duration);
            formData.append('source', source);
            if (symptoms) formData.append('symptoms', symptoms);
            formData.append('needsDoctorReview', needsDoctorReview);
            if (nationalCode) formData.append('nationalCode', nationalCode);
            formData.append('file', file);

            const res = await fetch(`${API_BASE_URL}/records/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            setRecordsData((prev) => [data, ...prev]);
            return { success: true, record: data };
        } catch (err) {
            console.error('خطا در ثبت رکورد:', err);
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const getNationalCode = async (profileId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/by-profile/${profileId}`);
            if (!res.ok) return '';
            const data = await res.json();
            return data.nationalCode || '';
        } catch (err) {
            console.error('خطا در دریافت کد ملی:', err);
            return '';
        }
    };

    const requestDoctorReview = async (recId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/records/${recId}/request-review`, {
                method: 'PATCH',
            });

            if (!res.ok) return null;

            const updatedRecord = await res.json();
            setRecordsData((prev) => prev.map((r) => (r.recId === recId ? updatedRecord : r)));
            return updatedRecord;
        } catch (err) {
            console.error('خطا در ثبت درخواست بررسی پزشک:', err);
            return null;
        }
    };

    const submitDoctorReview = async (recId, doctorId, note, approved = true) => {
        try {
            const res = await fetch(`${API_BASE_URL}/records/${recId}/review`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ doctorId, note, approved }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                return { success: false, message: data.message || 'ثبت نظر پزشک ناموفق بود' };
            }

            const updatedRecord = await res.json();
            setRecordsData((prev) => prev.map((r) => (r.recId === recId ? updatedRecord : r)));
            return { success: true, record: updatedRecord };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const sendOtp = async (email) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                return { success: false, message: data.message };
            }

            return { success: true };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };


    const verifyOtp = async (email, code) => {
        try {
            const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            const user = { role: data.role, profile: data.profile, token: data.token, userId: data.userId };
            setCurrentUser(user);
            localStorage.setItem('authSession', JSON.stringify(user));

            await fetchRecordsForCurrentUser(user);

            return { success: true, role: data.role };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const getApprovedDoctors = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/doctors/approved`);
            if (!res.ok) return [];
            return await res.json();
        } catch (err) {
            console.error('خطا در دریافت لیست پزشکان:', err);
            return [];
        }
    };

    const requestDoctorAssignment = async (doctorId) => {
        if (!currentUser) return { success: false, message: 'ابتدا وارد شوید' };

        try {
            const res = await fetch(
                `${API_BASE_URL}/patients/${currentUser.profile.id}/request-doctor/${doctorId}`,
                { method: 'POST' }
            );
            const data = await res.json();

            if (!res.ok) return { success: false, message: data.message };
            return { success: true, request: data };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const getPendingAssignmentRequests = async () => {
        if (!currentUser || currentUser.role !== 'doctor') return [];

        try {
            const res = await fetch(`${API_BASE_URL}/doctors/${currentUser.profile.id}/assignment-requests`);
            if (!res.ok) return [];
            return await res.json();
        } catch (err) {
            console.error('خطا در دریافت درخواست‌های اتصال:', err);
            return [];
        }
    };

    const acceptAssignmentRequest = async (requestId) => {
        if (!currentUser) return { success: false, message: 'ابتدا وارد شوید' };

        try {
            const res = await fetch(
                `${API_BASE_URL}/doctors/${currentUser.profile.id}/assignment-requests/${requestId}/accept`,
                { method: 'POST' }
            );
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };
            await fetchRecordsForCurrentUser(currentUser);
            return { success: true, request: data };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const rejectAssignmentRequest = async (requestId) => {
        if (!currentUser) return { success: false, message: 'ابتدا وارد شوید' };

        try {
            const res = await fetch(
                `${API_BASE_URL}/doctors/${currentUser.profile.id}/assignment-requests/${requestId}/reject`,
                { method: 'POST' }
            );
            const data = await res.json();
            if (!res.ok) return { success: false, message: data.message };
            return { success: true, request: data };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };


    const getAllUsers = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/admin/users`)
            if (!res.ok)
                throw new Error(`HTTP Error: ${res.status}` );
            const data = await res.json();
            console.log("d: ", data);
            return data;
        } catch (err) {
            console.log('خطا در دریافت لیست کاربران', err);
            return [];
        }
    }

    const setUserActive = async (userId, active) => {
        try {
            const res = await fetch(`${API_BASE_URL}/admin/users/${userId}/active?active=${active}`, {
                method: 'PATCH',
            });
            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            return { success: true, user: data };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };

    const approveDoctorFromAdmin = async (doctorProfileId) => {
        try {
            const res = await fetch(`${API_BASE_URL}/admin/doctors/${doctorProfileId}/approve`, {
                method: 'POST',
            });
            const data = await res.json();

            if (!res.ok) {
                return { success: false, message: data.message };
            }

            return { success: true, doctor: data };
        } catch (err) {
            return { success: false, message: 'ارتباط با سرور برقرار نشد.' };
        }
    };


    return (
        <AuthContext.Provider value={{ 
            currentUser, login, loginWithEmailPassword, signup, signupWithEmail, logout, recordsData, addRecord, updateProfile, requestDoctorReview, submitDoctorReview, sendOtp, verifyOtp,
            getAllUsers, getApprovedDoctors, requestDoctorAssignment, getPendingAssignmentRequests, acceptAssignmentRequest,
            getNationalCode, setUserActive, approveDoctorFromAdmin
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);