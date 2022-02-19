import * as React from 'react';
import { styled } from '@mui/material/styles';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Button  from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MoveToInboxRoundedIcon from '@mui/icons-material/MoveToInboxRounded';
import MailIcon from '@mui/icons-material/Mail';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import './Sidebar.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Badge from '@mui/material/Badge';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import CargaDatos from './CargaDatos';
import Login from './Login'
import FacturasDashboard from './FacturasDashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateMenu from './CreateMenu'
import Users from './Users';
import Permisos from './Permisos'
import Parametros from './Parametros'
import GeneraLayoutMerksyst from './GeneraLayoutMerksyst'
import { NoMatch } from './NoMatch'
import Dashboard from './Dashboard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ProgramarEmbarques from './ProgramarEmbarques'
import EntregaClientes from './EntregaClientes'
import swal from 'sweetalert';
import { Collapse } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import CountertopsIcon from '@mui/icons-material/Countertops';
import ReporteSeguimientoEnvios from './ReporteSeguimientoEnvios'
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReporteReprogramaciones from './ReporteReprogramaciones';
import Reprogramaciones from './Reprogramaciones'
import Recolecciones from './Recolecciones'
import EntregasMostrador from './EntregasMostrador'
import EnvioExterno from './EnvioExterno';
import Downloader from './Downloader'
import { createBrowserHistory } from "history";
import ReporteEnviosExternos from './ReporteEnviosExternos';
import Menus from './Menus';
import { Api_GetMenubyuser,api_handleErrors } from './Api';
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
import SecurityIcon from '@mui/icons-material/Security';
import SummarizeIcon from '@mui/icons-material/Summarize';
import FlagIcon from '@mui/icons-material/Flag';
import Icon from "./icon";

