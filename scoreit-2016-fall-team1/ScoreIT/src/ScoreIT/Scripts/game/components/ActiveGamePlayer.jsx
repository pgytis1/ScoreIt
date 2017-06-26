import React from 'react';

import Image from '../../otherComponents/Image';

const ActiveGamePlayer = ({ player, onPlayerClick }) => (
    <a href="javascript:void(0)" className="player" onClick={() => onPlayerClick(player)} >
        <div className="player-avatar">
            <Image
              image={player.avatar}
              style={{ borderRadius: '50%', width: '54px', height: '54px' }}
            />
            <span className="level">
                <i>{player.level}</i>
            </span>
        </div>
        <div className="player-meta">
            <span className="player-name">
                {player.userName}
            </span>

            <span className="player-level">
                {player.rankName}
            </span>
            <span className="player-stats">
                <i>/</i> W
        <strong>{player.wins}</strong>
                <i>/</i> L
        <strong>{player.losses}</strong>
            </span>
        </div>
        <i className="icon-chevron" />
    </a>
);

ActiveGamePlayer.propTypes = {
    player: React.PropTypes.shape({
        level: React.PropTypes.number.isRequired,
        userName: React.PropTypes.string.isRequired,
        rankName: React.PropTypes.string.isRequired,
        wins: React.PropTypes.number.isRequired,
        losses: React.PropTypes.number.isRequired,
    }),
    onPlayerClick: React.PropTypes.func.isRequired
};

export default ActiveGamePlayer;
