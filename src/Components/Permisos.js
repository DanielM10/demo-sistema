import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Cookies from 'js-cookie';
import {Api_GetUsers,Api_GetMenuPermisosByUser,api_handleErrors,Api_GetUsersPSV,Api_getusersPMR,Api_getMenusPermission,Api_savePermissions} from './Api';
import './Permisos.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import swal from 'sweetalert'
import Titulos from './Titulos'

class Permisos extends React.Component{
    constructor(props) {
      super(props);
      this.state = { rows : [],
        NombreUsuario : "",
        IdUsuario : "",
        menu : [],
        mostrar : true,
        acticated : true,
        menumodified :[],
        currentuser : ""
        }
        
        this.blankdata = this.blankdata.bind(this);
        this.seteavalores = this.seteavalores.bind(this);
    }
    blankdata(){
        this.setState({"IdUsuario":"","NombreUsuario":""}); 
    }
    guardarpermisos(){
      debugger;
      var token = Cookies.get('Token');
      var data ={
        User: this.state.currentuser,
        Menus : this.state.menu
      }
      Api_savePermissions(data,token)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        if(data.message==="Insertado Correctamente"){       
           swal("Exito","Permisos Guardados Correctamente","success")
           this.setState({currentuser:""})
           this.forceUpdate();
        }
        else{
          swal("Error","Hubo un error al insertar permisos","error")
        }
    })
    }
    seteavalores(id,event){
      debugger;
      var menus = this.state.menu;
      var foundIndex = this.state.menu.findIndex(element => element.idMenu == id);
      var seleccionadoornot = this.state.menu[foundIndex].selected;
      if(seleccionadoornot){
        this.state.menu[foundIndex].selected = false;
      }
     else{
      this.state.menu[foundIndex].selected = true;
     }
      this.setState({"menu" : menus});
    }
  
    getpermisos(datos){
      debugger;
      if(datos!=null){
      var data = {
        cia : datos.cia,
        user : datos.nombre
      };
        var token = Cookies.get('Token');
        Api_getMenusPermission(data,token)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
                  console.log(this.state)
        if(data){       
          debugger;
           this.setState({"menu":data,menumodified:data,mostrar:false,currentuser : datos.nombre}); 
        }
    })
  }
    }
    getdatos(){
        var data = {};
        var token = Cookies.get('Token');
        Api_GetUsersPSV(token)
        .then(api_handleErrors).then(results =>{
          return results.json();
        })
        .then(data => {
                    console.log(data)
          if(data){
            debugger;          
            var anteriores = this.state.rows;
            var nuevos = anteriores.concat(data)
             this.setState({"rows":nuevos,acticated:false}); 
          }
      })
      Api_getusersPMR(token)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
                  console.log(data)
        if(data){
          debugger;
          var anteriores = this.state.rows;
          var nuevos = anteriores.concat(data)
           this.setState({"rows":nuevos,acticated:false}); 
        }
    })
    }
      componentDidMount(){   
        this.getdatos();
      
      }
      render(){
        return(
            
            <div className="contenedor-wrapped Fixedpage" id="Wrapper">
              
           <div className="panel panel-default">

<br></br>
             <Titulos titulo="Permisos por usuario" ></Titulos>
             {/* listado de permisos por usuario */}
             <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={this.state.rows}
      getOptionLabel={(option) => option.cia + ' - ' + option.nombre }
      sx={{ width: 300 }}
      onChange={(event,value) => this.getpermisos(value)}
      disabled={this.state.acticated}
      renderInput={(params) => <TextField {...params} label="Usuarios" />}
    />
           
             </div>
<Paper>
  {this.state.menu.map(item => 
//   <Checkbox
//   checked={item.selected}
//   onChange={this.handleChange(item._id)}
//   label={item.title}
//   value={item.idMenu}
// />
<FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked checked={item.selected} 
      onChange={() =>this.seteavalores(item.idMenu)}
      sx={{         
          '&.Mui-checked': {
            color: '#ED6C02',
          },
        }} />} label={item.title} />
      </FormGroup>
    )}
     <Button variant="contained" onClick={() => this.guardarpermisos()} hidden={this.state.mostrar} endIcon={<SaveIcon />}>
        Guardar
      </Button>
</Paper>
         </div>

  
        )};
}
export default Permisos;