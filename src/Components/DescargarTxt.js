import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSortDown,faFileExcel, faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { FaFile, FaFileCode, FaFileInvoice, FaRegFileCode,FaFileAlt} from 'react-icons/fa';

export const DescargarTxt = ({ruta, fileName}) => {
    return (
        <Button type="button" class="sizefixed btn btn-warning"><i class="fas fa-file-alt"></i><a download={fileName} class="lnkblanco" target="_self" href={"blob:http://localhost:3000/descargas/"+ruta}>Generar</a></Button>
        
    )
}
