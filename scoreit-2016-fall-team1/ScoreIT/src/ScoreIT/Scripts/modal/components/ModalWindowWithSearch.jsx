import React from 'react';



// modal classname and button had to be put inside the children (SelectPlayers component)
// in order for infinity scroll to work
// so this class is not doing much at the moment
const ModalWindowWithSearch = ({ isOpen, title, children }) => {
    if (isOpen === false) {
        return null;
    }

    return (
        <div >
            {children}
        </div>
    );
};

ModalWindowWithSearch.propTypes = {
    isOpen: React.PropTypes.bool,
    title: React.PropTypes.string,
    children: React.PropTypes.element
};


export default ModalWindowWithSearch;
