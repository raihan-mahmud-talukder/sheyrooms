import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/Navbar"
import { HomeScreen } from './screens/HomesScreen'
import { BookingScreen } from './screens/BookingScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { AdminScreen } from './screens/AdminScreen'
import { LandingScreen } from './screens/LandingScreen'
export const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/book/:roomid/:checkin/:checkout" element={<BookingScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/admin' element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}