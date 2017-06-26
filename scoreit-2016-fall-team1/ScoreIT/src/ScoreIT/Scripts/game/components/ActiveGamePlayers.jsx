import React from 'react';
import { connect } from 'react-redux';

import ActiveGamePlayer from './ActiveGamePlayer';
import { fetchPlayerProfile } from '../../modal/actions';
import PlayerProfileModalContainer from './PlayerProfileModalContainer';

class ActiveGamePlayers extends React.Component {
    constructor(props) {
        super(props);

        this.generatePlayers = this.generatePlayers.bind(this);
        this.onPlayerClick = this.onPlayerClick.bind(this);
    }

    onPlayerClick(player) {
        this.props.dispatch(fetchPlayerProfile(player.id, 2));
    }

    generatePlayers(array) {
        return array.map(player => (
            <ActiveGamePlayer
                onPlayerClick={this.onPlayerClick}
                key={player.userName}
                player={player}
                />
        ));
    }

    render() {
        return (
            <section className="game-play-players">
                <PlayerProfileModalContainer />
                <h1>
                    Playing Teams
      </h1>
                <div className="game-play-players-group blue">
                    {this.generatePlayers(this.props.teamBluePlayers)}
                </div>
                <div className="game-play-players-group red">
                    {this.generatePlayers(this.props.teamRedPlayers)}
                </div>
            </section>
        );
    }
}

ActiveGamePlayers.propTypes = {
    dispatch: React.PropTypes.func,

};

export default connect()(ActiveGamePlayers);
