import { BrowserRouter as Router, Switch, Route, Redirect,Link, useHistory,useLocation } from 'react-router-dom';
import React, { Component,useState  } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import * as All from 'react-bootstrap/';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import './GeneraLayoutMerksyst.css';
import {Api_getclientes,Api_generaLayoutMerksyst,api_handleErrors} from './Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup,FormControl,ButtonToolbar,ButtonGroup} from 'react-bootstrap/';
import DatePicker from 'react-date-picker';
import Cookies from 'js-cookie';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSortDown,faFileExcel,faSearch} from '@fortawesome/free-solid-svg-icons'
import { DescargarTxt } from './DescargarTxt'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import MultiSelect from './MultiSelect';
import LoadingScreen from './Loader'


function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64); // Comment this if not using base64
  const bytes = new Uint8Array(binaryString.length);
  return bytes.map((byte, i) => binaryString.charCodeAt(i));
}
function createAndDownloadBlobFile(body, filename, extension = 'txt') {
  const blob = new Blob([body]);
  const fileName = `${filename}.${extension}`;
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    // Browsers that support HTML5 download attribute
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


class GeneraLayoutMerksyst extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			clase: "",
      Finicio: "",
      Ffin:"",
      cliente:"",
      Clientes:[],
      etiqueta : 'Clientes',
      id:'HOLA',      
      activated:true,
      NombreArchivo : "Layout Merksyst Banorte ",
      isLoading : true
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changepickerinicio = this.changepickerinicio.bind(this);
        this.changepickerfin = this.changepickerfin.bind(this);
        this.generarlayout = this.generarlayout.bind(this);
        this.changeclient = this.changeclient.bind(this);
      
		// this.login = this.login.bind(this);
		document.title = "Layout Merksyst";
	}
  changepickerinicio(event){
    debugger;
    this.setState({Finicio:event});
  }
  changepickerfin(event){
    this.setState({Ffin:event});
  }
  handleChange(event) {
    debugger;
		this.setState({[event.target.name]: event.target.value});
    console.log(this.state);

	}
    handleToggle = () => {
        debugger
        var asd = this.state;
        var classy = this.state.clase;
        if(classy==""){
            this.setState({clase: "active"});
        }
        else{
            this.setState({clase: ""});
        }
    };
    getdata(){
      debugger;
     
      Api_getclientes()
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data){
          
          this.setState({Clientes:data,activated:false,isLoading:false}); 
          
         
        }
    })
    }
    changeclient(event,value){
      alert(event,value);
      // this.setState({cliente:event});
    }
    generarlayout(){
      console.log(this.state);
      if(this.state.Ffin==""|| this.state.Finicio==""){
swal("Error","Debes seleccionar un rango de fechas valido","error")
      }
      if(this.state.cliente==""||this.state.cliente== null){
        swal("Error","Debes seleccionar un cliente valido","error")
      }
      else{
        console.log(this.state.cliente)
      var data = {
        FechaInicio: this.state.Finicio==""?null:this.state.Finicio,
        FechaFin: this.state.Ffin==""?null:this.state.Ffin,
        NoCliente: this.state.cliente==""?null:this.state.cliente
      };
      this.setState({isLoading:true})   
      Api_generaLayoutMerksyst(data).then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        // quitar esta linea
        // var data = "ERROR";
        if(data){
          this.setState({isLoading:false})
          if (data == "ERROR NO HAY DATOS") {
            swal("ERROR", "NO HAY DATOS EN EL RANGO DE FECHAS SELECCIONADAS", "error");
          }
          else {
                     
            const linkSource = 'data:text/plain;base64,' + data;
            const downloadLink = document.createElement('a');
            document.body.appendChild(downloadLink);
        
            downloadLink.href = linkSource;
            downloadLink.target = '_self';
            downloadLink.download = Date.now().toString()+".txt";
            downloadLink.click(); 
            //window.location.href = 'data:text/plain;base64,' + data;
            // generamos el archivo como array de bytes y descargamos
            // const arrayBuffer =  base64ToArrayBuffer(data.base64doc);
            //   createAndDownloadBlobFile(arrayBuffer, this.state.NombreArchivo + new Date());
            // window.open("descargas/"+data.NombreArchivo, "_blank")
            this.setState({isLoading:false})
            swal({
              title: "LAYOUT GENERADO CON EXITO",
              text: data.mensaje,
              icon: "success",
            
            });
      }
    }
    else{
      this.setState({isLoading:false})
      swal("Error", "Error al generar el layout,no hay registros del cliente", "error");
    }
      })    
  }
  }

       componentDidMount(){         
         this.getdata();
         this.setState({isLoading:false})   
       }
    render(){
      const flatProps = {
        options: this.state.Clientes.map((option) => option.value),
      };
    return(
      this.state.isLoading ? <LoadingScreen></LoadingScreen> :
    <div align="center" className="contenedor-wrapped Fixedpage" id="Wrapper">
      
        <h1>Layout Merksyst <span className="badge badge-secondary">Banorte</span></h1>
        <br></br>
        <div align="center"> 
        <ButtonGroup className="mr-2" aria-label="First group">
      <strong className="label">Fecha Inicio : </strong><DatePicker name="Finicio"
       onChange={this.changepickerinicio}
       value={this.state.Finicio}
      />
   </ButtonGroup>
    <ButtonGroup className="mr-3" aria-label="First group">
    <strong className="label">Fecha Fin: </strong> <DatePicker name="Ffin"
       onChange={this.changepickerfin}
       value={this.state.Ffin}
      />
    </ButtonGroup>
    <br></br>
    <br></br>
    <div align="center" class="div-centered-v2">
    <InputGroup align="center" className="mr-5">
  
     
  {/* <MultiSelect id={this.state.id} etiqueta={this.state.etiqueta} datos={this.state.Clientes} ></MultiSelect> */}
  <Autocomplete
  disablePortal
  clearOnEscape
  disabled={this.state.activated}
  id="cliente"
  name="cliente"
  // value={this.state.cliente}
  options={this.state.Clientes}
  getOptionLabel={option => option.nom}
  onChange={(event, value) => this.setState({cliente:value.cve})}
  defaultvalue={this.state.Clientes.find(v => v.nom[0])} 
  sx={{ width: 630 }}
  renderInput={(params) => <TextField  {...params} label={this.state.etiqueta} />}
    />   
</InputGroup>
    </div>
   
   
</div>
        <div>
          
     


</div>
<div align="center">
<br></br>
<Button onClick={() => this.generarlayout()} type="button" class="sizefixed btn btn-warning"><i class="fas fa-file-alt"></i><a>Generar</a></Button>
</div> 
    <br></br>
    <footer>FULTRA® 2021. TODOS LOS DERECHOS RESERVADOS</footer>
    </div>
        );
}
}
export default GeneraLayoutMerksyst;
