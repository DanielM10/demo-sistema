import React, { Component} from 'react';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Titulo from './Titulos'
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import EmailIcon from '@mui/icons-material/Email';
import { IconButton } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import LoadingScreen from './LoadingScreen';
import SearchIcon from '@mui/icons-material/Search';
import { MDBDataTableV5 } from 'mdbreact';
import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";
import ReactDatatable from '@ashvin27/react-datatable';
import { Table } from 'react-bootstrap';
import {Api_getInvoices,Api_getproveedores,api_handleErrors,Api_getinvoicesdetail,Api_SendMailExterno,Api_getOfficesPSV,Api_getDestinyPSV,Api_getProviderAdress,Api_getallOffices} from './Api';
import Cookies from 'js-cookie'
import Autocomplete from '@mui/material/Autocomplete';
import swal from 'sweetalert'
import { Fragment } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import moment from 'moment';
import MapIcon from '@mui/icons-material/Map';

// const defaultProps = {
//   options: top100Films,
//   getOptionLabel: (option) => option.title,
// };

const stylev2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const stylev3 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
class EnvioExterno extends React.Component {
  _isMounted = false;
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columns: [],
        columnsv2: [],
        columnsv3 : [],
        config : {},
        titulo : "",
        render : false,
        nombre : "",
        email : "",
        rfc: "",
        nproveedor : "",
        cargando : false,
        porenviar : [],
        aenviar : "",
        listadofacturasmail : [],
        listaproveedores : [],
        selectionModel : [],
        busqueda : [],
        foliobusqueda : "",
        peso : 0,
        modalabierta :false,
        seleccionadas : [],
        NOTOCselected : [],
        loadingheader : true,
        loadingdetalle : false,
        detailmodificado : [],
        headermodificado : [],
        cargando : true,
        Offices : [],
        valores : [],
        modalabiertaorigen : false,
        modalabiertatraspasos : false,
        modalabiertaproveedores : false,
        origenseteado : [],
        destinoseteado : [],
        DestinyAllsucursales : [],
        DestinyProveedores : [],
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleChangespecial = this.handleChangespecial.bind(this);
    }
    rowClickedHandler = (event, data, rowIndex) => {
      console.log("event", event);
      console.log("row data", data);
      console.log("row index", rowIndex);
  }
  handleChange(event) {
    debugger;
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }
  selectionModelfiltered(data){
    if(data){
      var filtradas=[];
      return filtradas
    }
    else{
      return this.state.seleccionadas
    }
    
  }
  buscafactura(){
    debugger;
    var existe = this.state.rows.find(row => row.invoice === this.state.foliobusqueda.trimStart().trimEnd());
    if(existe){
      swal("Alerta","La factura: "+ this.state.foliobusqueda + " ya existe en el listado de facturas.","warning");
      return ;
    }else{
    debugger;
    var token = Cookies.get('Token');
    var datos =
    {
      id : this.state.foliobusqueda
    }
    Api_getInvoices(datos,token)
    .then(api_handleErrors).then(results => {
      return results.json();
    })
    .then(data => {
      debugger;
      swal("Finalizado","Factura agregada al listado de facturas,favor de seleccionarla.","success")
      var objetos = this.state.rows;
      data[0].rowNumber = objetos.length+1
      var resultObject = objetos.concat(data)
      this.setState({rows:resultObject,headermodificado:resultObject,modalabierta:false,foliobusqueda:""});
    })
  }
  }
