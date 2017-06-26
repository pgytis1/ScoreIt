import React from 'react';
import { Link } from 'react-router';

import Header from './Header';
import Navigation from './Navigation';

function MainPage({ children }) {
    return (
        <div>
            <div className="wrapper">
                <Header />
                <Navigation />
                {children}
                { /* @@include('components/page-game.html')*/}
                {/* @@include('components/page-rankings.html')*/}
                {/* @@include('components/page-profile.html')*/}
            </div>
            {/* @@include('components/modal-alert.html')*/}
            {/* @@include('components/modal-players.html')*/}
            {/* @@include('components/modal-profile.html')*/}
            {/* @@include('components/modal-table-pairing.html')*/}
        </div>
    );
}

MainPage.propTypes = {
    children: React.PropTypes.node.isRequired
};

export default MainPage;
