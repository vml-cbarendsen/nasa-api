import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import LandingPage from "./pages/Landing";
import Enhanced from "./pages/Enhanced";

export interface IAppPageProps {}

const AppPage: React.FC<IAppPageProps> = props => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* 
          ###########################################################
          This is an example stup of how to implement a new route,
          along with parameters to pass
          ###########################################################
        */}
        <Route path="enhanced">
          <Route index element={<Enhanced />} />
          <Route path=":date" element={<Enhanced />} />
          <Route path=":date/image/:imageName" element={<Enhanced />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  );
};

export default AppPage;