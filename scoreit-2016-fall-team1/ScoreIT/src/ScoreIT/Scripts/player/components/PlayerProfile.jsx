import React from 'react';
import FileReaderInput from 'react-file-reader-input';

import RecentGame from '../../recentGames/components/RecentGame';
import Image from '../../otherComponents/Image';
import { IMAGE_FORMAT_ERROR } from '../constants';

class PlayerProfile extends React.Component {
    constructor(props) {
        super(props);

        this.handleAvatarSelect = this.handleAvatarSelect.bind(this);
    }

    handleAvatarSelect(e, results) {
        if (results.length !== 0 && results[0][1].type === 'image/png') {
            results.forEach((result) => {
                const [e, file] = result;

                const data = e.target.result.slice(22);

                this.props.onUploadAvatar(data);
            });
        } else {
            this.props.onError([IMAGE_FORMAT_ERROR]);
        }
    }

    render() {
        let element;
        if (this.props.recentGames != undefined) {
            element = this.props.recentGames.map((recentGame, index) => (<RecentGame
              recentGame={recentGame}
              index={index}
              key={index}
              currentPlayerUsername={this.props.player.userName}
            />
            )
            );
        }

        return (
            <div>
                <div className="profile-data">
                    <div className="profile-avatar">
                        {/* <!-- '.progress-X' - increments of 5 -->*/}
                        <div className={`progress progress-${this.props.player.levelProgress}`} />

                        <Image image={this.props.player.avatar} />

                        <i>{this.props.player.level}</i>
                    </div>

                    <h1 className="profile-name">
                        {this.props.player.userName}
                        <span>{this.props.player.rankName}</span>
                    </h1>

                    <div className="profile-points-left">
                        {this.props.player.pointsToReachNextRank} points to reach next rank <br />

                        {/* <!-- Should be hidden if viewing someone else profile -->*/}
                        {this.props.changeProfilePictureEnabled ?
                            <label className="file-input">
                                <span>Change Profile Picture</span>
                                <FileReaderInput
                                  as="url"
                                  onChange={this.handleAvatarSelect}
                                />
                            </label> :
                            <div />

                        }
                    </div>

                    <ol className="profile-stats">
                        <li>
                            <span>Points</span>
                            {this.props.player.points}
                        </li>

                        <li>
                            <span>Wins</span>
                            {this.props.player.wins}
                        </li>

                        <li>
                            <span>Loses</span>
                            {this.props.player.losses}
                        </li>
                    </ol>
                </div>

                <ol className="history wrapper">
                    {element}
                </ol>
            </div>
        );
    }

}

PlayerProfile.propTypes = {
    onUploadAvatar: React.PropTypes.func,
    onError: React.PropTypes.func,
    player: React.PropTypes.shape({
        avatar: React.PropTypes.string,
        points: React.PropTypes.number,
        wins: React.PropTypes.number,
        losses: React.PropTypes.number,
        pointsToReachNextRank: React.PropTypes.number,
        level: React.PropTypes.number,
        userName: React.PropTypes.string,
        rankName: React.PropTypes.string
    }),
    recentGames: React.PropTypes.arrayOf(React.PropTypes.object),
    changeProfilePictureEnabled: React.PropTypes.bool,
};

export default PlayerProfile;
