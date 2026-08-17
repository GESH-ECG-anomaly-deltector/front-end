import PatientHeader from "./PatientHeader";
import { usePatient } from "../context/PatientContext";

const PatientProfile = () => {
    const { patientName, first2letters, patientCode, patientNationalId, patientAge, patientGender, patientBloodType, patientPhone, patientCity, patientDoctor } = usePatient();

    const handleSubmit = () => {

    };

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
                        <span className="font-normal leading-[1.75rem] text-[1.125rem]">{ first2letters }</span>
                    </div>
                    <div className="">
                        <p className="font-bold leading-[1.75rem] text-[1.125rem]">{ patientName }</p>
                        <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">شناسه بیمار: { patientCode }</p>
                    </div>
                </div>

                <form onSubmit={ handleSubmit } className="grid grid-cols-2 gap-[1rem]">
                    <div className="flex flex-col ">
                        <label htmlFor="fullNAme" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">نام و نام خانوادگی</label>
                        <input id='fullName' type="text" defaultValue={ patientName } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="nationalId" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">کد ملی</label>
                        <input id='nationalId' type="text" defaultValue={ patientNationalId } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="age" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">کد ملی</label>
                        <input id='age' type="number" defaultValue={ patientAge } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="gender" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">جنسیت</label>
                        {/* جنسیت رو باید از کاتکست بگیره ولی الان در حال حاضر استاتیک داره میگیره */}
                        <select id="gender" defaultValue={ patientGender } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm">
                            <option value="femail">زن</option>
                            <option value="male">مرد</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="gender" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">جنسیت</label>
                        {/* این هم استاتیک هست ولی نباید باشه */}
                        <select id="bloodType" defaultValue={ patientBloodType } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm">
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="phone" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">شماره تلفن</label>
                        <input id='phone' type="tel" inputMode='numeric' defaultValue={ patientPhone } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="city" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">شهر</label>
                        <input id='city' type="text" defaultValue={ patientCity } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>
                    <div className="flex flex-col ">
                        <label htmlFor="doctor" className="flex-1 font-medium leading-[1.25rem] text-[0.875rem]">پزشک معالج</label>
                        <input id='doctor' type="text" defaultValue={ patientDoctor } className="bg-primary/5 border border-text-muted-foreground/24 font-normal text-[0.875rem] text-text-muted-foreground px-[0.75rem] py-[0.625rem] rounded-[1.15rem] shadow-sm" />
                    </div>
                    <div className="col-span-2 font-medium leading-[1.25rem] flex justify-end gap-[0.5rem] text-[0.875rem] whitespace-nowrap">
                        <button type='submit' className="px-[1rem] py-[0.5rem]  rounded-[1.15rem] shadow-sm">
                            انصراف
                        </button>
                        <button className="bg-primary px-[1rem] py-[0.5rem] rounded-[1.15rem] text-white">
                            ذخیره تغییرات
                        </button>
                    </div>
                </form>
            </section>
        </div>
     );
}
 
export default PatientProfile;