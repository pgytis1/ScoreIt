import React from 'react';
import { Link } from 'react-router';
import BodyClassName from 'react-body-classname';

import LoggedInUserInfoContainer from '../../user/components/LoggedInUserInfoContainer';

import LeaderboardContainer from './LeaderboardContainer';

function LeaderboardPageContainer() {
    return (
        <BodyClassName className="page-landing">
            <div>
                <header className="landing-header">
                    <div className="wrapper">
                        <Link className="header-logo" to="/" />
                        <nav>
                            <Link className="button borderless inline small" to="/feed">
                                Recent games
                            </Link>
                            <LoggedInUserInfoContainer />
                        </nav>
                    </div>
                </header>
                <div className="feed wrapper">
                    <h1>LEADERBOARD</h1>
                    <LeaderboardContainer />
                </div>
            </div>
        </BodyClassName>
    );
}

export default LeaderboardPageContainer;
