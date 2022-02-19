
import React from 'react'
import { CSVLink } from 'react-csv'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSortDown,faFileExcel } from '@fortawesome/free-solid-svg-icons'

export const Modal = ({titulo}) => {
    return (
        <div>
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false" aria-hidden="true">
<div className="modal-dialog" role="document">
  <div className="modal-content">
    <div className="modal-header">
      <h5 className="modal-title" id="exampleModalLabel">{titulo}</h5>
      <button id="cerraragregado" type="button"  className="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="modal-body">
      {/* contenido del modal */}
      <h2>Vista Previa</h2>
     <iframe id="pdf" class="pdfpreview"></iframe>      
      
    </div>
    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
  </div>
</div>
</div>
</div>
    )
}
