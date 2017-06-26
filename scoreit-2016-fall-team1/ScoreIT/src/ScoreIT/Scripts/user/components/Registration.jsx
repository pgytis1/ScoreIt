import React from 'react';
import MessagesContainer from '../../messages/components/MessagesContainer';

class Registration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password: '',
            passwordConfirm: '',
        };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.doPasswordsMatch = this.doPasswordsMatch.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handlePasswordConfirmChange(event) {
        this.setState({ passwordConfirm: event.target.value });
    }

    handleSubmit() {
        // Probably needs some validation before submiting
        if (this.doPasswordsMatch()) {
            this.props.onRegister(this.state.username, this.state.password, this.state.email);
        }
    }
    handleEnterPress(event) {
        if (event.charCode === 13) {
            this.handleSubmit();
        }
    }

    doPasswordsMatch() {
        if (this.state.password === this.state.passwordConfirm) {
            return true;
        } else {
            this.props.onError('Passwords do not match!');
            return false;
        }
    }

    render() {
        return (
            <div className="login-create">
                <div className="login-content">
                    <h1>Score<strong>it</strong></h1>
                    <MessagesContainer />
                    <label className="label" htmlFor="Email">Email Address</label>
                    <input className="input" type="email" onChange={this.handleEmailChange} required />
                    <label className="label" htmlFor="Username">Username</label>
                    <input className="input" type="text" onChange={this.handleUsernameChange} required />
                    <label className="label" htmlFor="Password">Password</label>
                    <input className="input" type="password" onChange={this.handlePasswordChange} required />
                    <label className="label" htmlFor="Confirm Password">Confirm Password</label>
                    <input className="input" type="password" onKeyPress={this.handleEnterPress} onChange={this.handlePasswordConfirmChange} required />
                    <button className="button" type="submit" onClick={this.handleSubmit} >
                        Create and Sign in
          </button>
                    <a className="button link" onClick={this.props.onSwitch} >
                        Sign in
          </a>
                </div>
            </div>
        );
    }
}

Registration.propTypes = {
    onRegister: React.PropTypes.func.isRequired,
    onSwitch: React.PropTypes.func.isRequired,
    onError: React.PropTypes.func
};

export default Registration;
