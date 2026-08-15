import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import './App.css'
import LoginSignUp from './pages/LoginSignUp.jsx'
import PatientDashboard from './pages/PatientDashboard.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> }/>
      <Route path='/login-signup' element={ <LoginSignUp /> }/>
      {/* <Route path='/doctor-panel' element={  }/>
      <Route path='/admin-panel' element={  }/> */}
      <Route path='/patient-dashboard' element={ <PatientDashboard /> }/>
    </Routes>
  )
}

export default App