validatecantidad(item) {
  debugger;
  const rowIndex = this.state.porenviar.find(row => row.rowNumber === item.id);
  const rowIndexEspejo = this.state.detailmodificado.find(row => row.rowNumber === item.id);
  if(parseInt(item.props.value)<=parseInt(rowIndex.cantidadOriginal)){
    rowIndexEspejo.cantidad = item.props.value;
    var foundIndex = this.state.detailmodificado.findIndex(row => row.rowNumber === item.id);
    var arraymodificado = this.state.detailmodificado;
    this.state.detailmodificado[foundIndex].cantidad = item.props.value;
    // this.setState({detailmodificado:arraymodificado});
    return false;
  }
  else{
    
    return true
  }
}
openmodal(){
  if(!this.state.modalabierta){
    this.setState({modalabierta:true})
  }
  else{
    this.setState({modalabierta:false})
  }
  
}
handleClose(){
  debugger;
  if(this.state.modalabierta){
    this.setState({ modalabierta: false,FolioBusqueda:""});
  }
  else{
    this.setState({ modalabierta: true });
  }
}
seteaoficinea(item,valor){
debugger;
if(valor!=null){

var foundIndex = this.state.headermodificado.findIndex(row => row.rowNumber === item[0].rowNumber);
if(item[0].recordType=="Orden Compra"){
  this.state.headermodificado[foundIndex].origen = valor.dir;
this.state.headermodificado[foundIndex].cveorigen = valor.cve;
this.setState({origenseteado:valor})
}
else{

this.state.headermodificado[foundIndex].origen = valor.des;
this.state.headermodificado[foundIndex].cveorigen = valor.suc;
this.setState({origenseteado:valor})
}
}
else{
  var foundIndex = this.state.headermodificado.findIndex(row => row.rowNumber === item[0].rowNumber);
  this.state.headermodificado[foundIndex].origen = "";
  this.state.headermodificado[foundIndex].cveorigen = "";
  }
}
seteadestino(item,valor){
  debugger;
  if(valor!=null){
  debugger;
  var foundIndex = this.state.headermodificado.findIndex(row => row.rowNumber === item[0].rowNumber);
  if(item[0].recordType=="Orden Compra"){
    this.state.headermodificado[foundIndex].destino = valor.des;
  this.state.headermodificado[foundIndex].cvedestino = valor.suc;
  this.setState({destinoseteado:valor})
  }
  else{
  this.state.headermodificado[foundIndex].destino = valor.dir;
  this.state.headermodificado[foundIndex].cvedestino = valor.cve;
  this.setState({destinoseteado:valor})
  }
  }
  else{
    var foundIndex = this.state.headermodificado.findIndex(row => row.rowNumber === item[0].rowNumber);
  this.state.headermodificado[foundIndex].destino = "";
  this.state.headermodificado[foundIndex].cvedestino = "";
  }
  }
