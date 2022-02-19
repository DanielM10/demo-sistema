import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { TablePagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Titulo from './Titulos';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import LoadingScreen from './LoadingScreen'
import swal from 'sweetalert'
import {Api_reporteexterno,api_handleErrors,Api_getinvoicesdetail,Api_SendMailExterno} from './Api';
import Cookies from 'js-cookie'
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// const style = {
//     position: 'absolute',
//     // top: '50%',
//     // left: '50%',
//     // transform: 'translate(-50%, -50%)',
//     // width: 800,
//     bgcolor: 'background.paper',
//     // border: '2px solid #000',
//     // boxShadow: 24,
//     // p: 4,
//   };
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
class ReporteEnviosExternos extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false,
        loading : true,
        datos : [],
        finicio : "",
        ffin : "",
        details : [],
        columnsdetail : [],
        folioenvio : ""
        
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleChangefinicio = this.handleChangefinicio.bind(this);
      this.handleChangeffin = this.handleChangeffin.bind(this);
      this.handlemodal = this.handlemodal.bind(this);
    }
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    handlemodal(){
        if(this.state.modalopen){
            this.setState({modalopen:false})
        }
        else{
            this.setState({modalopen:true})
        }
    }
    handleChange(event) {
        debugger;
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
      }   
      handleChangefinicio(event) {
        debugger;
        this.setState({ finicio: event });
        console.log(this.state);
    
      }
      handleChangeffin(event) {
        debugger;
        this.setState({ ffin: event });
        console.log(this.state);
    
      }
