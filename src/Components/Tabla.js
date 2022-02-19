import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
class Tabla extends React.Component {
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
    console.log("propiedades actuales")
    console.log(this.props)
    console.log(this.state.rows.length)
    var datos = this.props;
    console.log("datos")
    console.log(datos)
    

     console.log(datos.rows)
  
   console.log("columnas")
   console.log(this.state.columnas);
   this.setState({columnas:Object.keys(datos.rows),'rows': datos.rows,titulo : datos.titulo})    
}
componentDidUpdate(){
    console.log("hijo actualizado")
    console.log(this.state)
   
}


    render() {
        return (
  <div></div>
  )              
          }
}
export default Tabla;
