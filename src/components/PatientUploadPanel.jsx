import PatientHeader from "./PatientHeader";
import ECGUploadForm from "./ECGUploadForm";

const PatientUploadPanel = () => {
    return ( 
        <div className="flex flex-col gap-[1.5rem]">
            <PatientHeader />
            <header>
                <h1 className='font-extrabold leading-[2rem] text-[1.5rem] tracking-[-0.0375rem]'>آپلود نوار قلب</h1>
                <p className='font-normal leading-[1.25rem] text-[0.875rem] text-text-muted-foreground'>فایل خام ۱۲ لیدی را بارگذاری کنید یا دستگاه را متصل کنید</p>
            </header>
            <div className="flex gap-[1rem]">
                {/* Right Column */}
                <div className="rounded-[1.4rem]">
                    <ECGUploadForm />
                </div>

                {/* Left Column */}
                <aside className="bg-white border border-text-muted-foreground/24 flex flex-1 flex-col gap-[1rem] p-[1.4875rem] rounded-[1.4rem]">

                </aside>
            </div>
        </div>
     );
}
 
export default PatientUploadPanel;