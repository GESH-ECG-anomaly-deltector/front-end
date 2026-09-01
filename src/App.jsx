import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'

import Home from './pages/Home.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import PatientDashboard from './pages/PatientDashboard.jsx'
import PatientRecordDetails from './components/PatientRecordDetails.jsx'
import PatientOverview from './components/PatientOverview.jsx'
import PatientUploadPanel from './components/PatientUploadPanel.jsx'
import PatientHistory from './components/PatientHistory.jsx'
import PatientProfile from './components/PatientProfile.jsx'
import ChooseDoctor from './components/ChooseDoctor.jsx'
import './App.css'
import DoctorsPatients from './components/DoctorsPatients.jsx'
import DoctorDashboard from './pages/DoctorDashboard.jsx'
import DoctorReviewRequests from './components/DoctorReviewRequests.jsx'
import DoctorPatientDetails from './components/DoctorPatientDetails.jsx'
import DoctorAssignmentRequests from './components/DoctorAssignmentRequests.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminOverview from './components/AdminOverview.jsx'

import ProtectedRoute from './routing/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/login-signup' element={ <LoginSignUp /> }/>
      {/* <Route path='/doctor-panel' element={  }/>
      <Route path='/admin-panel' element={  }/> */}
      
      <Route 
        path='/patient/dashboard' 
        element={ 
          <ProtectedRoute allowedRole='patient'>
            <PatientDashboard />
          </ProtectedRoute> 
        }>

        <Route index element={ <PatientOverview />} />
        <Route path='records/:recordId' element={ <PatientRecordDetails /> }/>
        <Route path="ecg-upload" element={<PatientUploadPanel />} />
        <Route path="history" element={<PatientHistory />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="choose-doctor" element={<ChooseDoctor />} />
      </Route>

      <Route 
        path='/doctor/dashboard' 
        element={ 
          <ProtectedRoute allowedRole='doctor'>
            <DoctorDashboard />
          </ProtectedRoute>
        }>

        <Route index element={ <DoctorsPatients />}/>
        <Route path='reviews' element={ <DoctorReviewRequests />} />
        <Route path="patients/:patientId" element={<DoctorPatientDetails />} />
        <Route path="assignment-requests" element={<DoctorAssignmentRequests />} />
      </Route>

      <Route 
        path='/admin/dashboard' 
        element={ 
          <ProtectedRoute allowedRole='admin'>
            <AdminDashboard /> 
          </ProtectedRoute>

        }>

        <Route index element={ <AdminOverview  /> } />
      </Route>
    </Routes>
  )
}

export default App
