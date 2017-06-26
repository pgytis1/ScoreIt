import React from 'react';

import Image from '../../otherComponents/Image';

const TopPlayers = ({ topPlayers }) => {
    function renderTopPlayer(topPlayer, index) {
        let place = '';
        switch (index) {
            case 0:
                place = <span className="badge gold">1st</span>;
                break;
            case 1:
                place = <span className="badge silver">2nd</span>;
                break;
            case 2:
                place = <span className="badge bronze">3rd</span>;
                break;
            default:
                break;
        }

        return (
            <div className="profile-data" key={index}>
                <div className="profile-avatar">
                    <div className={`progress progress-${topPlayer.levelProgress.toString()}`} />
                    <Image image={topPlayer.avatar} />
                    <i>{topPlayer.level}</i>
                    {place}

                </div>

                <h1 className="profile-name">
                    {topPlayer.userName}
                    <span>{topPlayer.rankName}</span>
                </h1>
            </div>
        );
    }

    return (
        <section>
            <h1>Top players</h1>
            <div className="wrapper profile-data-wrapper">
                {topPlayers.map((topPlayer, index) =>
                    renderTopPlayer(topPlayer, index))}
            </div>
        </section>
    );
};

TopPlayers.propTypes = {
    topPlayers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default TopPlayers;
