import React from 'react';
import PropTypes from 'prop-types';

const Error = ({mensaje}) => {
    return ( 
        <p className="my-3 p-4 text-center text-danger alert alert-warning">{mensaje}</p>
     );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}
 
export default Error;