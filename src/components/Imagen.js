import React from 'react';
import PropTypes from "prop-types";

const Imagen = ({imagen}) => {

    // Extraemos las variables de la API
    const { largeImageURL, imageWidth, imageHeight, pageURL, likes, downloads, type, tags, views, previewURL, user } = imagen;

    return (
      <div className="card">
        <img src={previewURL} className="card-img-top" alt={tags} />
        <div className="card-body">
          <h5 className="card-title text-center">Fuente: &nbsp; 
            <a 
                href={pageURL} 
                target="blank"
                rel="noopener noreferrer"
            >
                {user}
            </a>
          </h5>
          <p className="card-text text-center">Etiquetas: {tags}</p>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item small">Descargas: {downloads}   <span className="text-danger float-right">Likes: {likes}</span></li>
            <li className="list-group-item small">Tipo: {type}   <span className="text-danger float-right">Vistas: {views}</span></li>
            <li className="list-group-item small">Alto: {imageWidth}px <span className="float-right">Ancho: {imageHeight}px</span></li>
        </ul>
        <div className="card-footer">
          <a 
            href={largeImageURL} 
            target="_blank"
            rel="noopener noreferrer" 
            className="btn btn-primary btn-block"
          >
            Descargar
          </a>
        </div>
      </div>
    );
}

Imagen.propTypes = {
  imagen: PropTypes.object.isRequired,
};
 
export default Imagen;