componentDidMount(){
  this.setState({loading:false});
}
muestradetalle(data){
    data.lstProduct.forEach(element => {
        element.id = Math.random();
    });
    this.setState({modalopen:true,details:data.lstProduct})
}
busqueda(){
    if(this.state.finicio == "" && this.state.folioenvio == "")
    {
        swal("Error","Debes seleccionar una fecha de inicio","error")
    }
    if(this.state.ffin == "" && this.state.folioenvio == "")
    {
        swal("Error","Debes seleccionar una fecha de fin","error")
    }
     if(this.state.finicio != "" && this.state.ffin != "" || this.state.folioenvio != ""){
         this.setState({loading:true})
    var token = Cookies.get('Token');
    var datos = {
        id: null,
        rfcSource: null,
        rfcReceive: null,
        startDate: this.state.finicio ==""?null:this.state.finicio,
        endDate: this.state.ffin == ""? null:this.state.ffin,
        user: null,
        folio : this.state.folioenvio == "" ? null : this.state.folioenvio
    }
    }
   
}
UNSAFE_componentWillMount(){
    debugger;
   
    var token = Cookies.get('Token');
    var datos = {
        id: null,
        rfcSource: null,
        rfcReceive: null,
        startDate: null,
        endDate: null,
        user: null,
        folio : null
    }
    Api_reporteexterno(datos,token)
    .then(api_handleErrors).then(results => {
      return results.json();
    })
    .then(data => {
      debugger;
      console.log(data)
      if (data) {       
          data.forEach(element => {
             element.id = Math.random() 
          });
          debugger;
        this.setState({datos:data,columnas:[
          {
            field: "folio",
            headerName: "Folio:"
            , width: 200 
          },

            {
                field: "createBy",
                headerName: "Solicitó:"
                , width: 200 
            } ,
            {
                field: "createDate",
                headerName: "Fecha Solicitud"
                ,
                width : 150,
                type: 'dateTime',
              valueGetter: ({ value }) => value && moment(value).format('YYYY-MM-DD, h:mm:ss')
            } ,
            {
                field: "emailTo",
                headerName: "Email Cliente"
                , width: 200 
            } ,
            {
                field: "kg",
                headerName: "Peso"               
            } ,
            {
                field: "rfcReceiver",
                headerName: "RFC Cliente"
                , width: 150 
            } ,
            {
                field: "rfcSource",
                headerName: "RFC"
                , width: 150 
            } ,{
                field: "Detalle",
         renderCell: (cellValues) => {
              return (
                <Button
                type="number"
                id="outlined-basic"
                variant="contained"
                  onClick={(event) => {
                      debugger;
                    this.muestradetalle(cellValues.row)
                  }}
                >Detalle</Button>               
              );
            }
        }
        ],columnsdetail : [
            {
                field: "productKey",
                headerName: "Peso"
                
            } ,
            {
                field: "quantity",
                headerName: "Cantidad"
                
            } ,
            {
                field: "currency",
                headerName: "Moneda"
                
            },
            {
                field: "driveKey",
                headerName: "Cve. Unidad"
                
            } ,
            {
                field: "weightUnitKey",
                headerName: "Unidad de medida"
                
            } ,
            {
                field: "keyDangerousMaterial",
                headerName: "Cve. Material Peligroso"
               
            },
            {
                field: "merchandiseValue",
                headerName: "Valor"
               
            } ,
            {
                field: "packingKey",
                headerName: "Cve. Embalaje"
               
            } ,
            {
                field: "petition",
                headerName: "Pedimento"
               
            },
            {
                field: "tariffFraction",
                headerName: "Fraccion arancelaria"
                
            } ,
            {
                field: "uuid",
                headerName: "UUID"
                
            },
            {
              field : "origin",
              headerName : "Origen"
            },
            {field: "destiny",
          headerName : "Destino"}
             
        ]
        ,loading:false});
      }});
}
componentDidUpdate(){
  
}


    render() {
        return (
  <Paper>
      <LoadingScreen loading={this.state.loading}></LoadingScreen>
                <Titulo titulo = "Programación" subtitulo="Embarques"></Titulo>
                <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DatePicker
              label="Fecha Inicio"
              value={this.state.finicio}
              name="finicio"
              id="finicio"
              onChange={this.handleChangefinicio}
              renderInput={(params) => <TextField {...params} />}
            />
             <DatePicker
              label="Fecha Fin"
              value={this.state.ffin}
              name="ffin"
              id="ffin"
              onChange={this.handleChangeffin}
              renderInput={(params) => <TextField {...params} />}
            />           
             <TextField
          required
          id="outlined-required"
          label="Folio Envio"
          name="folioenvio"          
          onChange={this.handleChange}
          value={this.state.folioenvio}
        />
             </LocalizationProvider>               
              <Button variant="contained" onClick={() => this.busqueda()} startIcon={<SearchIcon />}>
          Consultar
      </Button>
      </Box>
      <br/>
      <br/>
      <Box>
      <DataGrid        
        rows={this.state.datos}
        columns={this.state.columnas}
        pageSize={9}
        rowsPerPageOptions={[9]} 
        getRowId={(row) => row.id}
        disableSelectionOnClick                      
      />
      {/* <DataGrid        
        rows={this.state.details}
        columns={this.state.columnsdetail}
        pageSize={9}
        getRowId={(r) => r.id} 
        rowsPerPageOptions={[9]}         
        disableSelectionOnClick                  
       
      /> */}
          {/* separador */}
       </Box>
             {/* // MODAL */}
  <Modal
  keepMounted
  open={this.state.modalopen}
  onClose={()=>this.handlemodal()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description"
>
  {/* <Box sx={{backgroundColor : '#FFF'}}> */}
   
    {/* <Typography id="keep-mounted-modal-description" sx={{ mt: 2 ,backgroundColor : "#fff"}}> */}
        <Paper sx={{ height: '80%', width: '80%',    position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',backgroundColor:'#fff'}}>
        <Typography id="keep-mounted-modal-title" variant="h4" component="h4" align='center'>
    Detalle Envio Externo
     
    </Typography>
   <DataGrid        
        rows={this.state.details}
        columns={this.state.columnsdetail}
        pageSize={10}
        getRowId={(r) => r.id} 
        rowsPerPageOptions={[10]}         
        disableSelectionOnClick                  
       className='tablanaranja'
      />
          </Paper>
    {/* </Typography> */}
    {/* <DataGrid        
        rows={this.state.details}
        columns={this.state.columnsdetail}
        pageSize={9}
        getRowId={(r) => r.id} 
        rowsPerPageOptions={[9]}         
        disableSelectionOnClick                  
       
      /> */}
    {/* <Button variant="contained" endIcon={<CloseIcon />} onClick={this.handlemodal}></Button> */}
  {/* </Box> */}
</Modal>

        </Paper>

  )              
          }
}
export default ReporteEnviosExternos;
