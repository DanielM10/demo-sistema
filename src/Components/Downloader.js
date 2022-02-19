import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert'
import Cookies from 'js-cookie';
import {Api_getInvoices,Api_getproveedores,api_handleErrors,Api_downloadfile} from './Api';
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
class Downloader extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false
      }
    }
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    
componentDidMount(){
    var token = Cookies.get('Token');
  var datos =
  {
    fileName : this.props.idarchivo
  }
  swal("Procesando","Tu archivo sera descargado en breve","success") ; 
  debugger;
  try{
  Api_downloadfile(datos,token)
  .then(api_handleErrors).then(results => {
    return results.json();
  })
  .then(data => {
    debugger;
    console.log(data)
    if (data) {
 
            var downloadLink = document.createElement("a");
            var tipo ="data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"+data
         downloadLink.href = tipo;
downloadLink.download = this.props.idarchivo+".xlsx";
downloadLink.click();
downloadLink.href = "";  
window.location.href("https://fultra.mx/");          
            }                   
  }).catch( error => console.log(error)  );
}
  catch(error){
    swal("Error","No se pudo descargar el archivo,favor de contactar a sistemas.","error")
   }
}



    render() {
        return (
  <div></div>
  )              
          }
}
export default Downloader;
