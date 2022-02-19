import react from 'react';
import { BrowserRouter as Router,Redirect, Route, Link, withRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';
import './CreateMenu.css';
import swal from 'sweetalert';
import {Api_GetOCModified,Api_GetParameters,Api_OCStatus,api_handleErrors,Api_GetMenus,Api_deleteMenu,Api_deletesubmenu,url_sistema,Api_GetdataSubmenuById,Api_Getdatamenu,Api_SaveDataSubMenu,Api_GetdataSubmenu,Api_SaveDataMenu} from './Api';
class Parametros extends React.Component{
    constructor(props) {
      super(props);
    
      this.state = { parametros : [],
        username:"",
      password:"",
      ud:"",
      Accion:"Nuevo Parametro",
      Titulo: "",
      Ruta: "",
      Icono: "",
      Activo: "",
      IdMenu: 0,
      MenuActual:"",
      submenus: [],
      AccionSubMenu : "Nuevo SubMenu",
      SubMenuActual : "",
      IdSubMenu : 0,
      IdMenuSubMenu : 0
      ,SubOrden : 0
      ,TituloSubMenu : ""
      ,IconoSubMenu : ""
      ,RutaSubMenu : ""
      ,ActivoSubMenu : false
      };   
      this.handleChange = this.handleChange.bind(this);
      this.editarmenu = this.editarmenu.bind(this);
      this.savedata = this.savedata.bind(this);
      this.eliminarsubmenu = this.eliminarsubmenu.bind(this);
      this.eliminarmenu = this.eliminarmenu.bind(this);
    }
    componentDidMount(){
      var logged=Cookies.get('Nombre');
      debugger;
      if(logged != undefined && logged != "")
      {
        this.getparameters();
      }else{
        this.getparameters();
      }
    
    }
    eliminarmenu(id,titulo){
      swal({
        title: "Borrar?",
        text: "Deseas borrar el Menu "+titulo,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        
        if (willDelete) {
          Api_deleteMenu(id,titulo)
          .then(api_handleErrors).then(results =>{
            return results.json();
          })
          .then(data => {
            
                      console.log(data)
            if(data.resultado=="ERROR AL BORRAR"||data.resultado==="NO SE PUEDE BORRAR,EL MENU TIENE SUBMENUS ACTIVOS"){
              swal("Error",data.resultado, "error");
            }
            else{
              
              swal({
                title: "MENU BORRADO CON EXITO",
                text: data.resultado,
                icon: "success",
                button: "OK",
              });
              this.getdata();
  
              
            }
        })
        }
      });
      //agregamos un swal
     
    }
    eliminarsubmenu(id,titulo){
      swal({
        title: "Borrar?",
        text: "Deseas borrar el SubMenu "+titulo,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        
        if (willDelete) {
          Api_deletesubmenu(id,titulo)
          .then(api_handleErrors).then(results =>{
            return results.json();
          })
          .then(data => {
            
                      console.log(data)
            if(data.resultado=="ERROR AL BORRAR"||data.resultado==="NO SE PUEDE BORRAR,EL MENU TIENE SUBMENUS ACTIVOS"){
              swal("Error",data.resultado, "error");
            }
            else{
              
              swal({
                title: "SUBMENU BORRADO CON EXITO",
                text: data.resultado,
                icon: "success",
                button: "OK",
              });
              
              
            }
        })
        }
      });
    }
    blankdata(){
      console.log(this.state);
      this.setState({"IdMenu":0,"Titulo":"","Ruta":"","Icono":"","Activo":"","Accion":"Nuevo Menu"});
    }
    blankdatasubmenu(){
      console.log(this.state);
      this.setState({
      "IdMenu":0,  
      "SubMenuActual" : "",
      "IdSubMenu" : 0,
      "IdMenuSubMenu" : 0
      ,"SubOrden" : 0
      ,"TituloSubMenu" : ""
      ,"IconoSubMenu" : ""
      ,"RutaSubMenu" : ""
      ,"ActivoSubMenu" : false,
      "AccionSubMenu":"Nuevo SubMenu"
      });
    }
    savedatasubmenu(){
      var data = {
        IdMenu:this.state.IdMenu,
        idSubMenu:this.state.IdSubMenu,
        Titulo:this.state.TituloSubMenu,
        Ruta:this.state.RutaSubMenu,
        Icono:this.state.IconoSubMenu,
        Activo:this.state.ActivoSubMenu
      };
      Api_SaveDataSubMenu(data)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data.resultado=="ERROR AL AGREGAR"||data.resultado==="ERROR AL ACTUALIZAR"){
          swal("Error",data.resultado, "error");
        }
        else{
          
          swal({
            title: "SUBMENU AGREGADO CON EXITO",
            text: data.resultado,
            icon: "success",
            button: "OK",
          });
          this.getdata();
          document.getElementById("cerraragregadosubmenu").click();     
          
        }
    })
    }
    savedata(){
      var data = {
        IdMenu:this.state.IdMenu,
        Titulo:this.state.Titulo,
        Ruta:this.state.Ruta,
        Icono:this.state.Icono,
        Activo:this.state.Activo
      };
      Api_SaveDataMenu(data)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data.resultado=="ERROR AL AGREGAR"||data.resultado==="ERROR AL ACTUALIZAR"){
          swal("Error",data.resultado, "error");
        }
        else{
          
          swal({
            title: "MENU AGREGADO CON EXITO",
            text: data.resultado,
            icon: "success",
            button: "OK",
          });
          this.getdata();
          document.getElementById("cerraragregado").click();     
          
        }
    })
    }
    editarmenu(id){
    this.setState({"Accion":"Editar Menu"});
      Api_Getdatamenu(id)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data){
          this.setState({"IdMenu":data.idMenu,"Titulo":data.titulo,"Ruta":data.ruta,"Icono":data.icono,"Activo":data.activo}); 
        }
    })
    
    }

    editarsubmenu(id,idmenu,titulo){
      this.setState({"AccionSubMenu":"Editar SubMenu","IdMenu":idmenu,"SubMenuActual":titulo});
      Api_GetdataSubmenuById(id)
        .then(api_handleErrors).then(results =>{
          return results.json();
        })
        .then(data => {
          
                    console.log(data)
          if(data){
            this.setState({"IdSubMenu":data.idSubMenu,"TituloSubMenu":data.titulo,"RutaSubMenu":data.ruta,"IconoSubMenu":data.icono,"ActivoSubMenu":data.activo}); 
          }
      })
      
      }
    handleChange(event) {
      debugger;
      this.setState({[event.target.name]: event.target.value});
      console.log(this.state);
  
    }
    getparameters(){
      Api_GetParameters()
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        debugger;
                  console.log(data)
        if(data){
          this.setState({parametros:data}); 
        }
    })

    }
    
    getdata(){
      Api_GetMenus()
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data){
          this.setState({menus:data}); 
        }
    })
    }
        render(){
            return(
              <div className="contenedor-wrapped Fixedpage" id="Wrapper">
                <h1><i className="fas fa-tools"></i> Configuracion de parametros del sistema</h1>
                <button type="button" className="btn btn-warning float-right" data-toggle="modal" data-target="#exampleModal">
  <i className="fa fa-plus" aria-hidden="true"></i>Nuevo Parametro
</button>
<br></br>
<br></br>
                <div className="panel panel-default">
               
  <ul className="list-group">
  
  {/* <li className="list-group-item active"><h4>Menu</h4></li> */}
  <table className="table table-bordered table-dark">
  <thead>
    <tr>
      <th scope="col">Parametro</th>
      <th scope="col">Valor</th>
      <th scope="col">Editar</th>
      <th scope="col">Eliminar</th>
    </tr>
  </thead>
  <tbody>
  {this.state.parametros.map(obj => (
    <tr>
      <th scope="row">{obj.descripcion}</th>
      <td>{obj.valor}</td>
      <td>     
          <button type="button" onClick={() =>this.editarmenu(obj.idMenu)} className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
          <i className="far fa-edit"></i>Editar
</button>
</td>
<td>
<button type="button" onClick={() =>this.eliminarmenu(obj.idMenu,obj.titulo)} className="btn btn-danger">
<i className="fas fa-trash"></i>Eliminar
</button>
</td>
    </tr>
  ))}
  </tbody>
</table>


</ul>
</div>
<div className="panel panel-default">
<br></br>

<br></br>
<br></br>
               {/* <ul className="list-group">
               
               <li className="list-group-item active"><h4>Submenus de {this.state.MenuActual}</h4></li>
               {
                 (this.state.submenus.length==0)?<div className="alert alert-danger" role="alert">Este menu no contiene submenus</div>:
               this.state.submenus.map(obj => (
                   <li className="list-group-item">
                   <button type="button" className="btn btn-dark" value={obj.idSubMenu}>{obj.titulo} </button>
                       <button type="button" onClick={() =>this.editarsubmenu(obj.idSubMenu,obj.idMenu,obj.titulo)} className="btn btn-success float-right" data-toggle="modal" data-target="#modalsubmenu">
                       <i className="far fa-edit"></i>Editar
             </button>
             <button type="button" onClick={() =>this.eliminarsubmenu(obj.idSubMenu,obj.titulo)} className="btn btn-danger float-right">
<i className="fas fa-trash"></i>Eliminar
</button>
                   </li>
                                         ))}
             
             </ul> */}
             </div>
{/* modal */}
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.Accion}</h5>
        <button id="cerraragregado" type="button" onClick={() => this.blankdata()} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      {/* contenido del modal */}
      <div className="input-group">
        <input type="hidden"  name="IdMenu" onChange={this.handleChange} value={this.state.IdMenu}/>
  <span className="input-group-addon" id="basic-addon1">Titulo</span>
  <input name="Titulo" onChange={this.handleChange} value={this.state.Titulo} type="text" className="form-control" placeholder="Titulo" aria-describedby="basic-addon1" />
</div>

      <label for="basic-url">Ruta</label>
<div className="input-group">
  <span className="input-group-addon" id="basic-addon3">{url_sistema}</span>
  <input name="Ruta" onChange={this.handleChange} type="text" value={this.state.Ruta} className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
</div>
<div className="input-group">
  <span className="input-group-addon" id="basic-addon1">Icono</span>
  <input name="Icono"  onChange={this.handleChange} value={this.state.Icono} type="text" className="form-control" placeholder="Icono" aria-describedby="basic-addon1"/>
</div>
<div className="input-group sizedright">
<input name="Activo" onChange={this.handleChange} className="form-check-input " type="checkbox" value={this.state.Activo} id="flexCheckChecked" checked/>
  <label className="form-check-label" for="flexCheckChecked">
  Activo
  </label>
  </div>
      </div>
      <div className="modal-footer">
        {this.state.Accion!="Nuevo Menu"?    <button type="button" onClick={() => this.setState({"SubMenuActual":this.state.Titulo})} className="btn btn-warning float-right" data-toggle="modal" data-target="#modalsubmenu">
  <i className="fa fa-plus" aria-hidden="true"></i>Nuevo SubMenu
</button>:""}
  
        <button type="button" className="btn btn-secondary" onClick={() => this.blankdata()} data-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={() => this.savedata()}>Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>

{/* modal submenu */}
<div className="modal fade" id="modalsubmenu" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="modalsubmenulabel">{this.state.AccionSubMenu} de {this.state.SubMenuActual}</h5>
        <button id="cerraragregadosubmenu" type="button" onClick={() => this.blankdatasubmenu()} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      {/* contenido del submodal */}
      <div className="input-group">
        <input type="hidden"   name="IdMenu" onChange={this.handleChange} value={this.state.IdMenu}/>
        <input type="hidden"   name="IdSubMenu" onChange={this.handleChange} value={this.state.IdSubMenu}/>
  <span className="input-group-addon" id="basic-addon1">Titulo</span>
  <input name="TituloSubMenu" onChange={this.handleChange} value={this.state.TituloSubMenu} type="text" className="form-control" placeholder="Titulo" aria-describedby="basic-addon1" />
</div>

      <label for="basic-url">Ruta</label>
<div className="input-group">
  <span className="input-group-addon" id="basic-addon3">{url_sistema}</span>
  <input name="RutaSubMenu" onChange={this.handleChange} type="text" value={this.state.RutaSubMenu} className="form-control" id="basic-url" aria-describedby="basic-addon3"/>
</div>
<div className="input-group">
  <span className="input-group-addon" id="basic-addon1">Icono</span>
  <input name="IconoSubMenu"  onChange={this.handleChange} value={this.state.IconoSubMenu} type="text" className="form-control" placeholder="Icono" aria-describedby="basic-addon1"/>
</div>
<div className="input-group sizedright">
<input name="ActivoSubMenu" onChange={this.handleChange} className="form-check-input " type="checkbox" value={this.state.ActivoSubMenu} id="flexCheckChecked" checked/>
  <label className="form-check-label" for="flexCheckChecked">
  Activo
  </label>
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => this.blankdatasubmenu()} data-dismiss="modal">Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={() => this.savedatasubmenu()}>Guardar Cambios</button>
      </div>
    </div>
  </div>
</div>
                  </div>
                  )}
            }    
            export default Parametros;