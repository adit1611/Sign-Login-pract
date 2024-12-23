import React, { useState } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Refreshhandler from '../Refreshhandler';
function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <div className='bg-teal-400 w-screen h-screen bg-opacity-40'>
     <h1 className="text-3xl font-bold underline text-center">
    Hello world!
  </h1>
    <Refreshhandler setIsAuthenticated = {setIsAuthenticated}/>
  <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    
  </div>
  )
}

export default App