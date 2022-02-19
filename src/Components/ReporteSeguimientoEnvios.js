import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


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
class ReporteSeguimientoEnvios extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        columnas: [],
        titulo : "",
        render : false,
        tabseleccionada : 1
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    // componentWillReceiveProps(props) {
    //   this.setState({ rows: props.rows,columnas :props.columnas,titulo : props.titulo })
    // }
    
componentDidMount(){
 
}
handleChange(event) {
  debugger;
  this.setState({ [event.target.name]: event.target.value });
  console.log(this.state);

}
componentDidUpdate(){
    console.log("hijo actualizado")
    console.log(this.state)
   
}


    render() {
        return (
          <Box sx={{ width: '100%' }}>
    <p>En construccion</p>
        </Box>
  )              
          }
}
export default ReporteSeguimientoEnvios;
