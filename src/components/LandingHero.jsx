import { Link } from "react-router-dom";

import ecgSample from '../assets/images/ecg-sample.png'

const LandingHero = () => {
    return ( 
        <div className="flex gap-[2.5rem] h-fit px-[2rem] py-[4rem] w-[72rem]">
            <div className="h-fit w-[32.75rem]">
                <div className="flex flex-col gap-[1.25rem]">
                    <h1 className="font-vazir font-extrabold text-[3rem]">
                        نوار قلب را آپلود کنید،
                        <br />
                        <span className="text-primary">تشخیص هوشمند</span> را ببینید.
                    </h1>
                    <p className="font-vazir font-regular text-[1rem] text-text-muted-foreground w-[32rem]">گِش سیگنال‌های الکتریکی قلب را با مدل یادگیری عمیق تحلیل می‌کند تا در مناطقی
                    که دسترسی به پزشک متخصص دشوار است، غربالگری سریع و قابل اتکا ممکن
                    شود.</p>

                    <div className="flex gap-[0.75rem] pr-[0.5rem]">
                        <Link to='' className="bg-primary flex gap-[0.5rem] font-vazir font-medium justify-center items-center py-[0.625rem] rounded-full text-[0.875rem] text-background w-[11.75rem]">
                            شروع به عنوان بیمار
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99998 12.6666L3.33331 7.99998L7.99998 3.33331" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.6666 8H3.33331" stroke="#F9FCFF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </Link>
                        <Link t0='' className="bg-white flex font-vazir font-medium h-[2.5rem] items-center px-[1.7375rem] rounded-full text-[0.875rem] w-fit">
                            ورود پزشکان
                        </Link>
                    </div>
                    <ul className="flex font-vazir font-extrabold gap-[1rem] h-fit items-start pt-[1.25rem] text-[1.5rem] w-[28rem]">
                        <li className="flex flex-col leading-none gap-0 w-full">
                            <span>94%</span>
                            <span className="font-vazir font-normal text-[0.75rem] text-text-muted-foreground">دقت مدل</span>
                        </li>
                        <li className="flex flex-col leading-none gap-0 w-full">
                            <span>1.3s</span>
                            <span className="font-vazir font-normal text-[0.75rem] text-text-muted-foreground">زمان تحلیل</span>
                        </li>
                        <li className="flex flex-col leading-none gap-0 w-full">
                            <span>12</span>
                            <span className="font-vazir font-normal text-[0.75rem] text-text-muted-foreground">لید ورودی</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="bg-white h-fit overflow-hidden rounded-[1.65rem] w-[32.75rem]">
                <div className="flex gap-[15.25rem] h-fit px-[1.25rem] py-[0.75rem]  w-full">
                    <span className="font-vazir font-semibold text-[0.875rem]">نمونه سیگنال - || lead </span>
                    <span className="flex gap-[0.4rem] font-normal items-center text-[0.75rem] text-text-muted-foreground">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.25 6.41668H10.8033C10.5484 6.41613 10.3003 6.4991 10.097 6.65291C9.89367 6.80671 9.74633 7.02288 9.6775 7.26834L8.30667 12.145C8.29783 12.1753 8.27941 12.2019 8.25417 12.2208C8.22893 12.2398 8.19822 12.25 8.16667 12.25C8.13511 12.25 8.10441 12.2398 8.07917 12.2208C8.05393 12.2019 8.0355 12.1753 8.02667 12.145L4.80667 0.688344C4.79783 0.658052 4.77941 0.631443 4.75417 0.61251C4.72893 0.593578 4.69822 0.583344 4.66667 0.583344C4.63512 0.583344 4.60441 0.593578 4.57917 0.61251C4.55393 0.631443 4.5355 0.658052 4.52667 0.688344L3.15584 5.56501C3.08727 5.80952 2.94081 6.02498 2.73867 6.17868C2.53654 6.33239 2.28977 6.41595 2.03584 6.41668H0.583336" stroke="#E33C48" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                         78 ضربه در دقیقه
                    </span>
                </div>
                <div className="relative h-auto overflow-hidden w-fit">
                    <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>
                    <div>
                        <img src={ ecgSample } alt="ecg-sample" />
                    </div>
                </div>
                {/* TODO: shadow */}
                <dl className="flex flex-1 h-auto p-[1rem]">
                    <div className="border-l-[0.05rem] border-text-muted-foreground flex flex-1 flex-col justify-center gap-[0.25rem] items-center">
                        <dd className="font-vazir font-bold text-[1.125rem]">94%</dd>
                        <dt className="font-vazir font-normal text-[0.6875rem] text-text-muted-foreground">ریتم سینوسی طبیعی</dt>
                    </div>
                    <div className="border-l-[0.05rem] border-text-muted-foreground flex flex-1 flex-col justify-center gap-[0.25rem] items-center">
                        <dd className="font-vazir font-bold text-[1.125rem]">4%</dd>
                        <dt className="font-vazir font-normal text-[0.6875rem] text-text-muted-foreground">برادی‌کاری</dt>
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-[0.25rem] items-center">
                        <dd className="font-vazir font-bold text-[1.125rem]">2%</dd>
                        <dt className="font-vazir font-normal text-[0.6875rem] text-text-muted-foreground">فیبریلاسیون</dt>
                    </div>
                </dl>
            </div>
        </div>
     );
}
  
export default LandingHero;