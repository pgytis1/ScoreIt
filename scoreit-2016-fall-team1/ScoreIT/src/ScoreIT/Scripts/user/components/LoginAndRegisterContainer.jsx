import React from 'react';
import { connect } from 'react-redux';
import BodyClassName from 'react-body-classname';
import { showError } from '../../messages/actions';
import { Link } from 'react-router';

import Registration from './Registration';
import Login from './Login';
import { login, register } from '../actions';

class LoginAndRegisterContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            switch: false,
        };

        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleError = this.handleError.bind(this);
    }


    handleLogin(username, password) {
        this.props.dispatch(login(username, password));
    }

    handleRegister(username, password, email) {
        this.props.dispatch(register(username, password, email));
    }

    handleError(error) {
        this.props.dispatch(showError([error]));
    }

    handleSwitch() {
        this.setState({
            switch: !this.state.switch,
        });
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
                            </nav>
                        </div>
                    </header>
                    <div className="login wrapper">
                        {this.state.switch ?
                            <Registration
                              onSwitch={this.handleSwitch}
                              onRegister={this.handleRegister}
                              onError={this.handleError}
                            /> :
                              <Login
                                onSwitch={this.handleSwitch}
                                onLogin={this.handleLogin}
                              />}
                    </div>
                </div>
            </BodyClassName>
        );
    }
}

LoginAndRegisterContainer.propTypes = {
    dispatch: React.PropTypes.func
};

export default connect()(LoginAndRegisterContainer);
