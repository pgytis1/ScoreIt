import React from 'react';
import { connect } from 'react-redux';

import { fetchPlayer, uploadAvatar } from '../actions';
import PlayerProfile from './PlayerProfile';
import { fetchRecentGames } from '../../recentGames/actions';
import MessagesContainer from '../../messages/components/MessagesContainer';
import { showError } from '../../messages/actions';

class PlayerProfilePageContainer extends React.Component {

    componentDidMount() {
        this.props.fetchPlayer();
    }

    render() {
        let element;
        if (this.props.player.id === 0) {
            element = <div className="loading" />;
        } else {
            element = (
                <div className="wrapper">
                    <MessagesContainer />
                    <div className="page-profile" style={{ display: 'block' }}>
                        <PlayerProfile
                          player={this.props.player}
                          recentGames={this.props.recentGames}
                          onUploadAvatar={this.props.uploadAvatar}
                          changeProfilePictureEnabled={true}
                          onError={this.props.showError}
                        />
                    </div>
                </div>
                );
        }

        return (
            element
        );
    }
}

PlayerProfilePageContainer.propTypes = {
    player: React.PropTypes.object.isRequired,
    recentGames: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    fetchPlayer: React.PropTypes.func.isRequired,
    uploadAvatar: React.PropTypes.func.isRequired,
    showError: React.PropTypes.func.isRequired
};


function mapStateToProps(state) {
    return {
        player: state.player,
        recentGames: state.player.recentGames
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchPlayer() {
            dispatch(fetchPlayer());
        },
        uploadAvatar(avatar) {
            dispatch(uploadAvatar(avatar));
        },
        showError(error) {
            dispatch(showError(error));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerProfilePageContainer);
