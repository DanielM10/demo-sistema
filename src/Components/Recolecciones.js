
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Titulo from './Titulos';
import { Box } from '@mui/system';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';
import { IconButton } from '@mui/material';
import { Select } from '@mui/material';
import { InputLabel } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import swal from 'sweetalert'
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
class Recolecciones extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false,
        sucursal : "0",
        sucursalpmr : "0",
        nombre : "",
        apellidos : "",
        correo : "",
        tiporecoleccion : "0",
        descripcion : "",
        fecharecoleccion : "",
        tipoprogramacion : "0",
        NombreRecoleccion : "",
        CalleRecoleccion : "",
        ColoniaRecoleccion : "",
        CiudadRecoleccion : "",
        EstadoRecoleccion : "",
        CPRecoleccion : "",
        archivoadjunto : "",
        recoleccioncreada : ""
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleChangefinicio = this.handleChangefinicio.bind(this);
      this.nuevarecoleccion = this.nuevarecoleccion.bind(this);
    }
    handleChangefinicio(event) {
      debugger;
      this.setState({ fecharecoleccion: event });
      console.log(this.state);
  
    }
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    handleChange(event) {
        debugger;
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    
      }
      Generarecoleccion(){
        var errores = []
        debugger;
        if(this.state.sucursal==="0"){
         errores.push("Sucursal");
        }
        if(this.state.sucursalpmr==="0"){
          errores.push("Sucursal Promare");
        }
        if(this.state.nombre===""){
          errores.push("Nombre");
        }
        if(this.state.apellidos===""){
          errores.push("Apellidos");
        }
        if(this.state.correo===""){
          errores.push("Correo");
        }
        if(this.state.tiporecoleccion==="0"){
          errores.push("Tipo de recoleccion");
        }
        if(this.state.descripcion===""){
          errores.push("Descripcion");
        }
        if(this.state.fecharecoleccion===""){
          errores.push("Fecha de recoleccion");
        }
        if(this.state.tipoprogramacion==="0"){
          errores.push("Tipo Programacion");
        }
        if(this.state.NombreRecoleccion===""){
          errores.push("Nombre del lugar");
        }
        if(this.state.CalleRecoleccion===""){
          errores.push("Calle");
        }
        if(this.state.ColoniaRecoleccion===""){
          errores.push("Colonia");
        }
        if(this.state.CiudadRecoleccion===""){
          errores.push("Ciudad");
        }
        if(this.state.EstadoRecoleccion===""){
          errores.push("Estado");
        }
        if(this.state.CPRecoleccion===""){
          errores.push("C.P.");
        }
        //
        if(this.state.archivoadjunto===""){
          errores.push("Archivo adjunto");
        }
        if(errores.length>0){
          var myhtml = document.createElement("div");
          var alertas = " ";
          alertas = "<strong>Debes llenar los siguientes campos:</strong>"
          errores.map(element => {
            alertas = alertas + "<li align='left'>"+element +"</li>"           
          });         
          myhtml.innerHTML = alertas;
          swal({
            title: "Error",
            content: myhtml,
            icon: "error",
            buttons: true,
            dangerMode: true,
           })
        }
        if(errores.length===0){
          this.nuevarecoleccion()
        }
        //
       
      }
      nuevarecoleccion(){
        swal("Exito", "Recoleccion"+this.state.recoleccioncreada +"creada con exito.", "success",).then(
          this.setState({
            sucursal : "0",
          sucursalpmr : "0",
          nombre : "",
          apellidos : "",
          correo : "",
          tiporecoleccion : "0",
          descripcion : "",
          fecharecoleccion : "",
          tipoprogramacion : "0",
          NombreRecoleccion : "",
          CalleRecoleccion : "",
          ColoniaRecoleccion : "",
          CiudadRecoleccion : "",
          EstadoRecoleccion : "",
          CPRecoleccion : "",
          archivoadjunto : "",
          recoleccioncreada : ""
          })
        );
      
      }
