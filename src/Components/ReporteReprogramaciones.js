import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
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
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LoadingScreen from './LoadingScreen'
import swal from 'sweetalert'
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FD4F00",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 1,
  },
}));
class ReporteReprogramaciones extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false,
        finicio : "",
        ffin : "",
        rows : [
            {
             pedido : "155-81273-2",
             factura : "2389",
             vendedor : "Vendedor 1",
             fecha : "2021-12-07",
             tiempo: "01"
            },
            {
            pedido : "12308-8278",
            factura : "8375",
            vendedor : "juan perez",
            fecha : "2021-12-06",
            tiempo: "02"
           },
           {
           pedido : "155-81273-2",
           factura : "2349",
           vendedor : "Vendedor 2",
           fecha : "2021-12-07",
           tiempo: "20"
          },
          {
          pedido : "155-81273-2",
          factura : "1234",
          vendedor : "daniel morgado",
          fecha : "2021-12-07",
          tiempo: "10"
         },
         {
         pedido : "155-81273-2",
         factura : "0393",
         vendedor : "Vendedor  4",
         fecha : "2021-12-07",
         tiempo: "15"
        },
        {
        pedido : "155-81273-2",
        factura : "9123",
        vendedor : "Vendedor 6",
        fecha : "2021-12-07",
        tiempo: "18"
       },
       {
       pedido : "155-81273-2",
       factura : "8373",
       vendedor : "Vendedor x",
       fecha : "2021-12-07",
       tiempo: "40"
      },
      {
      pedido : "155-81273-2",
      factura : "0509",
      vendedor : "Vendedor y",
      fecha : "2021-12-07",
      tiempo: "99"
     },
     {
     pedido : "155-81273-2",
     factura : "2102",
     vendedor : "Vendedor z",
     fecha : "2021-12-07",
     tiempo: "73"
    },
    {
    pedido : "155-81273-2",
    factura : "8593",
    vendedor : "Vendedor op",
    fecha : "2021-12-07",
    tiempo: "48"
   },
        ],
        cargando : false
        
      }
      this.handleChangefinicio = this.handleChangefinicio.bind(this);
      this.handleChangeffin = this.handleChangeffin.bind(this);
      this.busqueda = this.busqueda.bind(this);
    }
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    
componentDidMount(){
   
}
componentDidUpdate(){
    console.log("hijo actualizado")
    console.log(this.state)
   
}
busqueda(){
 if(this.state.finicio==="" || this.state.ffin===""){
    swal("Error", "Selecciona un rango de fechas valido.", "error",);
 }
    else{

    
    this.setState({ cargando:true});
    var delayInMilliseconds = 2000; 
    setTimeout(function() { //Start the timer
      this.setState({cargando:false}); //After 1 second, set render to true
  }.bind(this), 2000)
}
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
    render() {
        return (
          
            <Paper>
                  <LoadingScreen loading={this.state.cargando}></LoadingScreen>
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
          </LocalizationProvider>         
              <Button variant="contained" onClick={() => this.busqueda()} startIcon={<SearchIcon />}>
          Consultar
      </Button>
      <Button variant="contained" startIcon={<FileCopyIcon />}>
          Exportar
      </Button>
  </Box>
  <br/>
  {/* inicio de tabla */}
  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Pedido</StyledTableCell>
            <StyledTableCell align="right">Factura</StyledTableCell>
            <StyledTableCell align="right">Vendedor</StyledTableCell>
            <StyledTableCell align="right">Fecha Factura</StyledTableCell>
            <StyledTableCell align="right">Tiempo hrs</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{row.pedido}</StyledTableCell>
              <StyledTableCell align="right">{row.factura}</StyledTableCell>
              <StyledTableCell align="right">{row.vendedor}</StyledTableCell>
              <StyledTableCell align="right">{row.fecha}</StyledTableCell>
              <StyledTableCell align="right">{row.tiempo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </Paper>
          
  )              
          }
}
export default ReporteReprogramaciones;
