import './styles/App.css'
import { Routes, Route } from 'react-router-dom'

import NotFound from './pages/NotFound'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Signup from './pages/Signup'

function App() {
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
