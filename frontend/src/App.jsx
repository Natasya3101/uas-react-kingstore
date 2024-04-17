/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { createContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const AllContext = createContext();
function App() { 
  const [popUp, setPopUp] = useState(false);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState({})
  
  function openPopup() {
    setPopUp(true);
  }
  function closePopup() {
    setPopUp(false);
  }
  return (
    <AllContext.Provider
      value={{popUp, setPopUp, openPopup, closePopup, navigate, admin, setAdmin}}
    >
      <Header/>
      <Outlet/>
      <Footer/>
    </AllContext.Provider>
  )
}

export default App