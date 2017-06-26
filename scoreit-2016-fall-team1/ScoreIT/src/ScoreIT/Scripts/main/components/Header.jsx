import React from 'react';
import { Link } from 'react-router';

import LoggedInUserInfoContainer from '../../user/components/LoggedInUserInfoContainer';

function Header() {
    return (
        <div className="header">
            <div className="wrapper wide">
                <Link className="header-logo" to="/" />
                <LoggedInUserInfoContainer />
            </div>
        </div>
    );
}

export default Header;
