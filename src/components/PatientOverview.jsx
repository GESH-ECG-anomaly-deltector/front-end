import { Link } from "react-router-dom";

import PatientHeader from "./PatientHeader";
import { useAuth } from "../context/AuthContext";
import ecgSample from '../assets/images/ecg-sample2.png'

const Overview = () => {
    const { currentUser, recordsData } = useAuth();

    const myRecords = recordsData.filter (
        (r) => r.patientId === currentUser.profile.id
    );

    let latestResult = myRecords[0];
    if (!latestResult) {
        return (
            <div className="flex flex-col gap-[1rem]">
                <PatientHeader />
                <header>
                    <h1 className="font-extrabold text-[1.5rem]">سلام، {currentUser.profile.name}</h1>
                    <p className="text-text-muted-foreground">هنوز هیچ آزمایشی ثبت نکرده‌اید</p>
                </header>

                <div className="bg-white rounded-[1.4rem] shadow-sm p-8 flex flex-col items-center gap-4">
                    <p className="text-text-muted-foreground text-center">
                        برای دیدن تحلیل نوار قلب، اولین آزمایش خود را آپلود کنید.
                    </p>
                    <Link 
                        to="/patient/dashboard/ecg-upload" 
                        className="bg-primary text-white rounded-full px-6 py-2"
                    >
                        آپلود نوار قلب
                    </Link>
                </div>
            </div>
        )
    }

    const primaryDiagnosis = latestResult.diagnoses.find(
        (d) => d.code === latestResult.primaryDiagnosisCode
    ) || latestResult.diagnoses[0];
    
    const pendingCount = myRecords.filter((r) => r.status === 'pending').length;
    const testsCount = myRecords.length;


    const latestBpm = latestResult.bpm;
    

    const statCards = [
        { id: 'pending',
          label: 'در انتظار نظر پزشک',
          value: pendingCount,
          unit: 'مورد',
          icon: <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13.8C3 7.28304 8.28304 2 14.8 2H26.8C33.317 2 38.6 7.28304 38.6 13.8C38.6 20.317 33.317 25.6 26.8 25.6H14.8C8.28304 25.6 3 20.317 3 13.8Z" fill="#FEF0D4"/>
                    <g filter="url(#filter0_dd_10_450)">
                    <path d="M3 13.8C3 7.28304 8.28304 2 14.8 2H26.8C33.317 2 38.6 7.28304 38.6 13.8C38.6 20.317 33.317 25.6 26.8 25.6H14.8C8.28304 25.6 3 20.317 3 13.8Z" fill="white" fill-opacity="0.01" shape-rendering="crispEdges"/>
                    </g>
                    <g clip-path="url(#clip0_10_450)">
                    <path d="M25.4666 14.3833C25.4666 17.3 23.425 18.7583 20.9983 19.6042C20.8712 19.6472 20.7332 19.6452 20.6075 19.5983C18.175 18.7583 16.1333 17.3 16.1333 14.3833V10.3C16.1333 10.1453 16.1948 9.99691 16.3042 9.88752C16.4136 9.77812 16.5619 9.71666 16.7166 9.71666C17.8833 9.71666 19.3416 9.01666 20.3566 8.13C20.4802 8.02441 20.6374 7.9664 20.8 7.9664C20.9625 7.9664 21.1197 8.02441 21.2433 8.13C22.2641 9.0225 23.7166 9.71666 24.8833 9.71666C25.038 9.71666 25.1864 9.77812 25.2958 9.88752C25.4052 9.99691 25.4666 10.1453 25.4666 10.3V14.3833Z" stroke="#D79628" strokeWidth="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.8 11.4666V13.8" stroke="#D79628" strokeWidth="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.8 16.1333H20.8059" stroke="#D79628" strokeWidth="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <filter id="filter0_dd_10_450" x="0" y="0" width="41.6001" height="29.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_10_450"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_450"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_10_450" result="effect2_dropShadow_10_450"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_10_450" result="shape"/>
                    </filter>
                    <clipPath id="clip0_10_450">
                    <rect width="14" height="14" fill="white" transform="translate(13.8 6.79999)"/>
                    </clipPath>
                    </defs>
                </svg>,
        },
        {
            id: 'tests',
            label: 'تعداد آزمایش‌ها',
            value: testsCount,
            unit: 'مورد',
            icon: <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13.8C3 7.28304 8.28304 2 14.8 2H26.8C33.317 2 38.6 7.28304 38.6 13.8C38.6 20.317 33.317 25.6 26.8 25.6H14.8C8.28304 25.6 3 20.317 3 13.8Z" fill="#E2F0FF"/>
                    <g filter="url(#filter0_dd_10_463)">
                    <path d="M3 13.8C3 7.28304 8.28304 2 14.8 2H26.8C33.317 2 38.6 7.28304 38.6 13.8C38.6 20.317 33.317 25.6 26.8 25.6H14.8C8.28304 25.6 3 20.317 3 13.8Z" fill="white" fill-opacity="0.01" shape-rendering="crispEdges"/>
                    </g>
                    <g clip-path="url(#clip0_10_463)">
                    <path d="M26.6335 13.8H25.1868C24.9319 13.7994 24.6838 13.8824 24.4804 14.0362C24.2771 14.19 24.1298 14.4062 24.061 14.6516L22.6901 19.5283C22.6813 19.5586 22.6629 19.5852 22.6376 19.6041C22.6124 19.6231 22.5817 19.6333 22.5501 19.6333C22.5186 19.6333 22.4879 19.6231 22.4626 19.6041C22.4374 19.5852 22.419 19.5586 22.4101 19.5283L19.1901 8.07164C19.1813 8.04135 19.1629 8.01474 19.1376 7.99581C19.1124 7.97688 19.0817 7.96664 19.0501 7.96664C19.0186 7.96664 18.9879 7.97688 18.9626 7.99581C18.9374 8.01474 18.919 8.04135 18.9101 8.07164L17.5393 12.9483C17.4707 13.1928 17.3243 13.4083 17.1221 13.562C16.92 13.7157 16.6732 13.7993 16.4193 13.8H14.9668" stroke="#1E4B8D" strokeWidth="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <filter id="filter0_dd_10_463" x="0" y="0" width="41.6001" height="29.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_10_463"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_463"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_10_463" result="effect2_dropShadow_10_463"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_10_463" result="shape"/>
                    </filter>
                    <clipPath id="clip0_10_463">
                    <rect width="14" height="14" fill="white" transform="translate(13.8 6.79999)"/>
                    </clipPath>
                    </defs>
                </svg>,
        },
        {
            id: 'heartRate',
            label: 'ضربان آخرین ثبت',
            value: latestBpm,
            unit: 'bpm',
            icon: <svg width="42" height="30" viewBox="0 0 42 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13.8C3 7.28304 8.28304 2 14.8 2H26.8C33.317 2 38.6 7.28304 38.6 13.8C38.6 20.317 33.317 25.6 26.8 25.6H14.8C8.28304 25.6 3 20.317 3 13.8Z" fill="#DFF7EA"/>
                    <g filter="url(#filter0_dd_10_474)">
                    <path d="M3 13.8C3 7.28304 8.28304 2 14.8 2H26.8C33.317 2 38.6 7.28304 38.6 13.8C38.6 20.317 33.317 25.6 26.8 25.6H14.8C8.28304 25.6 3 20.317 3 13.8Z" fill="white" fill-opacity="0.01" shape-rendering="crispEdges"/>
                    </g>
                    <g clip-path="url(#clip0_10_474)">
                    <path d="M14.9668 12.3417C14.9668 11.6925 15.1637 11.0587 15.5315 10.5238C15.8994 9.98893 16.4208 9.57821 17.0269 9.34589C17.633 9.11357 18.2954 9.07058 18.9265 9.2226C19.5576 9.37462 20.1277 9.71449 20.5615 10.1973C20.5921 10.23 20.6291 10.256 20.6701 10.2739C20.7111 10.2917 20.7554 10.3009 20.8001 10.3009C20.8449 10.3009 20.8891 10.2917 20.9302 10.2739C20.9712 10.256 21.0082 10.23 21.0387 10.1973C21.4712 9.71135 22.0415 9.36862 22.6736 9.21476C23.3057 9.06089 23.9697 9.10319 24.5771 9.33602C25.1846 9.56885 25.7068 9.98117 26.0741 10.5181C26.4415 11.055 26.6366 11.6911 26.6335 12.3417C26.6335 13.6775 25.7585 14.675 24.8835 15.55L21.6798 18.6492C21.5711 18.7741 21.4371 18.8744 21.2867 18.9434C21.1362 19.0125 20.9728 19.0487 20.8073 19.0498C20.6418 19.0508 20.4779 19.0166 20.3266 18.9495C20.1753 18.8823 20.0401 18.7838 19.9298 18.6603L16.7168 15.55C15.8418 14.675 14.9668 13.6833 14.9668 12.3417Z" stroke="#009869" strokeWidth="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M15.6785 14.3833H19.3418L19.6335 13.8L20.8001 16.425L21.9668 12.3416L22.8418 14.3833H25.916" stroke="#009869" strokeWidth="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <filter id="filter0_dd_10_474" x="0" y="0" width="41.6001" height="29.6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feMorphology radius="1" operator="erode" in="SourceAlpha" result="effect1_dropShadow_10_474"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10_474"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="1"/>
                    <feGaussianBlur stdDeviation="1.5"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
                    <feBlend mode="normal" in2="effect1_dropShadow_10_474" result="effect2_dropShadow_10_474"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_10_474" result="shape"/>
                    </filter>
                    <clipPath id="clip0_10_474">
                    <rect width="14" height="14" fill="white" transform="translate(13.8 6.79999)"/>
                    </clipPath>
                    </defs>
                </svg>
        }
    ];

    return ( 
        <div className="flex flex-col gap-[1rem]">
            <PatientHeader />
            <section className="flex justify-between">
                <header className="whitespace-nowrap">
                    <h1 className="font-extrabold leading-[2rem] text-[1.5rem]">سلام، { currentUser.profile.name }</h1>
                    <p className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">خلاصه‌ی وضعیت قبلی شما براساس آخرین تحلیل‌ها</p>
                </header>
                <div className="flex items-end">
                    <Link to='/patient/dashboard/ecg-upload' className="bg-primary flex gap-[0.5rem] h-[2.25rem] items-center px-[1rem] py-[0.8rem] rounded-full w-fit">
                        <span className="font-medium leading-[1.25rem] text-white text-[0.875rem]">آپلود نوار قلب</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 8.66667V14" stroke="#F9FCFF" strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.66657 9.93266C2.17126 9.4266 1.79761 8.81447 1.57392 8.14262C1.35023 7.47077 1.28237 6.75682 1.37547 6.05486C1.46858 5.3529 1.7202 4.68133 2.1113 4.09102C2.50239 3.50071 3.02269 3.00714 3.63279 2.64769C4.24289 2.28825 4.92679 2.07236 5.63268 2.01638C6.33857 1.96039 7.04795 2.06578 7.70708 2.32457C8.36621 2.58335 8.9578 2.98873 9.43706 3.51002C9.91631 4.0313 10.2706 4.65481 10.4732 5.33333H11.6666C12.3102 5.33325 12.9369 5.54021 13.4539 5.92362C13.9709 6.30703 14.3509 6.84657 14.5377 7.46253C14.7246 8.07849 14.7084 8.73821 14.4915 9.34424C14.2746 9.95027 13.8685 10.4705 13.3332 10.828" stroke="#F9FCFF" strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.33325 11.3333L7.99992 8.66667L10.6666 11.3333" stroke="#F9FCFF" strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                </div>
            </section>
            <section aria-label='general statics' className="flex gap-[1rem] pt-[0.5rem]">
                { statCards.reverse().map((card) => (
                    <div key={ card.id } className="bg-white p-[1.2375rem] rounded-[1.4rem] shadow-sm w-[21.333125rem]">
                        <div className="flex justify-between">
                            <span className="font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground">{ card.label }</span>
                            { card.icon }
                        </div>
                        <span>
                            <span 
                                className= {`!font-extrabold leading-[2rem] text-[1.5rem] `} 
                                dir={ card.id === 'heartRate' ? 'ltr' : 'rtl'}>
                                { card.value } { card.unit }
                            </span>
                        </span>
                    </div>
                ))}
            </section>
            <article className="bg-white flex flex-col relative rounded-[1.4rem] shadow-sm">
                <header>
                    <div className="flex flex-col p-[1.25rem]">
                        <span className="font-bold leading-[1.5rem] text-[1rem]">آخرین نتیجه —  REC-{ latestResult.recId }</span>
                        <span className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">{ latestResult.lastRecDate }</span>
                    </div>
                </header>

                <figure className="relative">
                    <figcaption className="absolute bg-success/15 font-semibold top-[1rem] left-[1.25rem] px-[0.625rem] py-[0.25rem] rounded-full text-[0.75rem] text-success">
                        { primaryDiagnosis.label } . { primaryDiagnosis.confidence }%
                    </figcaption>
                    <div className="h-auto overflow-hidden w-fit">
                        <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>
                        <div>
                            <img src={ ecgSample } alt="ecg-sample" />
                        </div>
                    </div>
                </figure>
                
                <ul className="p-[1.25rem] flex flex-col gap-[0.75rem]">
                    { latestResult && latestResult.diagnoses.map((data) => (
                        <li key={ data.code } className=" flex flex-col gap-[0.375rem] pb-[0.5rem]">
                            <div className="flex justify-between font-normal leading-[1.25rem] text-[0.875rem]">
                                <span className="">{ data.label }</span>
                                <span className="">{ data.confidence }%</span>
                            </div>
                            <div dir="ltr" className="bg-primary/20 rounded-full">
                                <div 
                                    className="bg-primary h-[0.375rem] rounded-full w-full" 
                                    style={{width: `${ data.confidence }%`}}
                                    dir="ltr"
                                ></div>
                            </div>
                        </li>
                    ))}
                    {/* THE LINK */}
                    <Link to={`/patient/dashboard/records/${latestResult.recId}`} className="border border-text-muted-foreground/50 flex gap-[0.5rem] justify-center items-center px-[0.9875rem] py-[0.4375rem] rounded-full shadow-sm">
                        <span className="font-medium leading-[1.25rem] text-[0.875rem]">مشاهده جزئیات کامل</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.99992 12.6666L3.33325 7.99998L7.99992 3.33331" stroke="#152030" strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12.6666 8H3.33325" stroke="#152030" strokeWidth="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    </Link>
                </ul>
                
            </article>
        </div>
     );
}
 
export default Overview;