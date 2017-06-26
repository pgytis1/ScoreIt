import React from 'react';

const ModalWindow = (props) => {
    if (props.isOpen === false) {
        return null;
    } else {
        return (
            <div className="modal" >
                <div className="modal-header">
                    <button className="modal-close icon-close" onClick={props.onClose} />
                    <h1>
                        {props.title}
                    </h1>
                </div>
                <div className="modal-content" >
                    {props.children}
                </div>
            </div>
        );
    }
};

ModalWindow.propTypes = {
    isOpen: React.PropTypes.bool,
    onClose: React.PropTypes.func,
    title: React.PropTypes.string,
    children: React.PropTypes.element
};


export default ModalWindow;
