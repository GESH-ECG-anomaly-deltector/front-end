import { useParams } from 'react-router-dom';

import PatientHeader from './PatientHeader'

const PatientRecordDetails = () => {
    const { recordId } = useParams();

    return ( 
        <div className='flex flex-col gap-[1.5rem]'>
            <PatientHeader />
            <h1>نتجه REC - { recordId }</h1>
        </div>
     );
}
 
export default PatientRecordDetails;