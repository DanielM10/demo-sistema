import react from 'react';
import { BrowserRouter as Router, Route,Redirect, Link, withRouter } from "react-router-dom";
import React from 'react';
import { ProSidebar,SidebarHeader,SidebarContent, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.css';
import { faAddressBook, faAdjust, faFilePdf, faGem, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { FaList,FaUsers, FaRegHeart,FaTerminal } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import Cookies from 'js-cookie';
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {api_handleErrors,Api_GetMenuPermisosByUser} from './Api';
export default class Sidebar extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
      opened:false,
      izq:false,
      imagenfondo:true,
      menu: []
    }
    this.abrebarra = this.abrebarra.bind(this);
    this.menuIconClick = this.menuIconClick.bind(this);
    this.getmenus = this.getmenus.bind(this);
  }
  componentDidMount(){
    this.getmenus();
  }
  getmenus(){
    var logged=Cookies.get('Nombre');
    Api_GetMenuPermisosByUser(logged)
    .then(api_handleErrors).then(results =>{
      return results.json();
    })
    .then(data => {
      
                console.log(data)
      if(data){
        this.setState({"menu":data}); 
      }
  })
  
  }
  abrebarra(valor){
    if(valor){
      document.getElementById("Wrapper").className = "contenedor Fixedpage";
    }
  else{
    document.getElementById("Wrapper").className = "contenedor-wrapped Fixedpage";
  }
    this.setState({opened:valor});
  }
menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    this.state.opened ? this.abrebarra(false) : this.abrebarra(true);
  };

  render() {
  
    return (
      <>
      <div id="header">
        <ProSidebar collapsed={this.state.opened} rtl={this.state.izq} collapsedWidth={80}>
     <SidebarHeader>
          <div className="logotext">
 
            </div>
            <div className="closemenu" onClick={() => this.menuIconClick()}>
                
              {this.state.opened ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
        <Menu popperArrow={true} iconShape="circle">
        {this.state.menu.map(obj =>(

       <MenuItem ><i className={obj.icono}></i>{obj.titulo}<Link to={obj.ruta} /></MenuItem>
        
          
         ))}
          
        </Menu>
        </SidebarContent>
      </ProSidebar>
      </div>
    </>
    );
  }
}

