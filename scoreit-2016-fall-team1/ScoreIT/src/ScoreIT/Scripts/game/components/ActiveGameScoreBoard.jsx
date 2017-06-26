import React from 'react';
import { connect } from 'react-redux';

import { updateScore } from '../actions';
import { Team1, Team2 } from '../../constants';

class ActiveGameScoreBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isControlDisabled: false
        };
        this.handleScoreChange = this.handleScoreChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            isControlDisabled: false
        });
    }

    handleScoreChange(value, team) {
        this.props.dispatch(updateScore(value, team, this.props.game.gameId));
        this.setState({
            isControlDisabled: true
        });
    }
    render() {
        return (
            <div className="game-play-scoreboard">
                <h1>Quick Game</h1>
                <div className="game-play-scoreboard-item blue">
                    <button className="icon-minus" disabled={this.state.isControlDisabled | this.props.game.scoreTeamBlue === 0} onClick={() => { this.handleScoreChange(-1, Team1); }} />
                    <input type="text" readOnly value={this.props.game.scoreTeamBlue} />
                    <button className="icon-plus" disabled={this.state.isControlDisabled} onClick={() => { this.handleScoreChange(1, Team1); }} />
                </div>
                <div className="game-play-scoreboard-item red">
                    <button className="icon-minus" disabled={this.state.isControlDisabled | this.props.game.scoreTeamRed === 0} onClick={() => { this.handleScoreChange(-1, Team2); }} />
                    <input className="text" readOnly value={this.props.game.scoreTeamRed} />
                    <button className="icon-plus" disabled={this.state.isControlDisabled} onClick={() => { this.handleScoreChange(1, Team2); }} />
                </div>
            </div>
        );
    }

}

ActiveGameScoreBoard.propTypes = {
    game: React.PropTypes.shape({
        gameId: React.PropTypes.number,
        status: React.PropTypes.string,
        scoreTeamRed: React.PropTypes.number,
        scoreTeamBlue: React.PropTypes.number,
        isFinished: React.PropTypes.bool,
    }).isRequired,
    dispatch: React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        game: state.game,
    };
}

export default connect(mapStateToProps)(ActiveGameScoreBoard);
