import { BrowserRouter as Router, Switch, Route, Redirect,Link, useHistory,useLocation } from 'react-router-dom';
import React, { Component,useState  } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import * as All from 'react-bootstrap/';
import swal from 'sweetalert';
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
import './FacturasDashboard.css';
import {Api_GetOCModified,Api_OCStatus,api_handleErrors} from './Api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup,FormControl,ButtonToolbar,ButtonGroup} from 'react-bootstrap/';
import DatePicker from 'react-date-picker';
import Cookies from 'js-cookie';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSortDown,faFileExcel,faSearch} from '@fortawesome/free-solid-svg-icons'
import { ExportReactCSV } from './ExportReactCSV'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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



  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>        
          <TableCell align="left"><strong>{row.uuid}</strong></TableCell>
          <TableCell align="left">{row.fecha}</TableCell>
          <TableCell className="parpadeo" align="left">{row.no_Movimientos}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Detalle
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                    <TableCell align="center" className="headertbl">OC Origen</TableCell>
            <TableCell align="center" className="headertbl">OC Destino</TableCell>
            <TableCell align="center"  className="headertbl">UUID Factura</TableCell>
            <TableCell align="center"  className="headertbl">No. Parte</TableCell>
            <TableCell align="center"  className="headertbl">cantidad</TableCell>
            <TableCell align="center"  className="headertbl">Fecha Movimiento</TableCell>
            <TableCell align="center"  className="headertbl">Piezas Nuevas</TableCell>
            <TableCell align="center"  className="headertbl">Piezas Antiguas</TableCell>
            <TableCell align="center"  className="headertbl">Precio Antiguo</TableCell>
            <TableCell align="center"  className="headertbl">Precio Nuevo</TableCell>
            <TableCell align="center"  className="headertbl">Diferencia</TableCell>
            <TableCell align="center"  className="headertbl">Porcentaje</TableCell>
            <TableCell align="center"  className="headertbl">Accion</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.facturas.map((factura) => (
                      <TableRow key={factura.id}>
                        <TableCell component="th" scope="row">
                          {factura.partida}
                        </TableCell>
                        <TableCell>{factura.oc}</TableCell>
                        <TableCell>{factura.uuid}</TableCell>
                        <TableCell>{factura.numParte}</TableCell>
                        {(factura.accion!="Actualizado en la OC" && factura.accion != "ACTUALIZADO EN LA OC ACTUAL" && factura.accion!= "Actualizdo en la OC" && factura.accion != "INSERTADO EN LA OC ACTUAL")?  <TableCell align="left"><span className="parpadea discrepancia"><strong>{factura.cantidad}</strong></span></TableCell>:  <TableCell align="left"><span className=" text2"><strong>{factura.cantidad}</strong></span></TableCell>}

                      
                        <TableCell align="left">{factura.fecha}</TableCell>
                        <TableCell align="left">{factura.piezasNuevas}</TableCell>
                        <TableCell align="left">{factura.piezasAntiguas}</TableCell>
                        <TableCell align="left">{factura.precioAntiguo}</TableCell>
                        <TableCell align="left">{factura.nuevoPrecio}</TableCell>
                        <TableCell align="left">{factura.diferencia}</TableCell>
                        <TableCell align="left">{factura.porcentaje} %</TableCell>
                        {(factura.accion!="Actualizado en la OC" && factura.accion != "ACTUALIZADO EN LA OC ACTUAL" && factura.accion!= "Actualizdo en la OC"&& factura.accion != "INSERTADO EN LA OC ACTUAL")?  <TableCell align="left"><span className="parpadea discrepancia"><strong>{factura.accion}</strong></span></TableCell>:  <TableCell align="left"><span className=" text2"><strong>{factura.accion}</strong></span></TableCell>}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
class FacturasDashboard extends React.Component{
    constructor(props) {
		super(props);
		this.state = {
			clase: "",
      Finicio: "",
      Ffin:"",
      statusselected:"",
      Status:[],
      lstOC:[],
      lstOCExport:[],
      page:0,
      rowsPerPage:5,
      NombreArchivo : "Reporte OC "
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changepickerinicio = this.changepickerinicio.bind(this);
        this.changepickerfin = this.changepickerfin.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
		// this.login = this.login.bind(this);
		document.title = "Facturas Dashboard";
	}
  changepickerinicio(event){
    debugger;
    this.setState({Finicio:event});
  }
  changepickerfin(event){
    this.setState({Ffin:event});
  }

   handleChangePage (newPage) {
    this.setState({page:newPage});
  };
  
   handleChangeRowsPerPage (event) {
    this.setState({rowsPerPage:parseInt(event.target.value, 10)});
    this.setState({page:0});
  };
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
    search(){
      debugger;
      var unidad = Cookies.get('Unidad');
      var data = {
        FechaInicio: this.state.Finicio==""?null:this.state.Finicio,
        FechaFin: this.state.Ffin==""?null:this.state.Ffin,
        Status: this.state.statusselected==""?null:this.state.statusselected,
        Unidad : unidad
      };
      Api_GetOCModified(data).then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        if(data){
          console.log(data)
          var datos = [];
          data.forEach(header => {
            header.facturas.forEach(element2 => {
              datos.push(element2);
            });
            }
            );
           
          this.setState({lstOC:data,lstOCExport:datos}); 
        }
    })
    }
    getfirstload(){
      var unidad = Cookies.get('Unidad');
      var data = {
        FechaInicio: null,
        FechaFin: null,
        Status: "Todos",
        Unidad : unidad
      };
      Api_GetOCModified(data).then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data){
          const fecha = new Date();
          const fin = new Date();
          const inicio = fin.setDate(fin.getDate() -1);
          var datos = [];
          data.forEach(header => {
            header.facturas.forEach(element2 => {
              datos.push(element2);
            });
            }
            );
          this.setState({lstOC:data,lstOCExport:datos,Finicio:fecha,Ffin:fecha,statusselected:"Todos"}); 
         console.log(this.state)
        }
    })
    }
    getdata(){
      debugger;
      var unidad = Cookies.get('Unidad');
      Api_OCStatus(unidad)
      .then(api_handleErrors).then(results =>{
        return results.json();
      })
      .then(data => {
        
                  console.log(data)
        if(data){
          
          this.setState({Status:data,statusselected:"Todos"}); 
         
        }
    })
    }
       componentDidMount(){         
         this.getdata();
         this.getfirstload();
       }
    render(){
    return(
    <div className="contenedor-wrapped Fixedpage" id="Wrapper">
        <h1>Facturas Dashboard <span className="badge badge-secondary">PSV</span></h1>
        <br></br>
        <div> <ButtonToolbar className="mb-3" aria-label="Toolbar with Button groups">
    <ButtonGroup className="mr-3" aria-label="First group">
      <strong className="label">Fecha Inicio : </strong><DatePicker name="Finicio"
       onChange={this.changepickerinicio}
       value={this.state.Finicio}
      />
    </ButtonGroup>
    <ButtonGroup className="mr-4" aria-label="First group">
    <strong className="label">Fecha Fin : </strong> <DatePicker name="Ffin"
       onChange={this.changepickerfin}
       value={this.state.Ffin}
      />
    </ButtonGroup>
    <InputGroup className="mr-5" >
      <InputGroup.Prepend>
      <label className="separador">Estatus:</label>
      <select name="statusselected" className="form-control"  onChange={this.handleChange}>
        <option value="Todos">--Todos--</option>
              {this.state.Status.map(obj => (
															<option name="status" value={obj.value}>
																{obj.id}
															</option>
														))}
              </select>
      </InputGroup.Prepend>     
    </InputGroup>
    <ButtonGroup className="mr-4" aria-label="First group">
    <Button variant={"warning"} className="separatedv2" size={"sm"} onClick={()=>this.search()}> <FontAwesomeIcon icon={faSearch} />Buscar</Button>
    </ButtonGroup>
    <ButtonGroup className="mr-4" aria-label="First group">
    <ExportReactCSV csvData={this.state.lstOCExport} fileName={this.state.NombreArchivo +  new Date()+".csv"} />
    </ButtonGroup>
  </ButtonToolbar></div>
        <div>
          
     


</div>

<TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell align="left" className="headertbl"  />
            <TableCell align="left" className="headertbl">Factura</TableCell>
            <TableCell align="left" className="headertbl">Fecha</TableCell>
            <TableCell align="left"  className="headertbl">No. Movimientos</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.lstOC.map((row) => (
            <Row key={row.uuid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.lstOC.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          onChangePage={()=> this.handleChangePage()}
          onChangeRowsPerPage={() => this.handleChangeRowsPerPage()}
        />
   */}
    <br></br>
    <footer>FULTRA® 2021. TODOS LOS DERECHOS RESERVADOS</footer>
    </div>
        );
}
}
export default FacturasDashboard;