asignafraccion(item){
  debugger;
  var foundIndex = this.state.detailmodificado.findIndex(row => row.rowNumber === item.id);
  this.state.detailmodificado[foundIndex].fraccionarancelaria = item.props.value;
  // this.setState({detailmodificado:arraymodificado});
  return false;
}
asignapedimento(item){
  var foundIndex = this.state.detailmodificado.findIndex(row => row.rowNumber === item.id);
  this.state.detailmodificado[foundIndex].pedimento = item.props.value;
  // this.setState({detailmodificado:arraymodificado});
  return false;
}
asignafolio(item){
  var foundIndex = this.state.detailmodificado.findIndex(row => row.rowNumber === item.id);
  this.state.detailmodificado[foundIndex].folio = item.props.value;
  // this.setState({detailmodificado:arraymodificado});
  return false;
}
 appendObjTo(thatArray, newObj) {
  const frozenObj = Object.freeze(newObj);
  return Object.freeze(thatArray.concat(frozenObj));
}
handleChange(event) {
  debugger;
  this.setState({ [event.target.name]: event.target.value });
  console.log(this.state);
}
handleChangespecial(event) {
  debugger;
  var result = this.state.listaproveedores.find( ({ proveedor }) => proveedor === event.target.value.toString() );
  this.setState({nombre:result.nom,email:result.mail1,rfc:result.rfc});

}
showLogs2(data){
    console.log(data);
}
openmodalorigen(data){
  debugger;
  console.log(this.state.valores)
  if(!this.state.modalabiertaorigen){

      var data = this.state.headermodificado.filter((r) => r.rowNumber == data.row.rowNumber).map((r) => r);      
      var destino = {des: data[0].destino,suc :data[0].cvedestino};
      var origen = {dir: data[0].origen,cve :data[0].cveorigen};
      
    
    this.setState({modalabiertaorigen:true,valores:data,destinoseteado:destino,origenseteado:origen})
   
  }
  else{
    this.setState({modalabiertaorigen:false,valores:[],destinoseteado:[],origenseteado:[]})
    
  }
  
}
openmodalproveedores(data){
  debugger;
  console.log(this.state.valores)
  if(!this.state.modalabiertaproveedores){

  
      
      var data = this.state.headermodificado.filter((r) => r.rowNumber == data.row.rowNumber).map((r) => r);
      var origen = {des: data[0].origen,suc :data[0].cveorigen};
      var destino = {dir: data[0].destino,cve :data[0].cvedestino};
    

    this.setState({modalabiertaproveedores:true,valores:data,destinoseteado:destino,origenseteado:origen})
   
  }
  else{
    this.setState({modalabiertaproveedores:false,valores:[],destinoseteado:[],origenseteado:[]})
    
  }
  
}
openmodaltraspasos(data){
  debugger;
  console.log(this.state.valores)
  if(!this.state.modalabiertatraspasos){

  
      
      var data = this.state.headermodificado.filter((r) => r.rowNumber == data.row.rowNumber).map((r) => r);
      var origen = {des: data[0].origen,suc :data[0].cveorigen};
      var destino = {dir: data[0].destino,cve :data[0].cvedestino};
    

    this.setState({modalabiertatraspasos:true,valores:data,destinoseteado:destino,origenseteado:origen})
   
  }
  else{
    this.setState({modalabiertatraspasos:false,valores:[],destinoseteado:[],origenseteado:[]})
    
  }
  
}
enviardatos(){
  //traemoseldetalle
  debugger;  
  var detailaenviar = [];
  this.state.seleccionadas.forEach(element => {
   var xd = this.state.detailmodificado.filter((r) => r.rowNumber == element).map((r) => r);
   detailaenviar.push(xd);
  });
  var headeraenviar = [];
  this.state.aenviar.forEach(element => {
    var xd = this.state.headermodificado.filter((r) => r.invoice == element).map((r) => r);
    headeraenviar.push(xd);
   });
  debugger; 
  // //traemoselheader
  // var headeraenviar = [];
  // var headerpreenvio = [];
  // var headerselected = this.state.aenviar.toString();
  // headerpreenvio = headerselected.split(',')
  // headerpreenvio.forEach(element => {
  //   var xd = this.state.headermodificado.filter((r) => r.invoice == element).map((r) => r);
  //   headeraenviar.push(xd);
  //  });
  var tienevaciosorigen = false;
  var tienevaciosdestino = false;
  headeraenviar.forEach(element => {
    debugger;
   if(element[0].origen==="" ){
tienevaciosorigen=true;
   }
   if(element[0].destino===""){
     tienevaciosdestino=true;
   }
 });
  
  if (tienevaciosorigen) {
    swal("Error","Seleccione el origen de todos los envios","error")
    return;
  }
  if (tienevaciosdestino) {
    swal("Error","Seleccione el destino de todos los envios","error")
    return;
  }
  if(this.state.nproveedor=="" || this.state.nproveedor==null){
    swal("Error","Proporcione un proveedor valido","error")
    return;
  }
  if(this.state.rfc=="" || this.state.rfc==null){
    swal("Error","Proporcione un rfc valido","error")
    return;
  }
  if(this.state.email == ""){
    swal("Error","Proporcione un email valido","error")
    return;
  }
  if(this.state.peso=="" || this.state.peso==="0" || this.state.nproveedor==null){
    swal("Error","Proporcione un peso valido","error")
    return;
  }
  if(detailaenviar.length===0){
    swal("Error","Debe seleccionar al menos un detalle","error");
    return;
  }
  else{
    debugger;
    var token = Cookies.get('Token');
    var objetosconvertidos = [];
    var objetoscondestino = [];
    
   
    headeraenviar.forEach(element => {
      debugger;
      var newobject2 ={
              fac:element[0].invoice,
            Origin:element[0].cveorigen,
            Destiny:element[0].cvedestino,
            
      }
      objetoscondestino.push(newobject2)
    })
    detailaenviar.forEach(element => {
      var newobject ={
      fac: element[0].id,
      cveArt: element[0].cve_art,
      par : element[0].par,
      quantity: parseInt(element[0].cantidad),
      tariffFraction: element[0].fraccionarancelaria===undefined?"":element[0].fraccionarancelaria,
      petition: element[0].pedimento===undefined?"":element[0].pedimento,
      uuid: element[0].folio===undefined?"":element[0].folio,
      Alm : element[0].alm===undefined?"":element[0].alm,
      Salm: element[0].sub_alm===undefined?"":element[0].sub_alm,
      Origin :element[0].origen===undefined?"":element[0].origen,
      Destiny:element[0].destino===undefined?"":element[0].destino,
      CveOrigin : element[0].destino===undefined?"":element[0].cveorigen,
      CveDestiny : element[0].destino===undefined?"":element[0].cvedestino,
      Type:element[0].type,
      }
      objetosconvertidos.push(newobject)
    });
    var datos =
    {
      rfcReceiver : this.state.rfc,
      emailTo : this.state.email,
      kg : this.state.peso,  
      lstProducts : objetosconvertidos,
      lstDestiny  : objetoscondestino
    }
    this.setState({cargando:true});
    Api_SendMailExterno(datos,token)
    .then(api_handleErrors).then(results => {
      return results.json();
    })
    .then(data => {
      debugger;
     if(data==="El envío de información se realizó correctamente"){
      this.setState({cargando:false});
  swal("Exito",data.toString(),"success").then((value) => {
    window.location.reload();
  });
      this.setState({
        rfc : "",
        email : "",
        peso : 0,
        nproveedor : "",
        nombre : "",
        detailmodificado : [],
        aenviar : "",
        seleccionadas : [],
        rows : this.state.rows
      });
     }
     else{
      swal("Error",data.toString(),"error")
     }
      
    })

  }
}
editRecord = (record, index) => {
  debugger;
  var registros = [];
  registros = this.state.porenviar;
  var newArray = this.appendObjTo(registros, record);
  this.setState({porenviar : newArray});
  console.log(this.state)
}

