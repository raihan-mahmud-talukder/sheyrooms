import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/Navbar"
import { HomeScreen } from './screens/HomesScreen'
import { BookingScreen } from './screens/BookingScreen'
export const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/book/:roomid" element={<BookingScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}