import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import swal from 'sweetalert'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './Sidebar.css';
import Container from '@mui/material/Container';
import Titulo from './Titulos'
import ButtonGroup from '@mui/material/ButtonGroup';
import $ from 'jquery'
import Tablaseleccion from './Tablaseleccion';
import { Api_getdrivers,Api_GetTrucks } from './Api';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import LoadingScreen from './LoadingScreen';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Stack from '@mui/material/Stack';
import DraggableTable from './DraggableTable';


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

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clase: "",
            TipoEnvio : "0",
            estatusmodal : false,
            FolioEmbarque : "",
            FolioBusqueda : "",
            Drivers : [],
            Trucks : [],            
            sucursal : "0",
            chofer : "0",
            unidad : "0",
            modalabierta : false,
            modalabierta2 : false,
            loading : false,
            rutapdf : "example.pdf",
            mostrartabla : false,
            sucursalhibrida : ""

        };
         this.handleChange = this.handleChange.bind(this);
         this.handleClose = this.handleClose.bind(this);
         this.openmodal2 = this.openmodal2.bind(this);
        document.title = "Programar embarques";
    }

    handleChange(event) {
        debugger;
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
    
      }
     updateindex(e,ui){
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i+1);
        });
        $('input[type=text]', ui.item.parent()).each(function (i) {
            $(this).val(i + 1);
        });
     }
        fixHelperModified = function(e, tr) {
		var $originals = tr.children();
		var $helper = tr.clone();
		$helper.children().each(function(index) {
			$(this).width($originals.eq(index).width())
		});
		return $helper;
	} 
    generarconsecutivo(){
        swal("Embarque Generado", "Tu Guia de Embarque es :"+ "F1234-002", "success").then((willDelete) => {
          if (willDelete) {
            this.setState({ FolioEmbarque: "F1234-002" });
          } 
        });
    }
    handleClose(){
      debugger;
      if(this.state.modalabierta){
        this.setState({ modalabierta: false });
      }
      else{
        this.setState({ modalabierta: true });
      }
    }
    alerta1(){
      swal("Sucursal Agregada", "Sucursal  : " + this.state.sucursalhibrida, "success").then(
        this.openmodal2()
      )      
     }  
  
    openmodal2(){
      
      debugger;
      if(this.state.modalabierta2){
        this.setState({ modalabierta2: false });
      }
      else{
        this.setState({ modalabierta2: true });
      }
    }
    get_trucks(){
      var token = Cookies.get('Token');
      var datatrucks = {
  truck: null,
  driver: null
      };
      Api_GetTrucks(datatrucks,token)
      .then(results => {
        return results.json();
      })
      .then(data => {
        debugger;
        console.log(data)
        if (data) {
          this.setState({ Trucks: data });
        }
      })
    
    }
    updateruta(){
      this.handleClose()
      this.setState({ FolioEmbarque: this.state.FolioBusqueda,FolioBusqueda : "",loading:true});
      var delayInMilliseconds = 2000; 
      setTimeout(function() { //Start the timer
        this.setState({loading:false}); //After 1 second, set render to true
    }.bind(this), 2000)
    }
    getdrivers(){
      var token = Cookies.get('Token');
      var datadrivers = {
        suc: null,
        driver: null,
        rfc: null,
        numPolicy : null
      };
      Api_getdrivers(datadrivers,token)
      .then(results => {
        return results.json();
      })
      .then(data => {
        debugger;
        console.log(data)
        if (data) {
          this.setState({ Drivers: data });
        }
      })
    }
