import { useState } from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={ <Home /> }/>
      {/* <Route path='/login-signup' element={  }/>
      <Route path='/doctor-panel' element={  }/>
      <Route path='/patient-panel' element={  }/>
      <Route path='/admin-panel' element={  }/> */}
    </Routes>
  )
}

export default App
