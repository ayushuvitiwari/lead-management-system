import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login';
import Lead from './Pages/Lead';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/lead' element={<Lead/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App