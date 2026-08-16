import { createContext, useContext } from "react";

const PatientContext = createContext(null);

export const PatientProvider = ({ children }) => {
    //mocking the date here 
    const patient = {
        patientName: "زینب جنتی",
        first2letters: "زی",
    };

    return (
        <PatientContext.Provider value = { patient }>
            { children }
        </PatientContext.Provider>
    );
};
 
export const usePatient = () => useContext(PatientContext);