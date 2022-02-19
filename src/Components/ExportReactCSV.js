import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSortDown,faFileExcel } from '@fortawesome/free-solid-svg-icons'

export const ExportReactCSV = ({csvData, fileName}) => {
    return (
        <Button variant="success" className="sizefixed" >
            <FontAwesomeIcon icon={faFileExcel} /><CSVLink className="lnkblanco" data={csvData} filename={fileName}>Exportar</CSVLink>
        </Button>
    )
}