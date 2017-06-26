import React from 'react';
import { connect } from 'react-redux';

import RecentGames from './RecentGames';

function RecentGamesContainer({ isSeeAll, recentGames, isLoaded }) {
    return (
        <div className="landing-content">
            <section>
                <h1>Recent Games</h1>
                <RecentGames
                  isSeeAll={isSeeAll}
                  recentGames={recentGames}
                  isLoaded={isLoaded}
                />
            </section>
        </div>
    );
}

RecentGamesContainer.propTypes = {
    recentGames: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    isSeeAll: React.PropTypes.bool.isRequired,
    isLoaded: React.PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        recentGames: state.recentGames.games,
        isLoaded: state.recentGames.isLoaded
    };
}

export default connect(mapStateToProps)(RecentGamesContainer);
