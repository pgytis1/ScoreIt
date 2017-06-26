import React from 'react';
import { connect } from 'react-redux';

import ActiveGamePlayers from './ActiveGamePlayers';
import ActiveGameScoreBoard from './ActiveGameScoreBoard';

class ActiveGame extends React.Component {
    render() {
        return (
            <section className="game-play" >
                <ActiveGameScoreBoard />
                <ActiveGamePlayers
                  teamBluePlayers={[
                      this.props.team1Player1Profile,
                      this.props.team1Player2Profile
                  ]}
                  teamRedPlayers={[
                      this.props.team2Player1Profile,
                      this.props.team2Player2Profile
                  ]}
                />
                <div className="game-play-controls">
                    <button
                      onClick={this.props.onFinish}
                      className="button"
                    >
                        Finish Game
          </button>
                    <button
                      onClick={this.props.onCancel}
                      className="button borderless"
                    >
                        Cancel Game
          </button>
                </div>
            </section>
        );
    }
}

ActiveGame.propTypes = {
    onFinish: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    team1Player1Profile: React.PropTypes.object.isRequired,
    team1Player2Profile: React.PropTypes.object.isRequired,
    team2Player1Profile: React.PropTypes.object.isRequired,
    team2Player2Profile: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        team1Player1Profile: state.game.team1Player1Profile,
        team1Player2Profile: state.game.team1Player2Profile,
        team2Player1Profile: state.game.team2Player1Profile,
        team2Player2Profile: state.game.team2Player2Profile,
    };
}

export default connect(mapStateToProps)(ActiveGame);
