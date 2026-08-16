import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'

import Home from './pages/Home.jsx'
import LoginSignUp from './pages/LoginSignUp.jsx'
import PatientDashboard from './pages/PatientDashboard.jsx'
import PatientRecordDetails from './components/PatientRecordDetails.jsx'
import PatientOverview from './components/PatientOverview.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/login-signup' element={ <LoginSignUp /> }/>
      {/* <Route path='/doctor-panel' element={  }/>
      <Route path='/admin-panel' element={  }/> */}
      <Route path='/patient/dashboard' element={ <PatientDashboard /> }>
        <Route index element={ <PatientOverview />} />
        <Route path='records/:recordId' element={ <PatientRecordDetails /> }/>
        {/* <Route path="ecg-upload" element={<PatientUploadPanel />} />
        <Route path="history" element={<PatientHistory />} />
        <Route path="profile" element={<PatientProfile />} /> */}
      </Route>
    </Routes>
  )
}

export default App
