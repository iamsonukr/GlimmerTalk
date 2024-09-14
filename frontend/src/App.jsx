import { useContext } from 'react'
import './App.css'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Home from './pages/home/Home'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/AuthContext'

function App() {
  const {authUser}=useContext(AuthContext)
  console.log(authUser)
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser? <Home/>:<Navigate to="/login"/>  }/>
        <Route path='/signup' element={authUser? <Navigate to="/"/>: <Signup/>  }/>
        <Route path='/login' element={authUser? <Navigate to="/"/>: <Login/>  }/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
