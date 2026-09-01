import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import PatientHeader from './PatientHeader'
import { useAuth } from '../context/AuthContext';

import ecgSample from '../assets/images/ecg-sample2.png'

const PatientRecordDetails = () => {
    const { recordId } = useParams();
    const { currentUser, recordsData, requestDoctorReview } = useAuth();

    const record = recordsData.find((r) => r.recId === recordId);

    if(!record)
        return <p>آزمایش یافت نشد.</p>

    const patient = currentUser.profile;
    const primaryDiagnosis = record.diagnoses.find(
        (d) => d.code === record.primaryDiagnosisCode
    ) || record.diagnoses[0];

    const metadataFields = [
        { label: 'تعداد لیدها', value: record.leadCount, suffix: ''},
        { label: 'مدت سیگنال', value: record.duration, suffix: 's'},
        { label: 'نرخ نمونه‌برداری', value: record.sampleRate, suffix: 'hz'},
        { label: 'کیفیت سیگنال', value: record.signalQuality, suffix: '%'},
    ]

    //Should turn this into a pdf
    const handleDownloadReport = () => {
        const lines = [
            `گزارش نتیجه‌ی آزمایش REC-${record.recId}`,
            `بیمار: ${patient ? patient.name : 'نامشخص'}`,
            `تاریخ ثبت: ${record.lastRecDate}`,
            `تشخیص غالب: ${primaryDiagnosis.label} (${primaryDiagnosis.confidence}% اطمینان)`,
            '',
            'همه‌ی احتمالات تشخیصی:',
            ...record.diagnoses.map((d) => `- ${d.label} (${d.code}): ${d.confidence}%`),
            '',
            record.doctorNote
                ? `نظر پزشک: ${record.doctorNote.text} — دکتر ${record.doctorNote.doctorName} (${record.doctorNote.confirmedAt})`
                : 'این آزمایش هنوز توسط پزشک بررسی نشده است.',
        ];

        const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `REC-${record.recId}-گزارش.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const canRequestReview = record.status !== 'pending' && !record.doctorNote;

    const handleRequestReview = async () => {
        if (!canRequestReview) return;
        await requestDoctorReview(record.recId);
    };

    return ( 
        <div className='flex flex-col gap-[1.5rem]'>
            <PatientHeader />
            <header className='flex justify-between whitespace-nowrap'>
                <div>
                    <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>نتجه REC - { record.recId }</h1>
                    <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>{ record.lastRecDate }. آپلود فایل { record.leadCount } لیدی</p>
                </div>
                <div className='flex font-medium gap-[0.5rem] leading-[1.125rem] text-[0.875rem]'>
                    <button type='button' onClick={ handleDownloadReport } className='bg-white flex gap-[0.5rem] items-center px-[1rem] py-[0.5rem] rounded-full shadow-sm'>
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 10V2" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.66675 6.6665L8.00008 9.99984L11.3334 6.6665" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        دانلود گزارش
                    </button>
                    <button
                        type='button'
                        onClick={ handleRequestReview }
                        disabled={ !canRequestReview }
                        className={`flex gap-[0.5rem] items-center px-[1rem] py-[0.5rem] rounded-full ${
                            canRequestReview ? 'bg-primary text-white' : 'bg-text-muted-foreground/20 text-text-muted-foreground cursor-not-allowed'
                        }`}
                    >
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.6666 11.3333C14.6666 11.687 14.5261 12.0261 14.2761 12.2761C14.026 12.5262 13.6869 12.6667 13.3333 12.6667H4.55192C4.19833 12.6667 3.85924 12.8073 3.60925 13.0573L2.14125 14.5253C2.07506 14.5915 1.99072 14.6366 1.89891 14.6548C1.8071 14.6731 1.71194 14.6637 1.62546 14.6279C1.53897 14.5921 1.46505 14.5314 1.41304 14.4536C1.36103 14.3758 1.33326 14.2843 1.33325 14.1907V3.33333C1.33325 2.97971 1.47373 2.64057 1.72378 2.39052C1.97382 2.14048 2.31296 2 2.66659 2H13.3333C13.6869 2 14.026 2.14048 14.2761 2.39052C14.5261 2.64057 14.6666 2.97971 14.6666 3.33333V11.3333Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 5.3335V9.3335" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6 7.3335H10" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        { record.status === 'pending' ? 'در انتظار بررسی پزشک' : (record.doctorNote ? 'قبلاً بررسی شده' : 'درخواست بررسی پزشک') }
                    </button>
                </div>
            </header>

            <div className='flex gap-[1rem]'>

                {/* Right Column */}
                <div className='flex flex-[2] flex-col gap-[1rem]'>
                    <section className='bg-white border border-text-muted-foreground/24 flex flex-col relative rounded-[1.4rem]'>
                        <div className='flex justify-between items-center px-[1.125rem] py-[0.75rem]'>
                            <h2 className='font-bold leading-[1.125rem] text-[0.875rem]'>سیگنال ثبت‌شده</h2>
                            <span className='font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground' dir='ltr'>
                                { record.bpm } bpm . { record.signalQuality }% کیفیت
                            </span>
                        </div>
                        <figure className='relative'>
                            <div className="h-fit overflow-hidden px-[0.5rem] py-[1rem] w-fit">
                                <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div>
                                    <img src={ ecgSample } alt="ecg-sample" />
                                </div>
                            </div>
                        </figure>
                    </section>
                    <section aria-label='نمودار لیدها' className='bg-white grid grid-cols-3'>
                        { record.leads.map(( lead ) => (
                            <figure key={ lead.name } className='border border-l-text-muted-foreground/24 flex flex-col gap-[0.375rem] p-[0.75rem]'>
                                <figcaption className='font-normal leading-[1rem] text-[0.7rem] text-text-muted-foreground'>{ lead.name }</figcaption>
                                <div className="w-[11.5rem] h-[3.25rem] bg-primary rounded-[0.775rem]"></div>
                            </figure>
                        )) }
                    </section>

                    <section className='bg-white border border-text-muted-foreground/25 flex flex-col gap-[0.75rem] p-[1.125rem] rounded-[1.4rem]'>
                        <div className='flex justify-between'>
                            <h2 className='font-bold leading-[1.5rem] text-[1rem]'>نظر پزشک</h2>
                            {record.doctorNote && (
                                <span className='bg-success/20 flex font-bold justify-center items-center leading-[1rem] px-[0.625rem] py-[0.375rem] rounded-full text-success text-[0.75rem]'>تشخیص تایید شد</span>
                            )}
                        </div>
                        {record.doctorNote ? (
                            <>
                                <p className='font-normal leading-[2rem] text-[0.875rem] text-text-muted-foreground'>{ record.doctorNote.text}</p>
                                <p className='font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground'>دکتر { record.doctorNote.doctorName }. { record.doctorNote.confirmedAt }</p>
                            </>
                        ) : (
                            <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>این آزمایش هنوز توسط پزشک بررسی نشده است.</p>
                        )}
                    </section>
                </div>

                {/* Left Column */}
                <div className='flex flex-1 flex-col gap-[1rem]'>
                    <section className='bg-white flex flex-col gap-[0.5rem] h-fit p-[1.2375rem] rounded-[1.4rem] shadow-sm'>
                        <h2 className='font-normal leading-[1.125rem] text-[0.875rem] text-text-muted-foreground'>تشخیص غالب مدل</h2>
                        <p className='font-extrabold leading-[2rem] text-[1.5rem]'>{ primaryDiagnosis.label }</p>
                        <div className='bg-success/10 font-semibold leading-[1rem] rounded-full px-[0.625rem] py-[0.25rem] text-[0.75rem] text-success w-fit'>{ primaryDiagnosis.confidence }% اطمینان</div>
                        <ul className="pt-[0.75rem] flex flex-col gap-[0.75rem]">
                            { record.diagnoses.map((data) => (
                                <li key={ data.code } className=" flex flex-col gap-[0.375rem]">
                                    <div className="flex justify-between font-normal leading-[1.25rem] text-[0.875rem]">
                                        <span className="">{ data.label } <span className='text-text-muted-foreground'>({data.code})</span></span>
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
                        </ul>
                    </section>
                    <section className='bg-white p-[1.2375rem] rounded-[1.4rem] shadow-sm w-full'>
                        <h2 className='font-bold leding-[1.5rem] text-[1rem]'>مشخصات ثبت</h2>
                        <dl className='flex flex-col gap-[0.75rem] p-[0.375rem]'>
                            { metadataFields.map((field) => (
                                <div key={ field.label } className='flex justify-between leading-[1.25rem] pb-[0.5rem] text-[0.875rem]'>
                                    <dt className='font-normal text-text-muted-foreground'>{ field.label }</dt>
                                    <dd className='font-medium' dir='ltr'>{ field.value } { field.suffix }</dd>
                                </div>
                            ))}
                        </dl>
                        <Link to='/patient/dashboard/history' className='flex flex-1 font-medium justify-center leading-[1.125rem] px-[0.9875rem] py-[0.4375rem] rounded-[1.15rem] shadow-text-muted-foreground/30 shadow-sm text-[0.875rem] w-full'>بازگشت به تاریخچه</Link>
                    </section>
                </div>
            </div>
            
        </div>
     );
}
 
export default PatientRecordDetails;