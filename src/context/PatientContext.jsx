import { createContext, useContext } from "react";

const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
    //mocking the date here 
    const patient = {
        patientName: "زینب جنتی",
        first2letters: "زی",
        patientCode: 'PT-204',
        patientNationalId: '0023456789',
        patientAge: '24',
        patientGender: 'زن',
        patientBloodType: 'O+',
        patientPhone: +989187898789,
        patientCity: 'تهران',
        patientDoctor: 'دکتر xx'
    };

    return (
        <PatientContext.Provider value = { patient }>
            { children }
        </PatientContext.Provider>
    );
};
 
export const usePatient = () => useContext(PatientContext);