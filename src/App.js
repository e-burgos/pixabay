import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  // states del componente principal
  const [ busqueda, guardarBusqueda ] = useState('');
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);

  // Cuando la busqueda cambie queremos que se ejecute, para ello usamos useEffect
  useEffect( () => {
    
    const consultarAPI = async() => {
      // En caso de encontrar un string vacio (primer carga) no queremos que se efecute por lo tanto
      if (busqueda === '') return;

      const imagePerPag = 30;
      const key = '18458285-04fd7cdbe4712a73d849213fc';
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagePerPag}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // Calcular el total de paginas 
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagePerPag);
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth' });
    }
    consultarAPI();

  }, [busqueda, paginaactual] )

    // Definir la pagina anterior 
    const paginaAnterior = () => {
      const nuevaPaginaActual = paginaactual - 1;
      if ( nuevaPaginaActual === 0 ) return;
      guardarPaginaActual(nuevaPaginaActual); 
    };

    // Definir la pagina siguiente 
    const paginaSiguiente = () => {
      const nuevaPaginaActual = paginaactual + 1;
      if (nuevaPaginaActual > totalpaginas) return;
      guardarPaginaActual(nuevaPaginaActual);
    };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes imagenes={imagenes} />
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {paginaactual === 1 ? null : (
            <li className="page-item">
              <a
                type="button"
                className="page-link"
                href="#!"
                onClick={paginaAnterior}
              >
                &laquo; Anterior
              </a>
            </li>
          )}

          {busqueda ? (
            <li className="page-item">
              <a className="page-link" href="#!">
                {paginaactual} de {totalpaginas}
              </a>
            </li>
          ) : null}

          {paginaactual === totalpaginas ? null : (
            <li className="page-item">
              <a
                type="button"
                className="page-link"
                href="#!"
                onClick={paginaSiguiente}
              >
                Siguiente &raquo;
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default App;
