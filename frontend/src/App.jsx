import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignup from "./pages/CaptainSignup";
import Start from "./pages/Start";
import Home from "./pages/Home";
import UserProtectorWrapper from "./pages/UserProtectorWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectorWrapper from "./pages/CaptainProtectorWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import 'remixicon/fonts/remixicon.css'

const App = () =>{
  return(
    <div>
      <Routes>
        <Route path="/" element={<Start></Start>}></Route>
        <Route path="/login" element={<UserLogin></UserLogin>}></Route>
        <Route path="/riding" element={<Riding></Riding>}></Route>
        <Route path="/captain-riding" element={<CaptainRiding></CaptainRiding>}></Route>
        <Route path="/signup" element={<UserSignup></UserSignup>}></Route>
        <Route path="/captain-login" element={<CaptainLogin></CaptainLogin>}></Route>
        <Route path="/captain-signup" element={<CaptainSignup></CaptainSignup>}></Route>
        <Route path="/home" element={<UserProtectorWrapper>
          <Home></Home>
        </UserProtectorWrapper>}></Route>
        <Route path="/user/logout" element={<UserProtectorWrapper>
          <UserLogout></UserLogout>
        </UserProtectorWrapper>}></Route>
        <Route path="/captain-home" element={<CaptainProtectorWrapper><CaptainHome></CaptainHome></CaptainProtectorWrapper>}></Route>
        <Route path="/captain/logout" element={<CaptainProtectorWrapper>
          <CaptainLogout></CaptainLogout>
        </CaptainProtectorWrapper>}></Route>
      </Routes>
    </div>
  )
}

export default App;