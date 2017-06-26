import React from 'react';

const Image = ({ image = '', alt = '', style }) => (
    <img
        src={`data:image/png;base64,${image}`}
        alt={alt}
        style={style}
        />
);

Image.propTypes = {
    image: React.PropTypes.string,
    alt: React.PropTypes.string,
    style: React.PropTypes.object
};

export default Image;
