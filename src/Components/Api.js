import moment from 'moment-timezone';
import React from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import $ from 'jquery';
/*
* API Calls
*/
// Export URLS
//dev
export const url_sistema = 'http://157.55.190.127:8001/';
export const API_URL = 'http://157.55.190.127:8001/api/';

const API_CATALOGOS = 'http://fultra.cloudapp.net/Fultra.ApiMerksyst/api/'
const API_URL_SECURITY = 'http://fultra.cloudapp.net/Fultra.Security/api/Security'

const API_URL_LOGGER = 'http://157.55.190.127:8001/api/Logger/logs';
const API_URL_SHIPPMENT = 'http://fultra.cloudapp.net/Fultra.Shipment/'
//  const API_URL_SHIPPMENT = 'https://localhost:44318/'
const API_URL_BANORTE = 'http://157.55.190.127:8001/api/Merksyst/'
const USER_INFO = {
	isMobile: function () {
		var check = "0";
		(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(a.substr(0, 4))) check = "1"; })(navigator.userAgent || navigator.vendor || window.opera);
		return check;
	},

	getBrowser: function () {

		if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
			return ('Opera');
		}
		else if (navigator.userAgent.indexOf("Chrome") !== -1) {
			return ('Chrome');
		}
		else if (navigator.userAgent.indexOf("Safari") !== -1) {
			return ('Safari');
		}
		else if (navigator.userAgent.indexOf("Firefox") !== -1) {
			return ('Firefox');
		}
		else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) //IF IE > 10
		{
			return ('IE');
		}
		else {
			return ('NA');
		}
	},

	getTimeZone: moment.tz.guess(),
	getLanguage: navigator.language
}

export function api_handleErrors(response) {
	if (!response.ok) {

		console.log(response);

		// if(response.status === 401 && response.url !== API_URL+"/api/validate-page-access-2/" && response.url !== API_URL+"/oauth/token/"){
		// 	alert("Your session has expired. Please log in again.");
		// 	document.location.href="/#/login/";
		// }

		if (process.env.NODE_ENV === 'production' && false) { /* @@@@@@@@@@@@@@ DESHABILITADO */
			console.log("running prod");
			var headers = [];
			response.headers.forEach(item => { headers.push(item) });
			headers = headers.join();


			var log = {
				url: response.url,
				status: response.status,
				headers: headers,
				body: {},
				extra: {
					userInfo: {
						customerId: "1" || "0",
						isMobile: USER_INFO.isMobile(),
						browser: USER_INFO.getBrowser() || 'NA',
						timezone: USER_INFO.getTimeZone || 'NA',
						language: USER_INFO.getLanguage || 'NA'
					}
				}

			}


			response.clone().text().then(function (text) {
				log.body = text ? JSON.parse(text) : {};
				fetch(API_URL_LOGGER, {
					method: 'POST',
					body: JSON.stringify(log),
					headers: {
						'Content-Type': 'application/json',
						'Accept': 'application/json'
					}
				});
				return null;
			});



		}
		throw response;
	}
	return response;
}
//oficinas y destinos
export function Api_getOfficesPSV(data,token) {
	return fetch(API_URL_SHIPPMENT + 'api/Catalog/Office', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getDestinyPSV(data,token) {
	return fetch(API_URL_SHIPPMENT + 'api/Catalog/ClientAdress', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getProviderAdress(token){
	return fetch(API_URL_SHIPPMENT + 'api/Catalog/ProviderAddress', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getallOffices(token){
	return fetch(API_URL_SHIPPMENT + 'api/Catalog/SucursalDestiny', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
// shippments
export function Api_getdrivers(data,token) {
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/Driver', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}

export function Api_GetTrucks(data,token) {
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/Truck', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_reporteexterno(data,token){
	debugger;
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/LogSend', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
	
}
export function Api_downloadfile(data,token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/DownloadFile', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_SendMailExterno(data,token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/SendDataProvider', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getInvoices(data,token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/Invoice', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getproveedores(data,token) {
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/Provider', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getinvoicesdetail(data,token) {
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/InvoiceDetail', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}

/* General ================= */



export function Api_UnidadesdeNegocio() {
	var datos = {
		"cia": null
	  }
	return fetch(API_CATALOGOS + 'Catalog/Cia', {
		method: 'POST',
		body: JSON.stringify(datos),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_getclientes() {
	return fetch(API_URL_BANORTE + 'UnidadesdeNegocio/GetClientesPMR/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_generaLayoutMerksyst(data) {
	return fetch(API_URL_BANORTE + 'UnidadesdeNegocio/Banorte/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_OCStatus(unidad) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/OCStatus/' + unidad, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}


export function Api_login(data) {
	return fetch(API_URL_SECURITY, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}

export function Api_ValidateAccess(data) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/ValidateAccess/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_PermisosByUser(id, unidad) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/PermisosByUser/' + id + '/' + unidad, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}


export function Api_GetOCModified(data) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/OCModifiedList/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function api_geticons(token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/GetIcons', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_GetMenubyuser(token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/GetMenuByUser', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getMenusPermission(data,token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/GetMenusPermission', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_GetMenus(token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/GetMenus', {
		method: 'GET',		
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function api_savemenu(data,token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/SaveMenus', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_savePermissions(data,token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/SavePermissions', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_GetUsersPSV(token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/GetUsersPSV', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}
export function Api_getusersPMR(token){
	return fetch(API_URL_SHIPPMENT + 'api/Shipment/GetUsersPMR', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+token
		}
	})
}

export function Api_Getdatamenu(id) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/Getdatamenu/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_GetdataSubmenu(id) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/GetdataSubmenu/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_SaveDataMenu(data) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/SaveMenu/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_SaveDataSubMenu(data) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/SaveSubMenu/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_GetdataSubmenuById(id) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/GetdataSubmenuById/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_deletesubmenu(id) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/deletesubmenubyid/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_deleteMenu(id) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/deletemenubyid/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_GetMenuPermisosByUser(id) {
	return fetch(API_URL + 'UserPanel/UnidadesdeNegocio/getmenuByUser/' + id, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_GetUsers(data) {
	return fetch(API_URL + 'UserPanel/Users/', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
export function Api_GetParameters() {
	return fetch(API_URL + 'UserPanel/GetParameters/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	})
}
