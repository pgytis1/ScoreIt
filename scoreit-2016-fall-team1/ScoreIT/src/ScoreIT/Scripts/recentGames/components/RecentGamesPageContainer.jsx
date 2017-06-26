import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BodyClassName from 'react-body-classname';

import { fetchRecentGames } from '../actions';
import RecentGames from './RecentGames';
import MessagesContainer from '../../messages/components/MessagesContainer';
import LoggedInUserInfoContainer from '../../user/components/LoggedInUserInfoContainer';

class RecentGamesPageContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.dispatch(fetchRecentGames(10, 0));
    }

    render() {
        return (
            <BodyClassName className="page-landing">
                <div>
                    <header className="landing-header">
                        <div className="wrapper">
                            <Link className="header-logo" to="/" />
                            <nav>
                                <Link className="button borderless inline small" to="/leaderboard">
                                    Leaderboard
                                </Link>
                                <LoggedInUserInfoContainer />
                            </nav>
                        </div>
                    </header>
                    <div className="feed wrapper">
                        <h1>Recent Games</h1>
                        <MessagesContainer />
                        <RecentGames
                          isSeeAll
                          recentGames={this.props.recentGames}
                          isLoaded={this.props.isLoaded}
                        />
                    </div>
                </div>
            </BodyClassName>
        );
    }
}

RecentGamesPageContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    recentGames: React.PropTypes.arrayOf(React.PropTypes.object),
    isLoaded: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        recentGames: state.recentGames.games,
        isLoaded: state.recentGames.isLoaded,
    };
}

export default connect(mapStateToProps)(RecentGamesPageContainer);
