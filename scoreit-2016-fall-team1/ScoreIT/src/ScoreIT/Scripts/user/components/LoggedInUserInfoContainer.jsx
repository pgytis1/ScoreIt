import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logout, fetchUserInfo } from '../actions';

class LoggedInUserInfoContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchUserInfo());
    }

    handleLogout() {
        this.props.dispatch(logout());
    }

    renderLoggedIn() {
        return (
            <div className="header-user">
                Welcome {this.props.userInfo.userName}, <a href="javascript:void(0)" onClick={this.handleLogout}>logout <i className="icon-logout" /></a>
            </div>
        );
    }

    renderLoggedOff() {
        return <Link className="button inline small" to="/login">Login</Link>;
    }

    render() {
        if (this.props.isLoggedIn) {
            return this.renderLoggedIn();
        }
        else if (this.props.isLoggedIn === false) {
            return this.renderLoggedOff();
        }
        else {
            return ( <div /> )
        }
    }
}

LoggedInUserInfoContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isLoggedIn: React.PropTypes.bool,
    userInfo: React.PropTypes.shape({
        isLoggedIn: React.PropTypes.bool,
        userName: React.PropTypes.string,
        id: React.PropTypes.number
    }).isRequired
};

function mapStateToProps(state) {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user
    };
}

export default connect(mapStateToProps)(LoggedInUserInfoContainer);
