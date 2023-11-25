import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/Navbar"
import { HomeScreen } from './screens/HomesScreen'
export const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}