UNSAFE_componentWillMount(){
  var token = Cookies.get('Token');
  var datos =
  {
    id : null
  }
  var datosv2 = {
    suc : null
  }
  var datosv3 = {
    suc : null
  }
  Api_getOfficesPSV(datosv2,token)
  .then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {

    console.log(data)
    if (data) {      
      this.setState({ Offices:data});
    }
  })
  Api_getDestinyPSV(datosv3,token).then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {

    console.log(data)
    if (data) {      
      this.setState({ Destiny:data});
    }
  })
  Api_getProviderAdress(token).then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {
    console.log("proveedores")
    console.log(data)
    if (data) {      
      this.setState({ DestinyProveedores:data});
    }
  })
  Api_getallOffices(token).then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {
    console.log("todaslassucursales")
    console.log(data)
    if (data) {      
      this.setState({ DestinyAllsucursales:data});
    }
  })
  Api_getInvoices(datos,token)
      .then(api_handleErrors).then(results => {
        return results.json();
      })
      .then(data => {

        console.log(data)
        if (data) {
          var headermodified = [];
          data.forEach( element => {
            var newobject = element;
            newobject.destino = ""
            newobject.origen = ""
            newobject.cveorigen = ""
            newobject.cvedestino = ""            
            headermodified.push(newobject);
          }
            )
          this.setState({ rows:data,cargando:false,headermodificado:headermodified,
           columns : [
            
            {
              field: "cia",
              headerName: "Compañia"
            },
            {
              field: "invoice",
              headerName: "Factura"
              , width: 150 
            },
            {
                key: "client",
                headerName: "Cliente"
            },
            {
              field: "name",
              headerName: "Nombre"
              , width: 500
              
            },
            {
              field: "address",
              headerName: "Direccion"
               , width: 300 
            },
            {
              field: "programmedDate",
              headerName: "Fecha Programada"
              , width: 200,
              type: 'dateTime',
              valueGetter: ({ value }) => value && moment(value).format('YYYY-MM-DD, h:mm:ss')
          },
          {
            field: "recordType",
            headerName: "TipoRegistro"
            , width: 200 
        },
        {
          field: "",
          headerName : "Origen y Destino",
           width: 300,
           renderCell: (cellValues) => { 
  
             if(cellValues.row.recordType=="Orden Compra"){
              return (                    
                <Button variant="contained" onClick={() => this.openmodalorigen(cellValues)}><MapIcon/>Asignar</Button>                                        
                );
             } 
            else if(cellValues.row.recordType=="Factura"){
              return (                    
                <Button variant="contained" onClick={() => this.openmodalproveedores(cellValues)}><MapIcon/>Asignar</Button>                                        
                );
            }
            else if(cellValues.row.recordType=="Traspaso"){
              return (                    
                <Button variant="contained" onClick={() => this.openmodaltraspasos(cellValues)}><MapIcon/>Asignar</Button>                                        
                );
            }
            
             }
            },
//   {
//     field: "peso",
//     headerName: "Peso"
//     , width: 200,
//     editable  : true 
// }    
        ],columnsv2 : [
          {
            field: "id",
            headerName: "OC"
            , width: 200 
        } ,
          // {
          //   field: "alm",
          //   headerName: "Almacen",
          //   visible : false
          // },
          {
            field: "cantidad",
            editable: true,
            preProcessEditCellProps: (params) => {
              debugger;
              const hasError = this.validatecantidad(params);              
              return { ...params.props, error: hasError };
            }
            // preProcessEditCellProps: (params) => {
            //   const isValid = this.validatecantidad(params.props.value);
            //   return { ...params.props, error: !isValid };
            // },
            // renderCell: (cellValues) => {
            //   return (
            //     <TextField
            //     type="number"
            //     id="outlined-basic"
            //     defaultValue={cellValues.row[0].canti}
            //     label="" variant="outlined" 
            //       onClick={(event) => {
            //         console.log(event, cellValues);
            //       }}
            //     />                  
            //   );
            // }
          },
          {
            field: "cve_art",
            headerName: "Cve. Articulo"
            , width: 200 
        },
      //   {
      //     field: "des",
      //     headerName: "Descripcion"
      //     , width: 200 
      // },
      //     {
      //         key: "cia",
      //         headerName: "Compañia"
      //     },
      //     {
      //       field: "cos_tot",
      //       headerName: "Costo"
            
      //     },
      //     {
      //       field: "cte",
      //       headerName: "Cliente"
      //        , width: 300 
      //     },
    //       {
    //     field: "env_dir",
    //     headerName: "Direccion"
    //     , width: 200 
    // }
    ,{
      field: "fec_ent_pro",
      headerName: "Fecha Programada"
      , width: 200 
  }
// ,{
//   field: "num",
//   headerName: "Numero"
//   , width: 200 ,
//   visible : false
// } 
// ,{
//   field: "par",
//   headerName: "Partida"
//   , width: 200 ,
//   visible : false
// } 
// ,{
//   field: "serie",
//   headerName: "Serie"
//   , width: 200 
// } 
,{
  field: "status",
  headerName: "Estatus"
  , width: 200 
} 
,{
  field: "sub_alm",
  headerName: "Sub Almacen"
  , width: 200 ,
  visible : false
},
    // {
    //   field: "Origen",
    //   width: 250 
    //     },
   
  {
  field: "fraccionarancelaria",
  headerName: "Fraccion Arancelaria"
  , width: 200 ,
  editable  : true,
  preProcessEditCellProps: (params) => {
    debugger;
    const hasError = this.asignafraccion(params);              
    return { ...params.props, error: hasError };
  }
},   
{
field: "Pedimento",
headerName: "pedimento"
, width: 200 ,
editable  : true,
preProcessEditCellProps: (params) => {
  debugger;
  const hasError = this.asignapedimento(params);              
  return { ...params.props, error: hasError };
}
}, 
{
field: "foliofiscal",
headerName: "Folio Fiscal"
, width: 200,
editable  : true,
preProcessEditCellProps: (params) => {
debugger;
const hasError = this.asignafolio(params);              
return { ...params.props, error: hasError };
}
},   

      ],config : {
          page_size: 10,
          length_menu: [10, 20, 50],
          show_filter: true,
          show_pagination: false,
          button: {
              excel: false,
              print: false
          }
        },
      
      });
        }
      })
}

