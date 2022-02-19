import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideBarMenu from './Components/SideBarMenu';
const AppRouter = () => (
        <div > {}
   </div>
        );

ReactDOM.render(
  <React.StrictMode>
    <SideBarMenu />
  </React.StrictMode>,
  document.getElementById('root')

);

export default AppRouter;