const history = createBrowserHistory()

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" severity="success" {...props} />;
});
const openedMixin = (theme) => ({
  width: 240,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 240,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

class SideBarMenu extends React.Component{
    
    constructor(props) {
		super(props);
		this.state = {
      activated : false,
       nombre : "",
      drawerwidth : 240,
      notificaciones : 1,
      notificacionactiva : false,
      vertical : "bottom",
      horizontal : "right",
      Trasnsition : "SlideTransition",
      islogged : false,
      havemenus : false,
      ListaMenus : [{
        "idMenu": 20,
        "title": "Embarques",
        "path": "pruebaembarques",
        "icon": "LocalShipping",
        "active": true,
        "order": null,
        "idMenuFather": 0,
        "level": null,
        "subMenus": [
            {
                "idMenu": 19,
                "title": "Demo programacion emb.",
                "path": "ProgramacionEmbarques",
                "icon": "Assessment",
                "active": true,
                "order": null,
                "idMenuFather": 20,
                "level": null,
                "subMenus": null,
                "padre": null
            },
           
        ],
        "padre": null
    }],
      openedmenu : false,
      openedmenu20 : false,
      openedmenu40 : false,
        };
        this.setOpen = this.setOpen.bind(this);
        this.handleClosenotification = this.handleClosenotification.bind(this);
        this.expandemenu = this.expandemenu.bind(this);
		// this.login = this.login.bind(this);
		document.title = "Layout Merksyst";
    }
    setOpen(dato){
        this.setState({'activated':dato})
      };
      handleClosenotification = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      
        this.setState({'notificacionactiva':false});
      };
      handleShowNotification = () =>{
        this.setState({'notificacionactiva':true});
      }
     handleDrawerOpen = () => {
        this.setOpen(true);
      };
    
       handleDrawerClose = () => {
        this.setOpen(false);
      };
      expandemenu(data){
        debugger;
        var stado = "openedmenu"+data
        if(this.state[stado]){
          
          this.setState({[stado]:false});        
        }
        else{
          this.setState({[stado]:true});
        }
      }

 validatemenu(slug){
if(this.state.ListaMenus.find(({ name }) => name === slug)){
<React.Redirect to={slug} />
}
else{
  swal("Prohibido", "No tienes permisos para este menu!", "warning");
}
 }
 cerrarsesion(){
  swal({
    title: "Cerrar sesion?",
    text: "",
    icon: "warning",
    buttons: ["Cancelar", "Cerrar sesion"],
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      Cookies.remove('Nombre');
      Cookies.remove('Token');
      window.location.replace("/Login");   
    } 
  });
 }
 UNSAFE_componentWillMount(){
   debugger;
  var token = Cookies.get('Token');
  var datos = {
  }
 }
componentDidMount() {   
  this.setState({islogged:true});
}

    render() {

debugger;

      // if(this.state.islogged===true && this.state.havemenus===true){
        if(window.location.href.includes("Downloadpage")){
         var idarchivo=window.location.href.split('?file=');
          return (<Downloader idarchivo={idarchivo[1]}></Downloader>);
        }
        if(this.state.islogged===true){
  return (
    <Box sx={{ display: 'flex' }} >
      {/* <CssBaseline /> */}
      <AppBar position="fixed" className="xdd " open={this.state.activated}>
        <Toolbar>

        <Box sx={{ flexGrow: 1 }}>
        <IconButton
            color="inherit"
            aria-label="open drawer"
            className="pulledleft"
            onClick={this.handleDrawerOpen}
            edge="start"
            sx={{
              ...(this.state.activated && { display: 'none' }),
              'color': {color : 'white'} ,'&:hover': { backgroundColor: 'orange' }
            }}
          >
            <MenuIcon sx={{ 'color': {color : 'white'} ,'&:hover': { backgroundColor: 'orange' }}}/>
          </IconButton>
        </Box>
        <Divider orientation="vertical" flexItem />
        {/* <Button variant="outlined" onClick={this.handleShowNotification}>
        Probar notificaciones
      </Button> */}
        <Divider orientation="vertical" flexItem />
         
        <section className="pulledright">
          <Tooltip title={this.state.nombre} variant="contained">
          
          <label><AccountCircleIcon/>{this.state.nombre} - {this.state.puesto}</label>            
          </Tooltip>        
          {/* <Badge badgeContent={this.state.notificaciones} color="error"> */}
          {/* <Popper open={true}  placement={"right"} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>          
          </Fade>
        )}
      </Popper> */}

            {/* <IconButton  sx={{ 'color': {color : 'white'} ,'&:hover': { backgroundColor: 'orange' }}} aria-label="Cerrar sesion">
            <CircleNotificationsIcon />
            </IconButton>
          </Badge>  */}
          <Tooltip title="Cerrar Sesion">
            <IconButton onClick={()=>this.cerrarsesion()} sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}}aria-label="Cerrar sesion">
            <LogoutIcon />
            </IconButton>
          </Tooltip>
          </section>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
      <Drawer variant="permanent"  open={this.state.activated}  >
        <DrawerHeader align="left">
        <img src="icono.png" width="65%"></img>
          <IconButton onClick={this.handleDrawerClose}>
            {this.state.activated==false ? <ChevronRightIcon /> : <ChevronLeftIcon sx={{ 'color': {color : 'white'}}} />}
          </IconButton>
        </DrawerHeader>
        <Divider />          
           <List className="sidebar-ful">   
           {this.state.ListaMenus.map((menus,index) =>
            <>        
          <ListItemButton onClick={() =>this.expandemenu(menus.idMenu)}>
              <ListItemIcon edge="start" sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}} >
              <Icon  name={menus.icon} />  
              </ListItemIcon>
          <ListItemText edge="start" sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}} primary={menus.title} >
            </ListItemText>
        {this.state["openedmenu"+menus.idMenu]===true ? <ExpandLess  edge="start" sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}}/>
        : <ExpandMore edge="start" sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}} />
        }
           </ListItemButton>
         {menus.subMenus.map((element,index) => {      
       return(
           <Collapse in={this.state["openedmenu"+menus.idMenu]} timeout="auto" >
           <List component="div" className="sidebar-ful" disablePadding>
           <ListItem button sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}}  component="a" href={"/"+element.path} key={index}>
                 
                    <Icon sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}} name={element.icon} />  
                              
                 <ListItemIcon  edge="start" sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}}>                  
                 </ListItemIcon>
                <ListItemText  sx={{ 'color': {color : 'white'}, '&:hover': { backgroundColor: 'orange' }}}  primary={element.title} />
              </ListItem>
           </List>
         </Collapse>)          
         })}   
          </>
          )}
        </List>                                           
      
     
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Snackbar anchorOrigin={{vertical : this.state.vertical,horizontal : this.state.horizontal}}  TransitionComponent={this.state.Transition}  open={this.state.notificacionactiva} autoHideDuration={60000}  key={this.state.vertical + this.state.horizontal} onClose={this.handleClosenotification}>
        <Alert id="alerta" onClose={this.handleClosenotification} severity="warning"sx={{ width: '100%' }}>
          Test de notificaciones.
        </Alert>
      </Snackbar>
      
        <DrawerHeader />
       {/* parte para switchear el content */}
       <Router>
        <Switch>
          <Route exact path="/GenerarResponsivas" component={CargaDatos}/>
          <Route exact path="/Login" component={Login} />

          <Route path="/FacturasDashboard" component={FacturasDashboard} />
          <Route path="/CreateMenu" component={CreateMenu} />
          <Route path="/Users" component={Users} />
          <Route path="/Users" component={Users} />
          <Route path="/Permisos" component={Permisos} />
          <Route path="/Parametros" component={Parametros} />
          <Route path="/GenerarLayout" component={GeneraLayoutMerksyst}/>
          <Route path="/ProgramacionEmbarques" component={ProgramarEmbarques}/>
          <Route path="/EntregaClientes" component={EntregaClientes}/>
          <Route path="/ReporteSeguimientoEnvios" component={ReporteSeguimientoEnvios}/>
          <Route path="/ReporteReprogramaciones" component={ReporteReprogramaciones}/>
          <Route path="/Reprogramaciones" component={Reprogramaciones}/>
          <Route path="/Recoleccion" component={Recolecciones}/>
          <Route path="/EntregasMostrador" component={EntregasMostrador}/>
          <Route path="/EnvioExterno" component={EnvioExterno}/>
          <Route path={"/ReporteEnviosExternos"} component={ReporteEnviosExternos}/>
          <Route path={"/Menus"} component={Menus}/>
                    <Route path="/" component={Dashboard}/>      
                  <Route path="/Downloadpage:id" component={Downloader}/>                   
          <Route component={NoMatch} />
        </Switch>
       
      </Router>
      </Box>
      </BrowserRouter>
    </Box>
 
  );
          }
          else{
            return <Login></Login>
          }
}
}

export default SideBarMenu;
