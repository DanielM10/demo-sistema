import { Redirect } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@mui/material/Button';
import * as All from 'react-bootstrap/';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import { Api_UnidadesdeNegocio, Api_login, api_handleErrors } from './Api';
import Grid from '@mui/material/Grid';
import './Login.css';
import { Stack } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import PasswordOutlinedIcon from '@mui/icons-material/PasswordOutlined';

const App = props => (
  <Login />
);


function showmsg() {

}

class Login extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      unidadesdenegocio: [],
      username: "",
      password: "",
      ud: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  componentDidMount() {
    // var logged = Cookies.get('uid');
    // if (logged != undefined && logged != "") {
    //   <Redirect to="/" />
    // } else {
    //   this.getdata();
    // }

  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });

  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.login();
    }
  }
  login() {
    if (this.state.username == "") {
      swal("Favor de introducir el mail.")
    }
    else if (this.state.password == "") {
      swal("Favor de introducir el password.")
    }
    else {
      Cookies.set('Nombre',this.state.username.trim(), { expires: 1 });
      Cookies.set('Token',"askdjhajksdhkjasd", { expires: 1 });
            <Redirect to="/" />
            window.location.replace("/");            
          }
  }
  render() {
    return (

      <Grid container spacing={12} direction="row"
      justifyContent="center"
      alignItems="center" id="login">
        <Grid item xs={12} justifyContent="center"
      alignItems="center" align="center">

        </Grid>
        <h1 id="titulologin">SE</h1>
        <br></br>
        <h6>Sistema Embarques</h6>
        <br></br>
      
        <br></br>
  <Grid item xs={4} id="contenido">
        <All.Form>
        
          <All.Form.Group controlId="formBasicEmail">
            <All.Form.Label>Usuario</All.Form.Label>
            <All.Form.Control className="" value={this.state.username}
              onChange={this.handleChange} placeholder="Username" type="email" onKeyDown={this.handleKeyDown} name="username" placeholder="Enter email" required />

          </All.Form.Group>

          <All.Form.Group controlId="formBasicPassword">
            <All.Form.Label>Password</All.Form.Label>
            <All.Form.Control className="" value={this.state.password}
              onChange={this.handleChange} placeholder="Your password" onKeyDown={this.handleKeyDown} name="password" type="password" placeholder="Password" required />
          </All.Form.Group>


        </All.Form>
        <Stack direction="row" spacing={4}>
        {/* <button id="buttoncentered" className="btn btn-warning btn-lblockg btn-" onClick={() => this.login()}>Login</button> */}
                <Button className="botones" variant="contained" onClick={() => this.login()} endIcon={<LoginOutlinedIcon />} >
          Login
        </Button>
        {/* <Button className="botones" variant="contained" endIcon={<PasswordOutlinedIcon />}>
          Recuperar Contraseña
        </Button> */}
        
        </Stack>
</Grid>
      </Grid>
    )
  }
};

export default Login;