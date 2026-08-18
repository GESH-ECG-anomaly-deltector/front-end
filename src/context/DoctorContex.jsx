import { createContext, useContext } from "react";

const DoctorContext = createContext(null);

export const DoctorProvider = ({ children }) => {
    //mocking the date here 
    const patient = {
        doctorName: "زینب جنتی",
        first2letters: "دک",
        doctorCode: 'PT-204',
        doctorNationalId: '0023456789',
        doctorAge: '24',
        doctorGender: 'زن',
        doctorBloodType: 'O+',
        doctorPhone: +989187898789,
        doctorCity: 'تهران',

        patients: [
            { name: 'zeinab', id: 2, age: 24, gender: 'female'},
            { name: 'zeinab', id: 2, age: 24, gender: 'female'},
            { name: 'zeinab', id: 2, age: 24, gender: 'female'},
            { name: 'zeinab', id: 2, age: 24, gender: 'female'},
        ],
    };

    return (
        <DoctorContext.Provider value = { patient }>
            { children }
        </DoctorContext.Provider>
    );
};
 
export const useDoctor = () => useContext(DoctorContext);