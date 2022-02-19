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
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import swal from 'sweetalert';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddCommentIcon from '@mui/icons-material/AddComment';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoadingScreen from './LoadingScreen'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

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
class EntregasMostrador extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false,
        cargando : false,
        modalabierta : false,
        detallefactura : "",
        detalleentrega : "",
        detallerecibe : "",
        detalleincidencia : "",
        detallecomentarios: ""
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    busquedafacturas(){
        this.setState({ cargando:true});
        var delayInMilliseconds = 2000; 
        setTimeout(function() { //Start the timer
            var data  = [
                {Factura : "192038-1",
                Compania : "PSV",
                Sucursal : "Miguel Aleman",
                Cliente : "Cliente juan perez",
                Monto : "100000",
                Detalle : []
            },
           
                {Factura : "1239812-3",
                Compania : "PMR",
                Sucursal : "Miguel Aleman",
                Cliente : "Cliente daniel morgado",
                Monto : "100000",
                Detalle : [{
                    factura :"1239812-3",
                    entrega : "repartidor 1",
                    recibe : "cliente 1",
                    incidencia : "20",
                    comentarios : "Ejmplo de comentario"

                }]
            },
            {Factura : "112309-2",
            Compania : "PMR",
            Sucursal : "Guadalajara",
            Cliente : "joaquin hernandez",
            Monto : "1923",
            Detalle : [{
                factura :"1239812-3",
                entrega : "repartidor 1",
                recibe : "cliente 1",
                incidencia : "20",
                comentarios : "Ejmplo de comentario"
            }
            ]
        }
            ]         
          this.setState({cargando:false,rows:data}); //After 1 second, set render to true
      }.bind(this), 2000)      
    }
    openmodal2(detalle){
      
        debugger;
        if(this.state.modalabierta && this.state.detallefactura != "" || detalle===undefined){
          this.setState({ modalabierta: false,detallefactura :"",detalleentrega : "", detallerecibe : "", detalleincidencia:"",detallecomentarios : ""});
        }
        if(this.state.modalabierta && this.state.detallefactura=="")
        {
            this.setState({ modalabierta: false});
        }        
        if(!this.state.modalabierta && this.state.detallefactura =="" && detalle.length>0){
            this.setState({ modalabierta: true,nuevoregistro : true,detallefactura :detalle[0].factura,detalleentrega : detalle[0].entrega, detallerecibe : detalle[0].recibe, detalleincidencia:detalle[0].incidencia,detallecomentarios : detalle[0].comentarios});
        }
        if(!this.state.modalabierta && this.state.detallefactura =="" && detalle.length===0){
          this.setState({ modalabierta: true,nuevoregistro : false});
        }
      }

      handleChange(event) {
        debugger;
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    
      }
componentDidMount(){
  
}
componentDidUpdate(){
   console.log(this.state);
}


    render() {
        return (
   <Paper
   component="form"
   
 >
     <LoadingScreen loading={this.state.cargando}></LoadingScreen>
     <Titulo titulo="Entregas" subtitulo="Mostrador"></Titulo>

   <InputBase
     sx={{ ml: 1, flex: 1 }}
     placeholder="Buscar Facturas"
    
   />
   <IconButton onClick={() => this.busquedafacturas()} sx={{ p: '10px' }} aria-label="search">
     <SearchIcon />
   </IconButton>
   <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
   <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="right">Factura</StyledTableCell>
            <StyledTableCell align="right">Compañia</StyledTableCell>
            <StyledTableCell align="right">Sucursal</StyledTableCell>
            <StyledTableCell align="right">Cliente</StyledTableCell>
            <StyledTableCell align="right">Monto</StyledTableCell>
            <StyledTableCell align="left">Detalle</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{row.Factura}</StyledTableCell>
              <StyledTableCell align="right">{row.Compania}</StyledTableCell>
              <StyledTableCell align="right">{row.Sucursal}</StyledTableCell>
              <StyledTableCell align="right">{row.Cliente}</StyledTableCell>
              <StyledTableCell align="right">{row.Monto}</StyledTableCell>
              <StyledTableCell align="left"> {row.Detalle.length>0?<IconButton onClick={() =>this.openmodal2(row.Detalle)} aria-label="delete">
              <RemoveRedEyeIcon sx={{ 'color': {color : '#010B36'}}}/> Ver detalle
</IconButton>:<IconButton onClick={() =>this.openmodal2(row.Detalle)} aria-label="delete">
<AddCommentIcon sx={{ 'color': {color : '#010B36'}}}/> Añadir detalle
</IconButton>} 

  </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* modal */}
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
    <TextField id="FolioBusqueda" disabled={this.state.nuevoregistro} name="detalleentrega"  onChange={this.handleChange} value={this.state.detalleentrega} label="Entrega" variant="outlined" /> <IconButton onClick={()=>this.updateruta()} aria-label="delete" size="small"></IconButton>
    <br/>
    <br/>
    <TextField id="FolioBusqueda" disabled={this.state.nuevoregistro} name="detallerecibe"  onChange={this.handleChange} value={this.state.detallerecibe} label="Recibe" variant="outlined" /> <IconButton onClick={()=>this.updateruta()} aria-label="delete" size="small"></IconButton>
    <br/>
    <br/>
    <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Incidencias</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="sucursal"
          name="detalleincidencia"
          value={this.state.detalleincidencia}
          label="Suc. Sierra Norte"
          onChange={this.handleChange}
          disabled={this.state.nuevoregistro}
        >

          <MenuItem value={"0"}>Sin Incidencias</MenuItem>
          <MenuItem value={"0"}>Incidencia A</MenuItem>
          <MenuItem value={"20"}>Incidencia B</MenuItem>      
        </Select>
           
 
      </FormControl>
  
      </Box>
      <br/>
    <TextField disabled={this.state.nuevoregistro} id="FolioBusqueda" name="detallecomentarios"  onChange={this.handleChange} value={this.state.detallecomentarios} label="Comentarios" variant="outlined" /> <IconButton onClick={()=>this.updateruta()} aria-label="delete" size="small"></IconButton>
    <br/>    
    <br/>

    <Button disabled={this.state.nuevoregistro} variant="contained" hidden={this.state.nuevoregistro}>Entrega</Button><Button variant="contained" hidden={this.state.nuevoregistro}>Rechazo</Button>
  </Box>
</Modal>
 </Paper>
  )              
          }
}
export default EntregasMostrador;
