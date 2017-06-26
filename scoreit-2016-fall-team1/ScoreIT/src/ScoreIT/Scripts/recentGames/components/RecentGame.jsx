import React from 'react';

import { Team1 } from '../../constants';

const RecentGame = ({ recentGame, index, currentPlayerUsername }) => {
    let recentGameClassName = 'history-item';

    if (recentGame.winner === Team1) {
        recentGameClassName += ' win';
    } else {
        recentGameClassName += ' loss';
    }


    let score = [,recentGame.team1Score, recentGame.team2Score];
    let players = [,recentGame.team1Player1UserName, recentGame.team1Player2UserName, recentGame.team2Player1UserName, recentGame.team2Player2UserName];
    if (currentPlayerUsername !== null) {
        if (currentPlayerUsername === recentGame.team2Player1UserName || currentPlayerUsername === recentGame.team2Player2UserName) {
            players = [,recentGame.team2Player1UserName, recentGame.team2Player2UserName, recentGame.team1Player1UserName, recentGame.team1Player2UserName];
            score = [,recentGame.team2Score, recentGame.team1Score];
            recentGameClassName = (recentGame.winner === Team1 ? 'history-item loss' : 'history-item win');
        }
    }

    return (
        <li className={recentGameClassName} key={index}>
            <div className="history-item-team">
                {players[1]}
                <br />
                {players[2]}
            </div>
            <div className="history-item-result">
                {score[1]}:{score[2]}
            </div>
            <div className="history-item-team">
                {players[3]}
                <br />
                {players[4]}
            </div>
        </li>
    );
};

RecentGame.propTypes = {
    recentGame: React.PropTypes.shape({
        team1Player1UserName: React.PropTypes.string.isRequired,
        team1Player2UserName: React.PropTypes.string.isRequired,
        team2Player1UserName: React.PropTypes.string.isRequired,
        team2Player2UserName: React.PropTypes.string.isRequired,
        team1Score: React.PropTypes.number.isRequired,
        team2Score: React.PropTypes.number.isRequired,
    }).isRequired,
    index: React.PropTypes.number.isRequired,
    currentPlayerUsername: React.PropTypes.string
};

export default RecentGame;
