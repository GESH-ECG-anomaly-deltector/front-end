import { useParams } from 'react-router-dom';

import PatientHeader from './PatientHeader'

const PatientRecordDetails = () => {
    const { recordId } = useParams();

    return ( 
        <div>
            <h1>نتجه REC - { recordId }</h1>
        </div>
     );
}
 
export default PatientRecordDetails;