UNSAFE_componentWillMount(){
  
}
componentDidMount(){

    this.getdrivers();
  this.get_trucks();
    this.forceUpdate()
    // $("#myTable tbody").sortable({
	// 	helper: this.fixHelperModified,
	// 	stop: this.updateIndex
	// }).disableSelection();
}

    render() {      
        return (          
            <Box sx={{ minWidth: 120 }}>     
            <LoadingScreen loading={this.state.loading}></LoadingScreen>
            <Box sx={{ flexGrow: 1 }}>    
               <Titulo titulo = "Programación" subtitulo="Embarques"></Titulo>
                </Box>   
                <Container fixed>
                <Box sx={{ bgcolor: '#ffff', height: '100vh' }} >
                 <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tipo Envio</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="TipoEnvio"
          name="TipoEnvio"
          value={this.state.TipoEnvio}
          label="Tipo Envio"
         onChange={this.handleChange}
        >
          <MenuItem value={"0"}>Embarques</MenuItem>
          <MenuItem value={"20"}>Interno</MenuItem>
          <MenuItem value={"30"}>Vendedor</MenuItem>  
          <MenuItem value={"40"}>Paqueteria</MenuItem>          
        </Select>
      </FormControl>
      </Box>
      <br/>
      {/* sucursales */}
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
          <MenuItem value={"0"}>SN1- SIERRA NORTE</MenuItem>
          <MenuItem value={"20"}>SN2- SIERRA NORTE</MenuItem>
          <MenuItem value={"30"}>SN3- SIERRA NORTE</MenuItem>
          <MenuItem value={"40"}>PMR1- PROMARE</MenuItem>
          <MenuItem value={"50"}>PMR2- PROMARE</MenuItem>
          <MenuItem value={"60"}>PMR3- PROMARE</MenuItem>
          <MenuItem value={"70"}>HIBRIDA1</MenuItem>
          <MenuItem value={"80"}>HIBRIDA2</MenuItem>
          <MenuItem value={"90"}>HIBRIDA3</MenuItem>
        </Select>
           
        <IconButton onClick={()=>this.openmodal2()} aria-label="delete" size="small">
  <AddBusinessIcon fontSize="inherit" />
</IconButton>
      </FormControl>
  
      </Box>
      <br/>
      {/* pmr */}
      {/* <Box sx={{ flexGrow: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Suc. Promare</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value="10"
          label="Suc. Promare"
          onChange={this.handleChange}
        >
          <MenuItem value={10}>PMR1</MenuItem>
          <MenuItem value={20}>PMR2</MenuItem>
          <MenuItem value={30}>PMR3</MenuItem>
        </Select>
      </FormControl>
      </Box> */}
      {/* chofer */}
      <Box sx={{ flexGrow: 1 }}>
          <br/>
           <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chofer</InputLabel>

         <Select
          labelId="demo2"
          id="chofer"
          name="chofer"
          defaultValue={this.state.chofer}
          label="Chofer"
          onChange={this.handleChange} >
             <MenuItem value="0">Seleccione un chofer</MenuItem>
          {this.state.Drivers.map(obj => (
            <MenuItem value={obj.nom}>{obj.chofer}</MenuItem>
                
              ))}
        </Select>
      </FormControl>
      </Box>
      
      {/* UNIDAD */}
      <Box sx={{ flexGrow: 1 }}>
          <br/>
           <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Unidad</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="unidad"
          name="unidad"
          defaultValue={this.state.unidad}
          label="Unidad"
          onChange={this.handleChange}>
            <MenuItem value="0">Seleccione una unidad</MenuItem>
         {this.state.Trucks.map(obj => (
              <MenuItem value={obj.camion}>{obj.descripcion}</MenuItem>
              ))}    
        </Select>
      </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
          <br/>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
  <Button onClick={()=>this.generarconsecutivo()}>Generar Embarque</Button>
  
</ButtonGroup>
      </Box>
      <Tablaseleccion></Tablaseleccion>
      <Box>
          <h1>Total ruta : <span className="badge badge-secondary">{this.state.FolioEmbarque}</span><Button  variant="contained" onClick={()=>this.handleClose()}>Buscar Embarque</Button></h1>
        <Box hidden={this.state.mostrartabla}>
     <DraggableTable ></DraggableTable>
        </Box>
      </Box>
      <Box align="center">
      <a href={this.state.rutapdf} target="_blank" rel="noopener noreferrer" download>
      <Button variant="contained">Imprimir Embarque</Button>
      </a>
      <br/>
      </Box>
      <br/>
      </Box>

      </Container>
      {/* // MODAL */}
  <Modal
  keepMounted
  open={this.state.modalabierta}
  onClose={()=>this.handleClose()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description"
>
  <Box sx={style}>
    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
    Buscar Embarque existente
     
    </Typography>
    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
    <TextField id="FolioBusqueda" name="FolioBusqueda"  onChange={this.handleChange} value={this.state.FolioBusqueda} label="N° de embarque" variant="outlined" /> <IconButton onClick={()=>this.updateruta()} aria-label="delete" size="small">
  <SearchIcon fontSize="inherit" />Buscar
</IconButton>
    </Typography>
  </Box>
</Modal>
      {/* // MODAL V2 */}
      <Modal
  keepMounted
  open={this.state.modalabierta2}
  onClose={()=>this.openmodal2()}
  aria-labelledby="keep-mounted-modal-title"
  aria-describedby="keep-mounted-modal-description"
>
  <Box sx={style}>
    <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
    Añadir sucursal hibrida
     
    </Typography>
    <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>

    </Typography>
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
          <MenuItem value={"0"}>SN1- SIERRA NORTE</MenuItem>
          <MenuItem value={"20"}>SN2- SIERRA NORTE</MenuItem>
          <MenuItem value={"30"}>SN3- SIERRA NORTE</MenuItem>
          <MenuItem value={"40"}>PMR1- PROMARE</MenuItem>
          <MenuItem value={"50"}>PMR2- PROMARE</MenuItem>
          <MenuItem value={"60"}>PMR3- PROMARE</MenuItem>
          <MenuItem value={"70"}>HIBRIDA1</MenuItem>
          <MenuItem value={"80"}>HIBRIDA2</MenuItem>
          <MenuItem value={"90"}>HIBRIDA3</MenuItem>
        </Select>
           
 
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
          value="10"
          label="Suc. Promare"
          onChange={this.handleChange}
        >
          <MenuItem value={10}>PMR1</MenuItem>
          <MenuItem value={20}>PMR2</MenuItem>
          <MenuItem value={30}>PMR3</MenuItem>
        </Select>
      </FormControl>      
      </Box>
      <br/>
      <Box><TextField id="sucursalhibrida" name="sucursalhibrida" value={this.state.sucursalhibrida} onChange={this.handleChange} label="Nombre Sucursal" variant="outlined" /></Box>
      <br/>
      <Stack direction="row" spacing={4}>
      <Button variant="contained" onClick={()=>this.alerta1()} endIcon={<AddTaskIcon />}>
        Añadir Sucursal
      </Button>

</Stack>
  </Box>
</Modal>
    </Box>
 
// sucursales

         
        );
         }
    }

export default Dashboard;
