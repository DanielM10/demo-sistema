import react from 'react'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import swal from 'sweetalert'
import { BrowserRouter as Router, Switch, Route, Redirect,Link } from 'react-router-dom';
const Styles = styled.div`
  .navbar { background-color: #505B5C; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #F06B18;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
  .white-stripes{
    color: white !important;
    left: 25%;
    right: 25%;
    margin-right:10px;
    margin-top:3%;
  }
  .red-bg{
    bg-color:red;
  }
  .swal-overlay {
    background-color: rgba(43, 165, 137, 0.45);
  }
`;
function removersesion(){
  swal({
    
    title:"¿Desea cerrar sesión?",
    icon: "info",
    dangerMode: true,
    buttons: true,  
    className: ""
  })
  .then((willDelete) => {
    if (willDelete) {
      Cookies.remove('Nombre');
      Cookies.remove('Unidad');
      swal("Su sesion se cerrara!", {
        icon: "success",
      });
    } 
    window.location.replace("/Login");
  });
  
}
const usuario = Cookies.get("Nombre");
export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand ><img src="icono.png" width="25%"></img></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item className="white-stripes"><Nav.Link className="white-stripes">{(usuario != undefined)?"Bienvenido: "+usuario:""}</Nav.Link></Nav.Item> 
          {(usuario != undefined)?<Nav.Item><Nav.Link onClick={()=>removersesion()}><i className="fas fa-sign-out-alt"></i>Logout</Nav.Link></Nav.Item>:""}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)