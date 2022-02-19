import { BrowserRouter as Router, Switch, Route, Redirect, Link, useHistory, useLocation } from 'react-router-dom';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import * as All from 'react-bootstrap/';
import swal from 'sweetalert'
import Cookies from 'js-cookie'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clase: ""
        };
        // this.handleToggle = this.handleToggle.bind(this);
        document.title = "Create User";
    }



    render() {
        return (
            <div>
<h1>Bienvenido {Cookies.get('Nombre')}</h1>
            </div>

        );
    }
}
export default Dashboard;
