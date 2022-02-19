import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Titulos from './Titulos'
import InputLabel from '@mui/material/InputLabel';
import {Api_GetMenus,api_handleErrors,api_savemenu,api_geticons} from './Api';
import Cookies from 'js-cookie';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Stack from '@mui/material/Stack';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import swal from 'sweetalert';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import AlignVerticalCenterIcon from '@mui/icons-material/AlignVerticalCenter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import BuildIcon from '@mui/icons-material/Build';
import CallIcon from '@mui/icons-material/Call';
import CancelIcon from '@mui/icons-material/Cancel';
import CastIcon from '@mui/icons-material/Cast';
import CheckIcon from '@mui/icons-material/Check';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FlagIcon from '@mui/icons-material/Flag';
import InboxIcon from '@mui/icons-material/Inbox';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import Icon from "./icon";
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
class Menus extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        iconos : [],
        columnas: [ 
            {
                field: "idMenu",
                headerName: "Id"
              },
            {
            field: "title",
            headerName: "Titulo"
            , width: 240 
          },
          {
            field: "path",
            headerName: "Ruta"
            , width: 200 
          },
          {
            field: "icon",
              headerName: "Icono",
               width: 200 
          },
          {
            field: "active",
            headerName: "Activo",
            renderCell: (cellValues) => {
                if(cellValues.row.active){
                    return <CheckBoxIcon/>;
                }
                else{
                    return <CloseIcon />;
                }
                
              }
            
          },
          {
            field: "padre",
            headerName: "Menu Padre"
             , width: 300 
          },
          {
            field: "editar",
            headerName: "Editar",
            renderCell: (cellValues) => {
                return (  
                    <Button onClick={() => this.openmodal(cellValues)}>Editar</Button>
                )  
        }}],
        titulo : "",
        render : false,
        menus: [],
        idmenu : 0,
        title : "",
        path : "",
        icon : "",
        active : false,
        idmenupadre : 0,
        modalopen : false,
        Accion : "",
        menusselect : []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handlechangecheck = this.handlechangecheck.bind(this);
    }
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
  
    handleChange(event) {
        debugger;
        this.setState({ [event.target.name]: event.target.value });
        console.log(this.state);
      }   
    openmodal(datos){
        debugger;
        this.setState({idmenu:datos.row.idMenu,title:datos.row.title,path:datos.row.path,icon:datos.row.icon,active:datos.row.active,idmenupadre:datos.row.idMenuFather,Accion:"Editar",modalopen:true});
    }
    closemodal(){
        this.setState({idmenu:0,title:"",path:"",icon:"",active:false,idmenupadre:0,Accion:"Agregar",modalopen:false});
    }
    agregamenu(){
        this.setState({idmenu:0,title:"",path:"",icon:"",active:false,idmenupadre:0,Accion:"Agregar",modalopen:true});
    }
    enviardatos(){
        debugger;
        var token = Cookies.get('Token');
        var datos =
        {    
            idmenu:this.state.idmenu,
            title:this.state.title,
            path:this.state.path,
            icon:this.state.icon,
            active:this.state.active,
            IdMenuFather:this.state.idmenupadre,   
        }
        api_savemenu(datos,token)
        .then(api_handleErrors).then(results => {
          return results.json();
        })
        .then(data => {        
            if(data.message!="Hubo un error al insertar/editar el menu"){       
                swal("Exito",data.message,"success")
                this.closemodal();
                this.getMenus();
                
             }
             else{
               swal("Error",data.message,"error")
             }
        })
    }
    handlechangecheck(){
        debugger;
        if(this.state.active){
            this.setState({active:false})
        }
        else{
            this.setState({active:true})
        }
        
    }
    getMenus(){
        var token = Cookies.get('Token');
        var datos =
        {          
        }
        Api_GetMenus(token)
        .then(api_handleErrors).then(results => {
          return results.json();
        })
        .then(data => {        
            console.log(data)
        var sinfather = [];
          this.setState({menus:data});
        })
   
    }
    geticons(){
        var token = Cookies.get('Token');
        var datos =
        {          
        }
        api_geticons(token)
        .then(api_handleErrors).then(results => {
          return results.json();
        })
        .then(data => {        
            console.log(data)
          this.setState({iconos:data});
        })
    }
componentDidMount(){
    this.getMenus();
    this.geticons();
}
componentDidUpdate(){
 
   
}


    render() {
        return (
            <Paper >
                <Titulos titulo="Menus" subtitulo=""></Titulos>
                <Box  sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}>
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
      <Button  variant="outlined" startIcon={<PlaylistAddIcon />} onClick={() => this.agregamenu()}>
        Agregar Menu
      </Button>
</Stack>
    </Toolbar>
                <DataGrid
        style={{ height: 400, width: '100%' }}
        rows={this.state.menus}
        columns={this.state.columnas}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(r) => r.idMenu}        
        
        disableSelectionOnClick
        onSelectionModelChange={
          itm => this.setSelectionModel(itm)
        }                
       
      />
      </Box>
      <Box style={{ width: '100%' }}>
      <Modal show={this.state.modalopen} size="lg">
      <ModalHeader>
        <ModalTitle>{this.state.Accion} </ModalTitle>
      </ModalHeader>
      <ModalBody>
          <Box>
          <TextField id="outlined-basic" name="title" label="Titulo" value={this.state.title} onChange={this.handleChange} variant="outlined" />
      <br/>
      <br/>
          </Box>
     
      <TextField id="outlined-basic" name="path" label="Ruta" value={this.state.path} onChange={this.handleChange} variant="outlined" />
      <br/>
      <br/>   
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Icono</InputLabel>
      <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Icono"
    name="icon"
    value={this.state.icon}
    onChange={this.handleChange}
  >
      {this.state.iconos.map(menu => 
          <MenuItem value={menu.icon}>
       
          <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon name={menu.icon} />  
         
              <div>{menu.icon}</div>
          </div>
      </MenuItem>
        )}
 
  </Select>
  </FormControl>
  {/* menupadre */}
  <br/>
  <br/>
  <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Menu Padre</InputLabel>
      <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Menu Padre"
    name="idmenupadre"
    value={this.state.idmenupadre}
    onChange={this.handleChange}
  >
       <MenuItem value={0}>Sin padre</MenuItem>
      {this.state.menus.map(menu => 
          <MenuItem value={menu.idMenu}>
       
          <div style={{ display: 'flex', alignItems: 'center' }}>          
         
              <div>{menu.title}</div>
          </div>
      </MenuItem>
        )}
 
  </Select>
  </FormControl>
  <Checkbox checked={this.state.active} onChange={() =>this.handlechangecheck()} /> Activo
      <br/>
      </ModalBody>
      <ModalFooter> <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => this.closemodal()}>cerrar</button>
        <button type="button" class="btn btn-primary" onClick={() => this.enviardatos()}>Guardar</button></ModalFooter>
    </Modal>
      </Box>
   

            </Paper>
//   <div>
//        {/* modal */}

  )              
          }
}
export default Menus;   
   
  