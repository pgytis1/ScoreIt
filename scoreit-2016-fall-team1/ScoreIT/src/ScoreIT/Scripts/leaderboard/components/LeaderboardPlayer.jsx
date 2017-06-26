import React from 'react';
import Image from '../../otherComponents/Image';

const LeaderboardPlayer = ({ player, i, onClick }) => {
     function placeBadge(index) {
        switch (index) {
            case 0:
                return <i className="badge gold">1st</i>;
            case 1:
                return <i className="badge silver">2nd</i>;
            case 2:
                return <i className="badge bronze">3rd</i>;
            default:
                break;
        }
     }

    return(
        <a key={i} className="player" onClick={() => onClick(player.id)} >

        <div className="player-place">
            {i + 1}.
      </div>

        <div className="player-avatar" >            
            <Image
                image={player.avatar}
                style={{ borderRadius: '50%', width: '54px', height: '54px' }}
                />
                 
            <span className="level">
                <i>{player.level}</i>
            </span>
            {placeBadge(i)}
        </div>

        <div className="player-meta" href="javascript:void(0)">
            <span className="player-name">
                {player.userName}
            </span>

            <span className="player-level">
                {player.rankName}
            </span>

            <span className="player-stats">
                <i>/</i> W
        <strong> {player.wins}</strong>

                <i>/</i> L
        <strong> {player.losses}</strong>
            </span>
        </div>

        <i className="icon-chevron" />
    </a>
    );
}

export default LeaderboardPlayer;
