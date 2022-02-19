import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Cookies from 'js-cookie';
import {Api_GetUsers,api_handleErrors} from './Api';
import '@fortawesome/fontawesome-free/css/all.min.css';

class Users extends React.Component{
    constructor(props) {
      super(props);
      this.state = { rows : []
        
        }
    }
    getdatos(){
        var nombre=Cookies.get('Nombre');
        var unidad=Cookies.get('Unidad');
        var data = {
            "Activo":true,
            "Unidad":unidad
        }
        Api_GetUsers(data)
        .then(api_handleErrors).then(results =>{
          return results.json();
        })
        .then(data => {
          
                    console.log(data)
          if(data){
            this.setState({"rows":data}); 
          }
      })
    }
      componentDidMount(){
        var logged=Cookies.get('Nombre');
        debugger;
        this.getdatos();
      
      }
      render(){
        return(
            <div className="contenedor-wrapped Fixedpage" id="Wrapper">
           <div className="panel panel-default">

<br></br>
               <ul className="list-group">
               
               <li className="list-group-item active"><h4><i className="fas fa-users"></i>Usuarios</h4></li>
               {this.state.rows.map(obj => (
                   <li className="list-group-item">
                   <button type="button" className="btn btn-dark" value={obj.nombre}>{obj.nombre_lar} </button>
                       {/* <button type="button"  className="btn btn-success float-right" data-toggle="modal" data-target="#modalsubmenu">
                       <i className="far fa-edit"></i>Editar
             </button> */}
             {obj.puesto=="BAJA           "?<button type="button" className="btn btn-success float-right">
             <i className="fas fa-user-lock"></i>Activar
</button>:<button type="button" className="btn btn-warning float-right">
             <i className="fas fa-user-lock"></i>Desactivar
</button>}
             
                   </li>
                                         ))}
             
             </ul>
             </div>
            </div>
        )};
}
export default Users;