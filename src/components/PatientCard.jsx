import { getStatusColorClass, getStatusLabel, getRiskColorClass, getRiskLabel } from "../utils/diagnosisHelpers";
import { getPatientCardStatus, getRecordsByPatientId } from "../utils/recordHelpers";

import { useAuth } from "../context/AuthContext";

const PatientCard = ({ patient }) => {
    const { recordsData } = useAuth();

    const cardStatus = getPatientCardStatus(recordsData, patient.id);
    const patientRecords = getRecordsByPatientId(recordsData, patient.id);

    return ( 
        <header className="bg-white border border-text-muted-foreground/25 flex flex-col gap-[1rem] p-[1.25rem] rounded-[1.4rem]">
            <div className="flex gap-[0.75rem]">
                <div className="bg-primary/20 flex justify-center h-[2.25rem] items-center rounded-full w-[2.25rem]">
                    <span className="font-normal leading-[1rem] text-[0.75rem]">{ patient.first2letters }</span>
                </div>
                <div className="flex flex-col">
                <span className="font-semibold leading-[1.25rem] text-[0.875rem]">{ patient.name }</span>
                    <span className="font-normal leading-[1rem] text-[0.75rem] text-text-muted-foreground">{ patientRecords.length } آزمایش ثبت‌شده</span>
                </div>
            </div>

            <div className="flex font-semibold leading-[1rem] gap-[0.5rem] text-[0.75rem]">
                <span className={`${ getRiskColorClass(patient.riskLevel) } px-[0.625rem] pt-[0.2125rem] pb-[0.261875rem] rounded-full`}>
                    { getRiskLabel(patient.riskLevel) }    
                </span>
                {(cardStatus === 'pending' || cardStatus === 'processing') &&
                    <span className={` ${ getStatusColorClass(cardStatus) } px-[0.625rem] pt-[0.2125rem] pb-[0.261875rem] rounded-full`}>
                        { getStatusLabel(cardStatus) }
                    </span>
                }

            </div>
        </header>
     );
}
 
export default PatientCard;
