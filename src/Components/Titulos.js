
import React, { Component } from 'react';

class Titulo extends React.Component { 
render() {
        
        return (
            <div>
           <h1 class="titulopage">{this.props.titulo}</h1>
                <h2>{this.props.subtitulo}</h2>
                <br></br>
            </div>

        );    }
}
export default Titulo;