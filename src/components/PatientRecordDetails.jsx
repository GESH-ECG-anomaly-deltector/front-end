import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useMemo, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import PatientHeader from './PatientHeader'
import EcgLeadChart from './EcgLeadChart'
import EcgLeadModal from './EcgLeadModal';
import { useAuth } from '../context/AuthContext';

const PRIMARY_LEAD_NAME = 'II';

const PatientRecordDetails = () => {
    const { recordId } = useParams();
    const { currentUser, recordsData, requestDoctorReview } = useAuth();
    const [openLead, setOpenLead] = useState(null);
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const reportRef = useRef(null);

    const record = recordsData.find((r) => r.recId === recordId);

    const leadsWithData = useMemo(() => {
        if (!record?.leads) return [];
        return record.leads.map((lead) => {
            let samples = [];
            try {
                samples = lead.graph ? JSON.parse(lead.graph) : [];
            } catch {
                samples = [];
            }
            return { ...lead, samples };
        });
    }, [record]);

    if(!record)
        return <p>آزمایش یافت نشد.</p>

    const patient = currentUser.profile;

    const data  = record.diagnoses[0];

    const primaryLead =
        leadsWithData.find((lead) => lead.name === PRIMARY_LEAD_NAME) || leadsWithData[0];

    const model2Diagnoses = record.diagnoses.filter((d) => d.modelSource === 'model_2');
    const model3Diagnoses = record.diagnoses.filter((d) => d.modelSource === 'model_3');
    const diagnosisGroups = [
        { key: 'model_2', title: 'مدل تشخیص هشت‌کلاسه', items: model2Diagnoses },
        { key: 'model_3', title: 'مدل تشخیص چهارکلاسه', items: model3Diagnoses },
    ].filter((group) => group.items.length > 0);

    const metadataFields = [
        { label: 'تعداد لیدها', value: record.leadCount, suffix: ''},
        { label: 'مدت سیگنال', value: record.duration, suffix: 's'},
        { label: 'نرخ نمونه‌برداری', value: record.sampleRate, suffix: 'hz'},
        { label: 'کیفیت سیگنال', value: record.signalQuality, suffix: '%'},
    ]

    const handleDownloadReport = async () => {
        if (!reportRef.current) return;

        setIsGeneratingPdf(true);
        try {
            const canvas = await html2canvas(reportRef.current, {
                scale: 2, 
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save(`REC-${record.recId}-گزارش.pdf`);
        } catch (err) {
            console.error('خطا در ساخت PDF:', err);
            alert('ساخت گزارش PDF با خطا مواجه شد. دوباره امتحان کنید.');
        } finally {
            setIsGeneratingPdf(false);
        }
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
                    <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>نتیجه REC - { record.recId }</h1>
                    <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>{ record.lastRecDate }. آپلود فایل { record.leadCount } لیدی</p>
                </div>
                <div className='flex font-medium gap-[0.5rem] leading-[1.125rem] text-[0.875rem]'>
                    <button
                        type='button'
                        onClick={ handleDownloadReport }
                        disabled={ isGeneratingPdf }
                        className='bg-white flex gap-[0.5rem] items-center px-[1rem] py-[0.5rem] rounded-full shadow-sm disabled:opacity-60'
                    >
                        <span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 10V2" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4.66675 6.6665L8.00008 9.99984L11.3334 6.6665" stroke="#152030" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </span>
                        { isGeneratingPdf ? 'در حال آماده‌سازی...' : 'دانلود گزارش' }
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
                            <div className='flex items-center gap-[0.75rem]'>
                                <span className='font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground' dir='ltr'>
                                    { record.bpm } bpm . { record.signalQuality }% کیفیت
                                </span>
                                { primaryLead && (
                                    <button
                                        type='button'
                                        onClick={() => setOpenLead(primaryLead)}
                                        className='flex items-center gap-[0.25rem] bg-primary/10 text-primary font-medium leading-[1rem] px-[0.625rem] py-[0.3rem] rounded-full text-[0.75rem]'
                                    >
                                        <span>⤢</span>
                                        بزرگ‌نمایی و زوم کامل
                                    </button>
                                )}
                            </div>
                        </div>
                        <figure className='relative'>
                            <div className="h-fit overflow-hidden px-[0.5rem] py-[1rem] w-full">
                                <div className="absolute h-full top-0 left-0 w-[1.3rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <div className="absolute top-0 left-0 w-full h-[0.5rem] bg-pulse opacity-20 pointer-events-none"></div>
                                <EcgLeadChart
                                    data={ primaryLead?.samples }
                                    height={ 220 }
                                    sampleRate={ record.sampleRate }
                                    zoomable
                                    showAxes
                                />
                            </div>
                            { primaryLead && (
                                <figcaption className='absolute top-[0.75rem] right-[1rem] font-normal leading-[1rem] text-[0.7rem] text-text-muted-foreground'>
                                    لید { primaryLead.name }
                                </figcaption>
                            )}
                        </figure>
                    </section>
                    <section aria-label='نمودار لیدها' className='bg-white grid grid-cols-3 rounded-[1.4rem]'>
                        { leadsWithData.map(( lead ) => (
                            <figure
                                key={ lead.name }
                                onClick={() => setOpenLead(lead)}
                                className='border border-text-muted-foreground/24 flex flex-col gap-[0.375rem] p-[0.75rem] cursor-pointer hover:bg-primary/5'
                            >
                                <figcaption className='font-normal leading-[1rem] text-[0.7rem] text-text-muted-foreground'>{ lead.name }</figcaption>
                                <EcgLeadChart data={ lead.samples } sampleRate={ record.sampleRate } height={ 52 } compact />
                            </figure>
                        )) }
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

                {/* Left Column */}
                <div className='flex flex-1 flex-col gap-[1rem]'>
                    <section className='bg-white flex flex-col gap-[0.5rem] h-fit p-[1.2375rem] rounded-[1.4rem] shadow-sm'>
                        <h2 className='font-normal leading-[1.125rem] text-[0.875rem] text-text-muted-foreground'>تشخیص غالب مدل</h2>
                        <p className='font-extrabold leading-[2rem] text-[1.5rem]'>{ data.label }</p>
                        <div className='bg-success/10 font-semibold leading-[1rem] rounded-full px-[0.625rem] py-[0.25rem] text-[0.75rem] text-success w-fit'>{ data.confidence }% اطمینان</div>
                            { diagnosisGroups.map((group) => (
                                <div key={ group.key } className="pt-[0.75rem] flex flex-col gap-[0.75rem]">
                                    <h3 className="font-semibold leading-[1.125rem] text-[0.8rem] text-text-muted-foreground border-t border-text-muted-foreground/15 pt-[0.75rem]">
                                        { group.title }
                                    </h3>
                                    <ul className="flex flex-col gap-[0.75rem]">
                                        { group.items.map((data) => (
                                            <li key={ `${group.key}-${data.code}` } className=" flex flex-col gap-[0.375rem]">
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
                                </div>
                            ))}
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
            </div>

            <EcgLeadModal lead={ openLead } sampleRate={ record.sampleRate } onClose={() => setOpenLead(null)} />

            <div
                ref={ reportRef }
                dir='rtl'
                style={{ position: 'absolute', top: 0, left: '-9999px', width: '780px', backgroundColor: '#ffffff', padding: '40px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #2671D9', paddingBottom: '16px', marginBottom: '24px' }}>
                    <div>
                        <h1 style={{ fontSize: '22px', fontWeight: 800, margin: 0, color: '#152030' }}>گِش</h1>
                        <p style={{ fontSize: '12px', color: '#8A928A', margin: '4px 0 0' }}>سامانه تشخیص هوشمند نوار قلب</p>
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <p style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>گزارش آزمایش REC-{ record.recId }</p>
                        <p style={{ fontSize: '11px', color: '#8A928A', margin: '4px 0 0' }} dir='ltr'>{ record.lastRecDate }</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '28px', marginBottom: '24px', fontSize: '13px', flexWrap: 'wrap' }}>
                    <div><span style={{ color: '#8A928A' }}>بیمار: </span><strong>{ patient ? patient.name : 'نامشخص' }</strong></div>
                    <div><span style={{ color: '#8A928A' }}>تعداد لیدها: </span><strong>{ record.leadCount }</strong></div>
                    <div><span style={{ color: '#8A928A' }}>مدت سیگنال: </span><strong>{ record.duration }s</strong></div>
                    <div><span style={{ color: '#8A928A' }}>نرخ نمونه‌برداری: </span><strong>{ record.sampleRate }hz</strong></div>
                    <div><span style={{ color: '#8A928A' }}>کیفیت سیگنال: </span><strong>{ record.signalQuality }%</strong></div>
                </div>

                <div style={{ background: '#e8f3ee', border: '1px solid #bfe3d1', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
                    <p style={{ fontSize: '12px', color: '#3a7d5c', margin: 0 }}>تشخیص غالب مدل</p>
                    <p style={{ fontSize: '20px', fontWeight: 800, margin: '4px 0', color: '#152030' }}>{ data.label }</p>
                    <p style={{ fontSize: '13px', color: '#3a7d5c', margin: 0 }}>{ data.confidence }% اطمینان</p>
                </div>

                { primaryLead && (
                    <div style={{ marginBottom: '24px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>سیگنال ثبت‌شده — لید { primaryLead.name }</p>
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '8px' }}>
                            <EcgLeadChart data={ primaryLead.samples } sampleRate={ record.sampleRate } height={ 160 } showAxes />
                        </div>
                    </div>
                )}

                { diagnosisGroups.map((group) => (
                    <div key={ group.key } style={{ marginBottom: '20px' }}>
                        <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px', borderBottom: '1px solid #eee', paddingBottom: '6px' }}>{ group.title }</p>
                        { group.items.map((d) => (
                            <div key={ d.code } style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', padding: '6px 0', borderBottom: '1px dashed #f0f0f0' }}>
                                <span>{ d.label } <span style={{ color: '#8A928A' }}>({ d.code })</span></span>
                                <span style={{ fontWeight: 700 }}>{ d.confidence }%</span>
                            </div>
                        ))}
                    </div>
                ))}

                <div style={{ background: '#f7f8fa', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>نظر پزشک</p>
                    { record.doctorNote ? (
                        <>
                            <p style={{ fontSize: '12px', color: '#4b5563', margin: 0 }}>{ record.doctorNote.text }</p>
                            <p style={{ fontSize: '11px', color: '#8A928A', marginTop: '6px' }}>دکتر { record.doctorNote.doctorName } — { record.doctorNote.confirmedAt }</p>
                        </>
                    ) : (
                        <p style={{ fontSize: '12px', color: '#8A928A', margin: 0 }}>این آزمایش هنوز توسط پزشک بررسی نشده است.</p>
                    )}
                </div>

                <p style={{ fontSize: '10px', color: '#8A928A', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                    این گزارش خروجی یک سامانه‌ی هوش مصنوعی است و جایگزین نظر پزشک متخصص نیست. تولید‌شده توسط سامانه گِش.
                </p>
            </div>

        </div>
     );
}
 
export default PatientRecordDetails;