busquedaenter(e){
  if (e.key === 'Enter' || e.keyCode === 13) {
    this.busquedafacturas()
}
}
busquedafacturas(){
  debugger;
  if(this.state.nproveedor != "" && this.state.nproveedor != null){
  debugger;
  var token = Cookies.get('Token');
  var datos =
  {
    provider : this.state.nproveedor
  }
  Api_getproveedores(datos,token)
  .then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {
    debugger;
    if (data.length>0) {
      this.setState({nombre:data[0].nom,email:data[0].mail1,rfc:data[0].rfc});
    }
    else{
      swal("Error"," Num. de Proveedor invalido.","error")
    }
  });
  }
    
}
setSelectionModel(data){
  this.setState({aenviar:data});
  console.log(this.state)
}
setSelectionModelnew(data){
  debugger;
  console.log(data);
}
componentDidMount(){

}
componentDidUpdate(){
 
}
componentWillUnmount() {
  this.setState = (state,callback)=>{
    return;
};
}
cargardetaller(){
  debugger;
  this.setState({loadingdetalle:true});
  var facturas = this.state.aenviar;
  var token = Cookies.get('Token');
  var facturasaenviar = facturas.join();
  var datos = {
    invoice : facturasaenviar
  }
  Api_getinvoicesdetail(datos,token)
  .then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {
    console.log(data)
    if (data) {
      debugger;
      var notoc = data.filter((r) => r.recordType != "Orden Compra").map((r) => r.rowNumber);
     var ocs = data.filter((r) => r.recordType == "Orden Compra").map((r) => r.rowNumber)
     var datamodified = [];
      data.forEach(element => {
        var newobject = element;
        newobject.destino = ""
        newobject.origen = ""
        newobject.cveorigen = ""
        newobject.cvedestino = ""
        //   rowNumber : element.rowNumber,
        //   id: element.id,
        //   cve_art: element.cve_art,
        //   par : element.par,
        //   cantidad: parseInt(element.cantidad),
        //   fraccionarancelaria: element.fraccionarancelaria===undefined?"":element.fraccionarancelaria,
        //   pedimento: element.pedimento===undefined?"":element.pedimento,
        //   folio: element.folio===undefined?"":element.folio,
        //   alm : element.alm===undefined?"":element.alm,
        //   sub_alm: element.sub_alm===undefined?"":element.sub_alm,
        //   origen :element.origen===undefined?"":element.origen,
        //   destino : element.destino===undefined?"":element.destino
        // }
        datamodified.push(newobject);
     });
      this.setState({porenviar:data,detailmodificado:datamodified,seleccionadas:notoc,NOTOCselected:notoc,loadingdetalle:false});
    }});
  }

    render() {
      function MyDataGrid() {
        const [selectionModel, setSelectionModel] = React.useState(() =>
        // seleccionadasv2 = data.filter((r) => r.tipo != "Orden Compra").map((r) => r.rowNumber)
        this.state.porenviar.filter((r) => r.rowNumber).map((r) => r.id),
        );
      }
        return (            
<Paper>
<LoadingScreen loading={this.state.cargando}></LoadingScreen>
    <Titulo titulo="Envio" subtitulo="Externo"></Titulo>
    <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off">
         <TextField
          required
          id="outlined-required"
          label="# Proveedor"
          name="nproveedor"
          onKeyUp={(ev) => {           
            if (ev.key === 'Enter') {
              // Do code here
              this.busquedafacturas()
              ev.preventDefault();
            }
          }}
          value={this.state.nproveedor}
          size="small"
          onChange={this.handleChange}
        />
         <IconButton onClick={() => this.busquedafacturas()} sx={{ p: '20px' }} aria-label="search">
     <SearchIcon />
   </IconButton>

    {/* <TextField
    disabled
          required
          id="outlined-required"
          label="Nombre"
          value={this.state.nombre}
          variant="filled"
          size="small"
        /> */}
        <TextField
          required
          id="outlined-required"
          label="Email Registrado"
          name="email"
          type='email'
          size="small"
          onChange={this.handleChange}
          value={this.state.email}
        />
               <TextField
               disabled
          required
          id="outlined-required"
          label="RFC Registrado"
          size="small"
          value={this.state.rfc}
        />
            <TextField               
          required
          id="outlined-required"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          label="peso"
          name="peso"
          size="small"
          onChange={this.handleChange}
          value={this.state.peso}
        />
    </Box>
    <Box>
      {/* tabla a fillear  */}
      <Titulo titulo="Listado de facturas"></Titulo>
      <Toolbar
      sx={{
        pl: { sm: 2 },
        
        pr: { xs: 1, sm: 1 },
        ...(1 > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      align="right"
    >
     <Stack direction="row" spacing={2}>
      <Button disabled={this.state.aenviar!="" && this.state.aenviar != null?false:true} variant="outlined" startIcon={<PlaylistAddIcon />} onClick={() => this.cargardetaller()}>
        Agregar al detalle
      </Button>
      <Button variant="outlined" startIcon={<PlaylistAddIcon />} onClick={() => this.openmodal()}>
        Buscar factura
      </Button>
</Stack>
    </Toolbar>
      <DataGrid
        
        rows={this.state.rows}
        columns={this.state.columns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(r) => r.invoice}        
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={
          itm => this.setSelectionModel(itm)
        }                
       
      />
      {/* <DataTable selectableRows  columns={columns} data={rows} pagination click={clickhandler}></DataTable> */}

{/* fin de tabla a fillear */}
    </Box>
    <Box>
    <Titulo titulo="Registros a enviar"></Titulo>
    {/* tabla que contendra a enviar  */}
    <DataGrid
        loading={this.state.loadingdetalle}
        rows={this.state.detailmodificado}
        columns={this.state.columnsv2}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(r) => r.rowNumber}
        checkboxSelection
        //  onCellEditCommit={(params) => this.validatecantidad(params)}
        selectionModel={this.state.seleccionadas}
        isRowSelectable={(params) => params.row.recordType == "Orden Compra"}
        isCellEditable={(params) => params.row.recordType === "Orden Compra"}
        disableSelectionOnClick 
        onSelectionModelChange={(ids) => {
          console.log(this.state.seleccionadas)
          debugger;
          console.log(ids);
          const selectedIDs = new Set(ids);
          var originales = this.state.porenviar.filter((r) => r.recordType != "Orden Compra").map((r) => r.rowNumber)
          const selectedRowData = this.state.porenviar.filter((row) =>
            selectedIDs.has(row.rowNumber.toString())
            );          
          this.setState({seleccionadas:ids})
        }}
       
      />
    
    </Box>
    <Box>
    <Stack direction="row" spacing={4}>
      <Button variant="contained" endIcon={<EmailIcon />} onClick={()=>this.enviardatos()}>
        Enviar
      </Button>
    </Stack>

    </Box>
     {/* // MODAL */}
  <Modal
  keepMounted
  open={this.state.modalabierta}
  onClose={()=>this.handleClose()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description"
>
  <Paper>
  <Box sx={stylev2}>
    <Typography id="keep-mounted-modal-titlex" variant="h6" component="h2">
    Buscar Factura anterior
     
    </Typography>
    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
    <TextField id="foliobusqueda" name="foliobusqueda"  onChange={this.handleChange} value={this.state.foliobusqueda} label="N° de registro" variant="outlined" /> <IconButton onClick={()=>this.buscafactura()} aria-label="delete" size="small">
  <SearchIcon fontSize="inherit" />Buscar
</IconButton>
    </Typography>
  </Box>
  </Paper>
</Modal>
{/* modal de origen y destino */}
<Modal  
  open={this.state.modalabiertaorigen}
  onClose={()=>this.openmodalorigen()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description">
  <Paper>
  <Box sx={stylev3}>
    <Typography id="keep-mounted-modal-titlex" variant="h6" component="h2">
    Asignar Origen y Destino
     
    </Typography>
    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
    <Autocomplete
                        
                        disableClearable
                        id="Origen"
                        name="Origen"
                        value={this.state.origenseteado}
                        options={this.state.Destiny}
                        getOptionLabel={option => option.dir || ""}                        
                        // getOptionSelected={(option, value) => option.name === value.name}
                        onChange={(event, value) => this.seteaoficinea(this.state.valores,value)}
                        // defaultvalue={this.state.Destiny.find(v => v[0])} 
                        sx={{ width: 630 }}
                        renderInput={(params) => <TextField  {...params} label={"Origen"} />}
                          />  
                 <br/>             
                          <br/>

                            <Autocomplete
                      disableClearable
            id="Destino"
            name="Destino"
            value={this.state.destinoseteado}
            options={this.state.Offices}
            getOptionLabel={option => option.des || ""}
            onChange={(event, value) => this.seteadestino(this.state.valores,value)}
            // defaultvalue={this.state.Clientes.find(v => v.des[0])} 
            sx={{ width: 630 }}
            renderInput={(params) => <TextField  {...params} label={"Destino"} />}
              />
                       
          
    <IconButton onClick={()=>this.openmodalorigen()} aria-label="delete" size="small">
  <SearchIcon fontSize="inherit" />Cerrar
</IconButton>
    </Typography>
  </Box>
  </Paper>
</Modal>
{/* modal para Proveedores */}
<Modal  
  open={this.state.modalabiertaproveedores}
  onClose={()=>this.openmodalproveedores()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description"
>
  <Paper>
  <Box sx={stylev3}>
    <Typography id="keep-mounted-modal-titlex" variant="h6" component="h2">
    Asignar Origen y Destino
     
    </Typography>
    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
    <Autocomplete
                      disableClearable
            id="Origen"
            name="Origen"
            value={this.state.origenseteado}
            options={this.state.Offices}
            getOptionLabel={option => option.des || ""}
            onChange={(event, value) => this.seteaoficinea(this.state.valores,value)}
            // defaultvalue={this.state.Clientes.find(v => v.des[0])} 
            sx={{ width: 630 }}
            renderInput={(params) => <TextField  {...params} label={"Origen"} />}
              />
                 <br/>             
                          <br/>
    <Autocomplete
                        
                        disableClearable
                        id="Destino"
                        name="Destino"
                        value={this.state.destinoseteado}
                        options={this.state.DestinyProveedores}
                        getOptionLabel={option => option.dir || ""}                        
                        // getOptionSelected={(option, value) => option.name === value.name}
                        onChange={(event, value) => this.seteadestino(this.state.valores,value)}
                        // defaultvalue={this.state.Destiny.find(v => v[0])} 
                        sx={{ width: 630 }}
                        renderInput={(params) => <TextField  {...params} label={"Destino"} />}
                          />  
                       
          
    <IconButton onClick={()=>this.openmodalorigen()} aria-label="delete" size="small">
  <SearchIcon fontSize="inherit" />Cerrar
</IconButton>
    </Typography>
  </Box>
  </Paper>
</Modal>
{/* Modal para traspasos */}
<Modal  
  open={this.state.modalabiertatraspasos}
  onClose={()=>this.openmodaltraspasos()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description"
>
  <Paper>
  <Box sx={stylev3}>
    <Typography id="keep-mounted-modal-titlex" variant="h6" component="h2">
    Asignar Origen y Destino
     
    </Typography>
    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
    <Autocomplete
                      disableClearable
            id="Origen"
            name="Origen"
            value={this.state.origenseteado}
            options={this.state.Offices}
            getOptionLabel={option => option.des || ""}
            onChange={(event, value) => this.seteaoficinea(this.state.valores,value)}
            // defaultvalue={this.state.Clientes.find(v => v.des[0])} 
            sx={{ width: 630 }}
            renderInput={(params) => <TextField  {...params} label={"Origen"} />}
              />
                 <br/>             
                          <br/>
    <Autocomplete
                        
                        disableClearable
                        id="Destino"
                        name="Destino"
                        value={this.state.destinoseteado}
                        options={this.state.DestinyAllsucursales}
                        getOptionLabel={option => option.dir || ""}                        
                        // getOptionSelected={(option, value) => option.name === value.name}
                        onChange={(event, value) => this.seteadestino(this.state.valores,value)}
                        // defaultvalue={this.state.Destiny.find(v => v[0])} 
                        sx={{ width: 630 }}
                        renderInput={(params) => <TextField  {...params} label={"Destino"} />}
                          />  
                       
          
    <IconButton onClick={()=>this.openmodalorigen()} aria-label="delete" size="small">
  <SearchIcon fontSize="inherit" />Cerrar
</IconButton>
    </Typography>
  </Box>
  </Paper>
</Modal>
</Paper>  )              
          }
}
export default EnvioExterno;
