import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import SignUpPage from './Pages/SignUpPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/Settings'
import ProfilePage from './Pages/ProfilePage'


const App = () => {
  return (
    <div>
       <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/signup' element={<SignUpPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/settings' element={<SettingsPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
        </Routes>

    </div>
  )
}

export default App
