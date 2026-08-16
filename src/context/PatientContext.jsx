import { Children, createContext, useContext } from "react";

const PatientContext = createContext(null);

export const PatientProvider = ({ Children }) => {
    //mocking the date here 
    const patient = {
        patientName: "زینب جنتی",
        first2letters: "زی",
    };

    return (
        <PatientProvider.Provider value = { patient }>
            { children }
        </PatientProvider.Provider>
    );
};
 
export const usePatient = () => useContext(PatientContext);