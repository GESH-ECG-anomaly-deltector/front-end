import { Link } from "react-router-dom";

const FinalCTA = () => {
    return ( 
        <section id="start" aria-labelledby="final-cta" className="flex gap-[2.5rem] items-center py-[4rem]">
            <div className="flex flex-1 flex-col gap-[0.75rem] h-auto">
                <h2 className="font-extrabold text-[1.5rem] leading-[2rem]">آماده‌اید نوار قلب خود را تحلیل کنید؟</h2>
                <p className="font-normal leading-[1.75rem] text-[0.875rem] text-text-muted-foreground">
                    با چند کلیک فایل ۱۲ لیدی را بارگذاری کنید، مدل هوش مصنوعی آن را پیش‌پردازش و طبقه‌بندی
                    می‌کند، و در صورت نیاز می‌توانید نظر یک پزشک متخصص را نیز درخواست دهید.
                </p>
                <div className="flex gap-[0.75rem] pr-[0.5rem]">
                    <Link to='/login-signup?role=patient&mode=signup' className="bg-primary flex gap-[0.5rem] font-vazir font-medium justify-center items-center py-[0.625rem] rounded-full text-[0.875rem] text-background w-[11.75rem]">
                        شروع به عنوان بیمار
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99998 12.6666L3.33331 7.99998L7.99998 3.33331" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.6666 8H3.33331" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                    <Link to='/login-signup?mode=login' className="bg-white border border-text-muted-foreground/25 flex font-vazir font-medium h-[2.5rem] items-center px-[1.7375rem] rounded-full text-[0.875rem] w-fit">
                        ورود / ثبت‌نام
                    </Link>
                </div>
            </div>
            <div className="border border-text-muted-foreground/25 flex flex-1 flex-col justify-center gap-[1.25rem] p-[1.5rem] rounded-[1.4rem] shadow-sm">
                <div className="flex flex-1 justify-center items-center gap-[0.75rem]">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 18.4C0 8.23796 8.23796 0 18.4 0H25.6C35.762 0 44 8.23796 44 18.4V25.6C44 35.762 35.762 44 25.6 44H18.4C8.23796 44 0 35.762 0 25.6V18.4Z" fill="#E2F0FF"/>
                        <g clip-path="url(#clip0_39_837)">
                        <path d="M21.1667 13.6666V15.3333" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.1667 13.6666V15.3333" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M16.1667 14.5H15.3333C14.8913 14.5 14.4674 14.6756 14.1548 14.9882C13.8423 15.3007 13.6667 15.7246 13.6667 16.1667V19.5C13.6667 20.8261 14.1934 22.0979 15.1311 23.0355C16.0688 23.9732 17.3406 24.5 18.6667 24.5C19.9927 24.5 21.2645 23.9732 22.2022 23.0355C23.1399 22.0979 23.6667 20.8261 23.6667 19.5V16.1667C23.6667 15.7246 23.4911 15.3007 23.1785 14.9882C22.8659 14.6756 22.442 14.5 22 14.5H21.1667" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.6667 24.5C18.6667 25.8261 19.1934 27.0979 20.1311 28.0355C21.0688 28.9732 22.3406 29.5 23.6667 29.5C24.9927 29.5 26.2645 28.9732 27.2022 28.0355C28.1399 27.0979 28.6667 25.8261 28.6667 24.5V22" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M28.6667 22C29.5871 22 30.3333 21.2538 30.3333 20.3333C30.3333 19.4128 29.5871 18.6666 28.6667 18.6666C27.7462 18.6666 27 19.4128 27 20.3333C27 21.2538 27.7462 22 28.6667 22Z" stroke="#1E4B8D" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_39_837">
                        <rect width="20" height="20" fill="white" transform="translate(12 12)"/>
                        </clipPath>
                        </defs>
                    </svg>
                    <div className="flex flex-col w-fit">
                        <h3 className="font-bold leading-[1.5rem] text-[1rem]">پزشک هستید؟</h3>
                        <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">به شبکه متخصصین گِش بپیوندید و پرونده‌های بیماران را بررسی کنید.</p>
                    </div>
                </div>
                <Link to="/login-signup?mode=signup&role=doctor" className="border border-text-muted-foreground/25 font-normal text-[0.875rem] rounded-[1.15rem] text-center py-[0.5rem]">ثبت‌نام پزشک</Link>
            </div>
        </section>
     );
}
 
export default FinalCTA;