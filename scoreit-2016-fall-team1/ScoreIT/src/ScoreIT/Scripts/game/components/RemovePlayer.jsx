import React from 'react';

const RemovePlayer = props => (
    <div>
        <p>Are you sure want to remove the player?</p>
        <button className="button red" onClick={props.onYes}>
            Yes
        </button>
        <button className="button blue" onClick={props.onNo}>
            No
        </button>
    </div>
);

RemovePlayer.propTypes = {
    onYes: React.PropTypes.func,
    onNo: React.PropTypes.func
};

export default RemovePlayer;
