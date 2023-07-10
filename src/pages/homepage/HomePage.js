import Aside from "./components/aside/Aside";
import Home from "./components/home/Home";
import { Outlet } from "react-router-dom";

// import SignIn from '../authorization/components/signIn/SignIn';

function HomePage() {
    return ( 
    <div style={{display:'flex', width: '100%'}}>
     <Aside />
      {/* <Home /> */}
      <Outlet />
    </div>
   
  );
}

export default HomePage;