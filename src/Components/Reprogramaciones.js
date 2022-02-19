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
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import IconButton from '@mui/material/IconButton';
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
    border: 0,
  },
}));
class Reprogramaciones extends React.Component {
    constructor(props) {
      super(props)
      this.state = {      
        columnas: [],
        titulo : "",
        render : false,
        rows : [
            {
             Vendedor : "155-81273-2",
             Fecha : "2389",
             Factura : "Vendedor 1",
             Cliente : "2021-12-07",
             TipoEntrega: "01",
             Incidencia: "1",
             Tiempo : "2"
            },
           
        ],
        cargando : false
        
      }
      }
    
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
autorizar(id){
    swal({ title: "Confirmar",
    text: "Deseas Autorizar la reprogramacion de la factura "+id + "?",
    icon: "warning",
    buttons: true,
    dangerMode: true,}).then((willDelete) => {
        if (willDelete) {
            swal("Reprogramacion de la factura " + id + " autorizada", {
                icon: "success",
              });
          this.setState({ rows: [] });
        } 
      });
}
rechazar(id){
    swal({
        title: "Rechazar",
        text: "Deseas Rechazar la reprogramacion de la factura "+id + "?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Reprogramacion de la factura " + id + " rechazada", {
            icon: "success",
          });
          this.setState({ rows: [] });
        }
      });
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
     <Titulo titulo="Reprogramaciones" ></Titulo>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Vendedor</StyledTableCell>
            <StyledTableCell align="right">Fecha</StyledTableCell>
            <StyledTableCell align="right">Factura</StyledTableCell>
            <StyledTableCell align="right">Cliente</StyledTableCell>
            <StyledTableCell align="right">Tipo Entrega</StyledTableCell>
            <StyledTableCell align="right">Incidencia</StyledTableCell>
            <StyledTableCell align="right">Tiempo Hrs.</StyledTableCell>
            <StyledTableCell align="left">Accion</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{row.Vendedor}</StyledTableCell>
              <StyledTableCell align="right">{row.Fecha}</StyledTableCell>
              <StyledTableCell align="right">{row.Factura}</StyledTableCell>
              <StyledTableCell align="right">{row.Cliente}</StyledTableCell>
              <StyledTableCell align="right">{row.TipoEntrega}</StyledTableCell>
              <StyledTableCell align="right">{row.Incidencia}</StyledTableCell>
              <StyledTableCell align="right">{row.Tiempo}</StyledTableCell>
              <StyledTableCell align="left"> <IconButton onClick={() =>this.autorizar(row.Factura)} aria-label="delete">
              <CheckBoxIcon sx={{ 'color': {color : 'green'}}}/> 
</IconButton>
<IconButton onClick={() =>this.rechazar(row.Factura)} aria-label="delete">
<DisabledByDefaultIcon sx={{ 'color': {color : 'red'}}}/> 
</IconButton>
  </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
 </Paper>
  )              
          }
}
export default Reprogramaciones;
