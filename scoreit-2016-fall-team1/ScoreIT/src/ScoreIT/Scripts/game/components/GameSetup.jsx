import React from 'react';
import { connect } from 'react-redux';

import SelectPlayers from './SelectPlayers';
import GoalLimitSlider from './GoalLimitSlider';
import RemovePlayer from './RemovePlayer';
import ModalWindowForSelection from '../../modal/components/ModalWindowWithSearch';
import ModalWindow from '../../modal/components/ModalWindow';
import Image from '../../otherComponents/Image';
import { LOOK_FOR_PLAYER2, LOOK_FOR_PLAYER3, LOOK_FOR_PLAYER4 } from '../../modal/constants';
import { REMOVE_PLAYER2, REMOVE_PLAYER3, REMOVE_PLAYER4, DEFAULT_GOAL_NUMBER } from '../constants';
import { resetPlayers } from '../actions';

class GameSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectPlayersModalOpen: false,
            isRemovePlayerModalOpen: false
        };

        this.currentGoalLimit = DEFAULT_GOAL_NUMBER;
        this.whichPlayer = null;

        this.handleStartGameClick = this.handleStartGameClick.bind(this);
        this.handleGoalLimit = this.handleGoalLimit.bind(this);
        this.handleSelectTeam1Player2Click = this.handleSelectTeam1Player2Click.bind(this);
        this.handleSelectTeam2Player1Click = this.handleSelectTeam2Player1Click.bind(this);
        this.handleSelectTeam2Player2Click = this.handleSelectTeam2Player2Click.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.handleModalWindowYes = this.handleModalWindowYes.bind(this);
        this.onRemovePlayerModalClose = this.onRemovePlayerModalClose.bind(this);
        this.onGoalLimitSliderChange = this.onGoalLimitSliderChange.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            isSelectPlayersModalOpen: false
        });
    }

    onModalClose() {
        this.setState({
            isSelectPlayersModalOpen: false
        });
    }

    handleStartGameClick() {
        this.props.onStart(
            this.props.blue1Id,
            this.props.blue2Id,
            this.props.red1Id,
            this.props.red2Id,
            this.currentGoalLimit
        );
    }

    handleGoalLimit(event) {
        this.setState({ SliderState: event.target.value });
    }

    handleCancelClick() {
        this.setState({
            isSelectPlayersModalOpen: false,
        });
    }

    handleSelectTeam1Player2Click() {
        this.props.dispatch({
            type: LOOK_FOR_PLAYER2
        });
        this.setState({
            isSelectPlayersModalOpen: true
        });
    }

    handleSelectTeam2Player1Click() {
        this.props.dispatch({
            type: LOOK_FOR_PLAYER3
        });
        this.setState({
            isSelectPlayersModalOpen: true
        });
    }

    handleSelectTeam2Player2Click() {
        this.props.dispatch({
            type: LOOK_FOR_PLAYER4
        });
        this.setState({
            isSelectPlayersModalOpen: true
        });
    }

    handlePlayerRemove(player) {
        if (player === 'player2') {
            this.playerToRemove = REMOVE_PLAYER2;
        } else if (player === 'player3') {
            this.playerToRemove = REMOVE_PLAYER3;
        } else if (player === 'player4') {
            this.playerToRemove = REMOVE_PLAYER4;
        }
        this.setState({
            isRemovePlayerModalOpen: true
        });
    }

    handleModalWindowYes() {
        this.props.dispatch({
            type: this.playerToRemove
        });
        this.setState({
            isRemovePlayerModalOpen: false
        });
    }

    onRemovePlayerModalClose() {
        this.setState({
            isRemovePlayerModalOpen: false
        });
    }

    onGoalLimitSliderChange(value) {
        this.currentGoalLimit = value;
    }

    render() {
        return (
            <div className="page-game">
                <ModalWindowForSelection
                  title="Select a player"
                  isOpen={this.state.isSelectPlayersModalOpen}
                >
                    <SelectPlayers
                      onClose={this.onModalClose}
                    />
                </ModalWindowForSelection>

                <ModalWindow
                  onClose={this.onRemovePlayerModalClose}
                  title={'Remove a player'}
                  isOpen={this.state.isRemovePlayerModalOpen}
                >
                    <RemovePlayer
                      onYes={this.handleModalWindowYes}
                      onNo={this.onRemovePlayerModalClose}
                    />
                </ModalWindow>

                <section className="game-setup" style={{ display: 'block' }}>
                    <h1>Game Setup</h1>
                    <div className="game-setup-players">

                        <div className="game-setup-players-item">
                            <button className="game-setup-players-button blue" disabled>
                                <Image
                                  image={this.props.blue1Avatar}
                                  style={{ width: '92px', height: '92px' }}
                                />
                            </button>

                            <button
                              className="game-setup-players-button blue"
                              onClick={this.props.blue2Id == null ? this.handleSelectTeam1Player2Click : () => this.handlePlayerRemove('player2')}
                            >
                                {this.props.blue2Avatar != null ?
                                    <Image
                                      image={this.props.blue2Avatar}
                                      style={{ width: '92px', height: '92px' }}
                                    />
                                    : ''} <i className="icon-plus" />
                            </button>
                        </div>

                        <div className="game-setup-players-item">
                            <button
                              className="game-setup-players-button red"
                              onClick={this.props.red1Id == null ? this.handleSelectTeam2Player1Click : () => this.handlePlayerRemove('player3')}
                            >
                                {this.props.red1Avatar != null ?
                                    <Image
                                      image={this.props.red1Avatar}
                                      style={{ width: '92px', height: '92px' }}
                                    />
                                    : ''} <i className="icon-plus" />
                            </button>

                            <button
                              className="game-setup-players-button red"
                              onClick={this.props.red2Id == null ? this.handleSelectTeam2Player2Click : () => this.handlePlayerRemove('player4')}
                            >
                                {this.props.red2Avatar != null ?
                                    <Image
                                      image={this.props.red2Avatar}
                                      style={{ width: '92px', height: '92px' }}
                                    />
                                    : ''} <i className="icon-plus" />
                            </button>
                        </div>
                    </div>
                    <GoalLimitSlider
                      onSliderChange={this.onGoalLimitSliderChange}
                    />
                    <a
                      className="button"
                      onClick={this.handleStartGameClick}
                    >
                        Start Game
                    </a>
                </section>

            </div>
        );
    }
}

GameSetup.propTypes = {
    blue1Id: React.PropTypes.number,
    blue2Id: React.PropTypes.number,
    red1Id: React.PropTypes.number,
    red2Id: React.PropTypes.number,
    blue1Avatar: React.PropTypes.string,
    blue2Avatar: React.PropTypes.string,
    red1Avatar: React.PropTypes.string,
    red2Avatar: React.PropTypes.string,
    dispatch: React.PropTypes.func,
    onStart: React.PropTypes.func
};

function mapStateToProps(state) {
    return {
        blue1Id: state.user.id,
        blue1Avatar: state.user.avatar,
        blue2Avatar: state.game.team1Player2Avatar,
        blue2Id: state.game.team1Player2Id,
        red1Avatar: state.game.team2Player1Avatar,
        red1Id: state.game.team2Player1Id,
        red2Avatar: state.game.team2Player2Avatar,
        red2Id: state.game.team2Player2Id,
        goalLimit: state.game.goalLimit
    };
}

export default connect(mapStateToProps)(GameSetup);
