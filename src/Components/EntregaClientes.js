import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Titulo from './Titulos'
import { IconButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import swal from 'sweetalert';
import LoadingScreen from './LoadingScreen'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Slider } from '@mui/material';
import RouteIcon from '@mui/icons-material/Route';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
const marks = [
    {
      value: 0,
      label: '0%',
    },
    {
      value: 20,
      label: '20%',
    },
    {
      value: 40,
      label: '40%',
    },
    {
        value: 60,
        label: '60%',
      },
      {
        value: 80,
        label: '80%',
      },
    {
      value: 100,
      label: '100%',
    },
  ];
  function valuetext(value) {
    return `${value}%`;
  }
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const stylev2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FD4F00",
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
class EntregaClientes extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false,
        cargando : false,
        modalabierta : false,
        numembarque : "",
        kilometrajeinicial : "",
        tanquegasolina : 0,
        detalleembarque : [],        
        modaldetalle : false,
      }
      this.handleChange = this.handleChange.bind(this);
    }
   UNSAFE_componentWillMount(){
    var data  = [
        {
        Compania : "PSV",
        Sucursal : "Miguel Aleman",
        FolioEmbarque : "820173-12",
        Fecha : "2021-12-06",
        Detalle : [
            {
                folioguia : "98127123-2",
                factura : "fh82173",
                cvecliente : "1236",
                cliente : "cliente 1",
                direccion : "calle #123 c.p. 9123",
                numenvio : "1"
            },
            {
                folioguia : "10293021-1",
                factura : "as81273",
                cvecliente : "456",
                cliente : "cliente 2",
                direccion : "calle #2 c.p. 621535",
                numenvio : "2"
            },
            {
                folioguia : "1209382-2",
                factura : "as1239",
                cvecliente : "789",
                cliente : "cliente 3",
                direccion : "av. miguel aleman # 1000 c.p. 19212",
                numenvio : "3"
            }
        ]
    },
   
        {
            Compania : "PSV",
            Sucursal : "Miguel Aleman",
            FolioEmbarque : "81297312-2",
            Fecha : "2021-12-08",
        Detalle : [
            ]
    },
    {
        Compania : "PSV",
        Sucursal : "Miguel Aleman",
        FolioEmbarque : "1230182-3",
        Fecha : "2021-12-07",        
    Detalle : []
}
    ]         
  this.setState({cargando:false,rows:data});
   }
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    busquedafacturas(){
       
    }
    iniciaruta(){
        if(this.state.numembarque == "" || this.state.kilometrajeinicial == ""){
            swal("Advertencia", "Debe llenar todos los datos.", "warning")
        }
        else{
        swal("Embarque Generado", "El Embarque :"+ this.state.numembarque + " fue iniciado", "success")
        this.openmodal2();
        }
    }
    openmodaldetalle(detalle){
        debugger;
        if(!this.state.modaldetalle && detalle.length>0){
            this.setState({ modaldetalle: true,detalleembarque : detalle});
          }
          else{
              this.setState({ modaldetalle: false,detalleembarque : []});
          }
    }
    mensajeok(dato){
        swal("Entregado","Guia # "+dato+" Entregada","success")
    }
    openmodal2(){
      
        debugger;
        if(this.state.modalabierta && this.state.numembarque != ""){
          this.setState({ modalabierta: false,numembarque: "",kilometrajeinicial : "",tanquegasolina : 0});
        }
        if(this.state.modalabierta && this.state.numembarque == ""){
            this.setState({ modalabierta: false});
        }
       else{
        this.setState({ modalabierta: true});
       }         
      }

      handleChange(event) {
        debugger;
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    
      }


    render() {
        return (
            <Paper
            component="form"
            
          >
              <LoadingScreen loading={this.state.cargando}></LoadingScreen>
              <Titulo titulo="Entregas" subtitulo="Cliente"></Titulo>         
         
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 600 }} aria-label="customized table">
                 <TableHead>
                   <TableRow>
                   <StyledTableCell align="right">Cia</StyledTableCell>
                     <StyledTableCell align="right">Sucursal</StyledTableCell>
                     <StyledTableCell align="right">Folio de Embarque</StyledTableCell>
                     <StyledTableCell align="right">Fecha</StyledTableCell>
                     <StyledTableCell align="left">Accion</StyledTableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {this.state.rows.map((row) => (
                     <StyledTableRow key={row.name}>
                         <StyledTableCell align="right">{row.Compania}</StyledTableCell>
                       <StyledTableCell align="right">{row.Sucursal}</StyledTableCell>
                       <StyledTableCell align="right">{row.FolioEmbarque}</StyledTableCell>
                       <StyledTableCell align="right">{row.Fecha}</StyledTableCell>                       
                       <StyledTableCell align="left"> {row.Detalle.length>0?<IconButton onClick={() =>this.openmodaldetalle(row.Detalle)} aria-label="delete">
                       <ImportContactsIcon sx={{ 'color': {color : '#010B36'}}}/> Ver detalle
         </IconButton>:<IconButton onClick={() =>this.openmodal2(row.Detalle)} aria-label="delete">
         <RouteIcon sx={{ 'color': {color : '#010B36'}}}/> Iniciar ruta
         </IconButton>} 
         
           </StyledTableCell>
         
                     </StyledTableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
             {/* modal iniciar ruta */}
             <Modal
           keepMounted
           open={this.state.modalabierta}
           onClose={()=>this.openmodal2()}
           aria-labelledby="keep-mounted-modal-title"
           aria-describedby="keep-mounted-modal-description"
         >
           <Box sx={style}>
             <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
             <h3>Factura: <strong>{this.state.detallefactura}</strong></h3> 
              
             </Typography>
             <TextField id="numembarque" name="numembarque"  onChange={this.handleChange} value={this.state.numembarque} label="N° Embarque" variant="outlined" /> <IconButton onClick={()=>this.updateruta()} aria-label="delete" size="small"></IconButton>
             <br/>
             <br/>
             <TextField id="kilometrajeinicial"  name="kilometrajeinicial"  onChange={this.handleChange} value={this.state.kilometrajeinicial} label="Fin del viaje" variant="outlined" /> <IconButton onClick={()=>this.updateruta()} aria-label="delete" size="small"></IconButton>
             <br/>
             <br/>
             <Box sx={{ flexGrow: 1 }}>

             <Box sx={{ width: 300 }}>
                 Tanque Gasolina
      <Slider
        aria-label="Tanque Gasolina"
        defaultValue={20}
        getAriaValueText={valuetext}
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
               </Box>
         
             <Button variant="contained" onClick={() => this.iniciaruta()}>Guardar</Button><Button variant="contained" onClick={()=> this.openmodal2()}>cerrar</Button>
           </Box>
         </Modal>
          {/* modal Detalle */}
          <Modal
           keepMounted
           open={this.state.modaldetalle}
           onClose={()=>this.openmodaldetalle()}
           aria-labelledby="keep-mounted-modal-title"
           aria-describedby="keep-mounted-modal-description"
         >
           <Box sx={stylev2}>
             <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
             <h3>Facturas por entregar: <strong></strong></h3>               
             </Typography>
            {/* tabla de facturas por entregar */}
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 600 }} aria-label="customized table">
                 <TableHead>
                   <TableRow>
                   <StyledTableCell align="right">Folio Guia</StyledTableCell>
                     <StyledTableCell align="right">Factura</StyledTableCell>
                     <StyledTableCell align="right">Cve Cliente</StyledTableCell>
                     <StyledTableCell align="right">Cliente</StyledTableCell>
                     <StyledTableCell align="right">Direccion</StyledTableCell>
                     <StyledTableCell align="right">N° Envio</StyledTableCell>
                     <StyledTableCell align="left"></StyledTableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   {this.state.detalleembarque.map((row) => (
                     <StyledTableRow key={row.name}>
                         <StyledTableCell align="right">{row.folioguia}</StyledTableCell>
                       <StyledTableCell align="right">{row.factura}</StyledTableCell>
                       <StyledTableCell align="right">{row.cvecliente}</StyledTableCell>
                       <StyledTableCell align="right">{row.cliente}</StyledTableCell>
                       <StyledTableCell align="right">{row.direccion}</StyledTableCell>                       
                       <StyledTableCell align="right">{row.numenvio}</StyledTableCell>                       
                       <StyledTableCell align="left"> <IconButton onClick={() =>this.mensajeok(row.folioguia)} aria-label="delete"><MarkunreadMailboxIcon sx={{ 'color': {color : '#010B36'}}}/>Entregar</IconButton>         </StyledTableCell>         
                     </StyledTableRow>
                   ))}
                 </TableBody>
               </Table>
             </TableContainer>
         {/* fin de tabla de facturas pro entregar  */}
            <Button variant="contained" onClick={()=> this.openmodaldetalle()}>cerrar</Button>
           </Box>
         </Modal>
          </Paper>
  )              
          }
}
export default EntregaClientes;
