import { useParams } from 'react-router-dom';

import { mockRecords } from '../data/mockRecords';
import PatientHeader from './PatientHeader'

const PatientRecordDetails = () => {
    const { recordId } = useParams();

    const record = mockRecords.find((r) => r.recId === recordId);

    if(!record)
        return <p>آزمایش یافت نشود.</p>

    const primaryDiagnosis = record.diagnoses[0];

    return ( 
        <div className='flex flex-col gap-[1.5rem]'>
            <PatientHeader />
            <div>
                <h1>نتجه REC - { recordId }</h1>
                <p></p>
            </div>
        </div>
     );
}
 
export default PatientRecordDetails;