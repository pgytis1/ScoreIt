import React from 'react';
import { connect } from 'react-redux';

import ModalWindow from '../../modal/components/ModalWindow';
import PlayerProfile from '../../player/components/PlayerProfile';

class PlayerProfileModalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.onClose = this.onClose.bind(this);
    }

    // When playerProfile in store changes, it means that we need to show this modal, so we reset the state to true
    componentWillReceiveProps() {
        this.setState({
            isModalOpen: true
        });
    }

    onClose() {
        this.setState({
            isModalOpen: false
        });
    }
    

    render() {
        if (this.props.player != null) {
            return (
                <ModalWindow isOpen={this.state.isModalOpen} onClose={this.onClose} >
                    <PlayerProfile
                      changeProfilePictureEnabled={false}
                      title={'Player profile'}
                      player={this.props.player}
                      recentGames={this.props.player.recentGames}
                    />
                </ModalWindow>
            );
        }
        return null;
    }
}

function mapStateToProps(state) {
    return {
        player: state.modal.player,
        loggedInPlayerName: state.user.userName,
    };
}

PlayerProfileModalContainer.propTypes = {
    // title: React.PropTypes.string,
    player: React.PropTypes.shape({
        id: React.PropTypes.number,
        userName: React.PropTypes.string,
        level: React.PropTypes.number,
        wins: React.PropTypes.number,
        losses: React.PropTypes.number,
        points: React.PropTypes.number,
        levelProgress: React.PropTypes.number,
        pointsToReachNextRank: React.PropTypes.number,
    }),
    loggedinPlayerName: React.PropTypes.string,
};

export default connect(mapStateToProps)(PlayerProfileModalContainer);
