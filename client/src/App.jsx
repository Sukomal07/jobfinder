import './styles/App.css'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import NotFound from './pages/NotFound'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Signup from './pages/Signup'
import { useEffect } from 'react'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const isLoggedin = localStorage.getItem("isLoggedin")

  useEffect(() => {
    if (isLoggedin && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/')
    }
  }, [isLoggedin, location.pathname, navigate])
  return (
    <>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
