import React, { PropTypes } from 'react';

const Message = ({ text, onClick, color }) => (
    <div className={`alert ${color}`}>
        {text}
        <button className="icon-close" onClick={onClick} />
    </div>
);

Message.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
};


export default Message;
