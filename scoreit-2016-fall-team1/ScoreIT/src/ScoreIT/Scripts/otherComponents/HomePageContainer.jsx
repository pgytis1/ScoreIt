import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import BodyClassName from 'react-body-classname';

import TopPlayersContainer from '../topPlayers/components/TopPlayersContainer';
import RecentGamesContainer from '../recentGames/components/RecentGamesContainer';
import LoggedInUserInfoContainer from '../user/components/LoggedInUserInfoContainer';
import { fetchTopPlayers } from '../topPlayers/actions';
import { fetchRecentGames } from '../recentGames/actions';
import MessagesContainer from '../messages/components/MessagesContainer';

class HomePageContainer extends React.Component {
    constructor(props) {
        super(props);

        this.getStartYourGameLink = this.getStartYourGameLink.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchTopPlayers());
        this.props.dispatch(fetchRecentGames(2));
    }

    getStartYourGameLink() {
        if (this.props.isLoggedIn) {
            return '/main/game';
        }

        return '/login';
    }

    render() {
        return (
            <BodyClassName className="page-landing">
                <div>
                    <div className="hero-bg">
                        <header className="landing-header">
                            <div className="wrapper">
                                <a className="header-logo" href="#" />
                                <nav>
                                    <Link className="button borderless inline small" to="/leaderboard">
                                        Leaderboard
                                    </Link>
                                    <LoggedInUserInfoContainer />
                                </nav>
                            </div>
                        </header>
                        <MessagesContainer />
                        <div className="landing-content">
                            <h1>
                                Score  your  winnings <small>You play foosball table, we track your results. </small>
                            </h1>
                            <Link className="button large blue" to={this.getStartYourGameLink()}>
                                Start your game
                            </Link>
                            <TopPlayersContainer />
                        </div>
                    </div>
                    <RecentGamesContainer isSeeAll={false} />
                </div>
            </BodyClassName>
        );
    }
}

HomePageContainer.propTypes = {
    isLoggedIn: React.PropTypes.bool,
    dispatch: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
}

export default connect(mapStateToProps)(HomePageContainer);
