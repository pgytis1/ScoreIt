import React from 'react';
import { Link } from 'react-router';

function Navigation() {
    return (
        <nav className="navigation">
            <div className="wrapper">

                <Link
                    className="navigation-item"
                    activeClassName="active"
                    to="/main/game"
                    >
                    <i className="icon-game" />
                    Game
        </Link>

                <Link
                    className="navigation-item"
                    activeClassName="active"
                    to="/main/leaderboard"
                    >
                    <i className="icon-rankings" />
                    Leaderboard
        </Link>

                <Link
                    className="navigation-item"
                    activeClassName="active"
                    to="/main/profile"
                    >
                    <i className="icon-profile" />
                    Profile
        </Link>
            </div>
        </nav>
    );
}

export default Navigation;
