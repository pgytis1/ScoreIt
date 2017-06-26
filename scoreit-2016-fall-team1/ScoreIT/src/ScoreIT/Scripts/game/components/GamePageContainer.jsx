import React from 'react';
import { connect } from 'react-redux';

import GameSetup from './GameSetup';
import FinishedGame from './FinishedGame';
import ActiveGame from './ActiveGame';
import { fetchUnfinishedGame, finishGame, startNewGame, cancelGame } from '../actions';
import MessagesContainer from '../../messages/components/MessagesContainer';

class GamePageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleFinishGame = this.handleFinishGame.bind(this);
        this.handleStartGame = this.handleStartGame.bind(this);
        this.handleCancelGame = this.handleCancelGame.bind(this);
        this.handleRematch = this.handleRematch.bind(this);
        this.isGameActive = this.isGameActive.bind(this);
        this.isGameInSetup = this.isGameInSetup.bind(this);
        this.isGameFinished = this.isGameFinished.bind(this);
    }

    componentDidMount() {
        if(this.props.gameStatus === null)
            this.props.dispatch(fetchUnfinishedGame(this.props.gameStatus));
    }

    handleStartGame(player1Id, player2Id, player3Id, player4Id, goalLimit) {
        this.props.dispatch(startNewGame(
            player1Id,
            player2Id,
            player3Id,
            player4Id,
            goalLimit,
        ));
    }

    handleFinishGame() {
        this.props.dispatch(finishGame(this.props.gameId));
    }

    handleRematch() {
        this.props.dispatch(startNewGame(
            this.props.team1Player1Profile.id,
            this.props.team1Player2Profile.id,
            this.props.team2Player1Profile.id,
            this.props.team2Player2Profile.id,
            this.props.goalLimit
        ));
    }

    handleCancelGame() {
        this.props.dispatch(cancelGame(this.props.gameId));
    }


    isGameInSetup() {
        return this.props.gameStatus === 'inSetup';
    }

    isGameActive() {
        return this.props.gameStatus === 'active';
    }

    isGameFinished() {
        return this.props.gameStatus === 'finished';
    }

    render() {
        let element;
        if (this.isGameInSetup()) {
            element = <GameSetup onStart={this.handleStartGame} />;
        } else if (this.isGameActive()) {
            element = (<ActiveGame
              onCancel={this.handleCancelGame}
              onFinish={this.handleFinishGame}
            />);
        } else if (this.isGameFinished()) {
            element = <FinishedGame onRematch={this.handleRematch} />;
        } else {
            element = <div className="loading" />;
        }

        return (
            <div>
                <MessagesContainer />
                <div className="page-game">
                    {element}
                </div>
            </div>
        );
    }
}

GamePageContainer.propTypes = {
    gameStatus: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
    team1Player1Profile: React.PropTypes.object,
    team1Player2Profile: React.PropTypes.object,
    team2Player1Profile: React.PropTypes.object,
    team2Player2Profile: React.PropTypes.object,
    gameId: React.PropTypes.number


};

function mapStateToProps(state) {
    return {
        gameStatus: state.game.status,
        team1Player1Profile: state.game.team1Player1Profile,
        team1Player2Profile: state.game.team1Player2Profile,
        team2Player1Profile: state.game.team2Player1Profile,
        team2Player2Profile: state.game.team2Player2Profile,
        goalLimit: state.game.goalLimit,
        gameId: state.game.gameId

    };
}

export default connect(mapStateToProps)(GamePageContainer);