componentDidMount(){

}
componentDidUpdate(){
    console.log("hijo actualizado")
    console.log(this.state)
   
}


    render() {
        return (
<Paper>
    <Titulo titulo="Recolección"></Titulo>
    {/* sn */}
    <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Suc. Sierra Norte</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="sucursal"
          name="sucursal"
          value={this.state.sucursal}
          label="Suc. Sierra Norte"
          onChange={this.handleChange}
        >
          <MenuItem value={"0"}>Selecciona una sucursal</MenuItem>
          <MenuItem value={"10"}>SN1- SIERRA NORTE</MenuItem>
          <MenuItem value={"20"}>SN2- SIERRA NORTE</MenuItem>
          <MenuItem value={"30"}>SN3- SIERRA NORTE</MenuItem>
        </Select>
           
        {/* <IconButton onClick={()=>this.openmodal2()} aria-label="delete" size="small">
  <AddBusinessIcon fontSize="inherit" />
</IconButton> */}
      </FormControl>
  
      </Box>
      <br/>
      {/* pmr */}
       <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Suc. Promare</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="sucursalpmr"
          value={this.state.sucursalpmr}
          label="Suc. Promare"
          onChange={this.handleChange}
        >
          <MenuItem value={"0"}>Selecciona una sucursal</MenuItem>
          <MenuItem value={"10"}>PMR1</MenuItem>
          <MenuItem value={"20"}>PMR2</MenuItem>
          <MenuItem value={"30"}>PMR3</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <br/>
    <Box   sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
      <h5>Solicita</h5>
    <TextField
          required
          id="outlined-required"
          label="Nombre"
          name="nombre"
          onChange={this.handleChange}
          defaultValue={this.state.nombre}
        />
        <TextField
          required
          id="outlined-required"
          label="Apellidos"
          name="apellidos"
          onChange={this.handleChange}
          defaultValue={this.state.apellidos}
        />
        <TextField
          required
          id="outlined-required"
          label="Correo"
          type="email"
          name="correo"
          onChange={this.handleChange}
          defaultValue={this.state.correo}
        />
    </Box>
    <br/>
    <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo de recoleccion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="tiporecoleccion"
          value={this.state.tiporecoleccion}
          label="Tipo de recoleccion"
          required
          onChange={this.handleChange}
        >
          <MenuItem value={"0"}>Selecciona un tipo de recoleccion</MenuItem>
          <MenuItem value={"10"}>Refacciones</MenuItem>
          <MenuItem value={"20"}>Personal</MenuItem>          
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ flexGrow: 8, '& .MuiTextField-root': { m: 1, width: '25ch' }, }}>
    <TextField
         id="outlined-multiline-static"
          label="Descripcion"
          multiline
          rows={4}
          required
          defaultValue={this.state.descripcion}
          name="descripcion"
          onChange={this.handleChange}
          variant="outlined"
        />
    </Box>
    <br/>
    <Box>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Fecha de recoleccion"
              value={this.state.fecharecoleccion}
              name="finicio"
              id="finicio"
              required
              onChange={this.handleChangefinicio}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
    </Box>
    <br/>
    <Box>
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Programacion</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name="tipoprogramacion"
          value={this.state.tipoprogramacion}
          label="Tipo de recoleccion"
          onChange={this.handleChange}
          required
        >
          <MenuItem value={"0"}>Selecciona una programacion</MenuItem>
          <MenuItem value={"10"}>Por la mañana</MenuItem>
          <MenuItem value={"20"}>Por la tarde</MenuItem>          
        </Select>
      </FormControl>
      </Box>
      <br/>
      <Box>
        <h5>Datos de la recoleccion</h5>
      <TextField
          required
          id="outlined-required"
          label="Nombre del lugar"
          name="NombreRecoleccion"
          defaultValue={this.state.NombreRecoleccion}
          onChange={this.handleChange}
          fullWidth
        />
        <br/>
        <br/>
         <TextField
          required
          id="outlined-required"
          label="Calle y numero"
          name="CalleRecoleccion"
          onChange={this.handleChange}
          defaultValue={this.state.CalleRecoleccion}
        />
         <TextField
          required
          id="outlined-required"
          label="Colonia"
          name="ColoniaRecoleccion"
          onChange={this.handleChange}
          defaultValue={this.state.ColoniaRecoleccion}
        />
         <TextField
          required
          id="outlined-required"
          label="Ciudad"
          name="CiudadRecoleccion"
          onChange={this.handleChange}
          defaultValue={this.state.CiudadRecoleccion}
        />
         <TextField
          required
          id="outlined-required"
          label="Estado"
          name="EstadoRecoleccion"
          onChange={this.handleChange}
          defaultValue={this.state.EstadoRecoleccion}
        />
         <TextField
          required
          id="outlined-required"
          label="C.P."
          name="CPRecoleccion"
          onChange={this.handleChange}
          defaultValue={this.state.CPRecoleccion}
        />
        <label></label>
        <Button
  variant="contained"
  component="label"
  startIcon={<AttachFileIcon/>}
>
Adjuntar Archivo
  <input
    type="file"
    hidden
    name="archivoadjunto"
    onChange={this.handleChange}
  />
</Button>
      </Box>
      <br/>
      <Button variant="contained" onClick={() => this.Generarecoleccion()}>
          Crear Recolección
      </Button>
    </Paper>
  )              
          }
}
export default Recolecciones;
