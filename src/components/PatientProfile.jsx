import { useState, useEffect } from "react";
import PatientHeader from "./PatientHeader";
import { useAuth } from "../context/AuthContext";
import { validatePersianName, validateEmail, validateRequired } from "../utils/validation";

const API_BASE_URL = 'http://localhost:8080/api';

const PatientProfile = () => {
    const { currentUser, updateProfile } = useAuth();

    const patient = currentUser.profile;

    const [doctorName, setDoctorName] = useState('در حال دریافت...');

    useEffect(() => {
        if (!patient.assignedDoctorId) {
            setDoctorName('هنوز پزشکی تخصیص نیافته');
            return;
        }

        fetch(`${ API_BASE_URL }/doctors/${ patient.assignedDoctorId }`)
            .then((res) => {
                if (!res.ok) throw new Error('doctor not found');
                return res.json();
            })
            .then((doctor) => setDoctorName(doctor.name))
            .catch(() => setDoctorName('هنوز پزشکی تخصیص نیافته'));
    }, [patient.assignedDoctorId]);

    const [name, setName] = useState(patient.name || "");
    const [age, setAge] = useState(patient.age || "");
    const [gender, setGender] = useState(patient.gender || "زن");
    const [bloodType, setBloodType] = useState(patient.bloodType || "O+");
    const [phone, setPhone] = useState(currentUser.phone || "");
    const [email, setEmail] = useState(patient.email || "");
    const [city, setCity] = useState(patient.city || "");

    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);

    const validate = () => {
        const newErrors = {};

        const nameError = validatePersianName(name);
        if (nameError) newErrors.name = nameError;

        const emailError = validateEmail(email, false);
        if (emailError) newErrors.email = emailError;

        const ageError = validateRequired(age, "سن");
        if (ageError) newErrors.age = ageError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaved(false);

        if (!validate()) return;

        updateProfile({
            name,
            age: Number(age),
            gender,
            bloodType,
            email,
            city,
            phone,
        });

        setSaved(true);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        setName(patient.name || "");
        setAge(patient.age || "");
        setGender(patient.gender || "زن");
        setBloodType(patient.bloodType || "O+");
        setEmail(patient.email || "");
        setCity(patient.city || "");
        setPhone(currentUser.phone || "");
        setErrors({});
        setSaved(false);
    };

    const inputClass = (fieldName) =>
        `bg-primary/5 border font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm ${
            errors[fieldName] ? "border-red-400" : "border-text-muted-foreground/24"
        }`;

    return (
        <div className="flex flex-col gap-[1.5rem] w-full">
            <PatientHeader />

            <header>
                <div>
                    <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>پروفایل</h1>
                    <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>اطلاعات هویتی و پزشکی شما</p>
                </div>
            </header>

            <section className="bg-white border border-text-muted-foreground/24 flex flex-col gap-[1.5rem] p-[1.4875rem] rounded-[1.4rem] whitespace-nowrap">
                <div className="border-b border-text-muted-foreground/24 flex gap-[1rem] pb-[1.5rem]">
                    <div className="bg-primary/20 flex justify-center h-[4rem] items-center rounded-full w-[4rem]">
                        <span className="font-normal leading-[1.75rem] text-[1.125rem]">{ patient.first2letters }</span>
                    </div>
                    <div className="">
                        <p className="font-bold leading-[1.75rem] text-[1.125rem]">{ patient.name }</p>
                        <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">شناسه بیمار: { patient.patientCode }</p>
                    </div>
                </div>

                <form onSubmit={ handleSubmit } className="grid grid-cols-2 gap-[1rem]">
                    <div className="flex flex-col ">
                        <label htmlFor="fullName" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">
                            نام و نام خانوادگی <span className="text-red-500">*</span>
                        </label>
                        <input
                            id='fullName'
                            type="text"
                            value={ name }
                            onChange={(e) => setName(e.target.value)}
                            className={ inputClass('name') }
                        />
                        {errors.name && <p className="text-red-500 text-[0.75rem] pt-[0.25rem]">{errors.name}</p>}
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="nationalId" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">کد ملی</label>
                        <input id='nationalId' type="text" defaultValue={ currentUser.id } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="age" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">
                            سن <span className="text-red-500">*</span>
                        </label>
                        <input
                            id='age'
                            type="number"
                            value={ age }
                            onChange={(e) => setAge(e.target.value)}
                            className={ inputClass('age') }
                        />
                        {errors.age && <p className="text-red-500 text-[0.75rem] pt-[0.25rem]">{errors.age}</p>}
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="gender" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">جنسیت</label>
                        <select
                            id="gender"
                            value={ gender }
                            onChange={(e) => setGender(e.target.value)}
                            className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm"
                        >
                            <option value="زن">زن</option>
                            <option value="مرد">مرد</option>
                        </select>
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="bloodType" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">گروه خونی</label>
                        <select
                            id="bloodType"
                            value={ bloodType }
                            onChange={(e) => setBloodType(e.target.value)}
                            className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm"
                        >
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="phone" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">شماره تلفن</label>
                        <input
                            id='phone'
                            type="tel"
                            inputMode='numeric'
                            dir="ltr"
                            value={ phone }
                            readOnly
                            className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm opacity-70 cursor-not-allowed"
                        />
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="email" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">ایمیل</label>
                        <input
                            id='email'
                            type="email"
                            dir="ltr"
                            placeholder="example@email.com"
                            value={ email }
                            onChange={(e) => setEmail(e.target.value)}
                            className={ inputClass('email') }
                        />
                        {errors.email && <p className="text-red-500 text-[0.75rem] pt-[0.25rem]">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="city" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">شهر</label>
                        <input
                            id='city'
                            type="text"
                            value={ city }
                            onChange={(e) => setCity(e.target.value)}
                            className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm"
                        />
                    </div>

                    <div className="flex flex-col ">
                        <label htmlFor="doctor" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">پزشک معالج</label>
                        <input
                            id='doctor'
                            type="text"
                            value={ doctorName }
                            readOnly
                            className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm opacity-70 cursor-not-allowed"
                        />
                    </div>

                    {saved && (
                        <p className="col-span-2 text-success text-[0.875rem]">تغییرات با موفقیت ذخیره شد.</p>
                    )}

                    <div className="col-span-2 font-medium leading-[1.25rem] flex justify-end gap-[0.5rem] text-[0.875rem] whitespace-nowrap">
                        <button type='button' onClick={ handleCancel } className="px-[1rem] py-[0.5rem]  rounded-[1.15rem] shadow-sm">
                            انصراف
                        </button>
                        <button type='submit' className="bg-primary px-[1rem] py-[0.5rem] rounded-[1.15rem] text-white">
                            ذخیره تغییرات
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default PatientProfile;