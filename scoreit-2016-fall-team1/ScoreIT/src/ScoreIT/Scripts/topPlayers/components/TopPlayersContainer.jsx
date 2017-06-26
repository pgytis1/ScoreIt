import React from 'react';
import { connect } from 'react-redux';

import TopPlayers from './TopPlayers';

function TopPlayersContainer({ topPlayers }) {
    return (
        <TopPlayers
            topPlayers={topPlayers}
            />
    );
}

TopPlayersContainer.propTypes = {
    topPlayers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

function mapStateToProps(state) {
    return {
        topPlayers: state.topPlayers,
    };
}

export default connect(mapStateToProps)(TopPlayersContainer);
