import React from 'react';
import MessagesContainer from '../../messages/components/MessagesContainer';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit() {
        this.props.onLogin(this.state.username, this.state.password);
    }
    handleEnterPress(event) {
        if (event.charCode === 13) {
            this.handleSubmit();
        }
    }

    render() {
        return (
            <div className="login-signin">
                <div className="login-content">
                    <h1>Score<strong>it</strong></h1>
                    <MessagesContainer />
                    <label className="label" htmlFor="Username">Username</label>
                    <input className="input" type="text" onChange={this.handleUsernameChange} required />
                    <label className="label" htmlFor="Password">Password</label>
                    <input className="input" type="password" onKeyPress={this.handleEnterPress} onChange={this.handlePasswordChange} required />
                    <button className="button" type="submit" onClick={this.handleSubmit} >Sign In</button>
                    <a className="button link" onClick={this.props.onSwitch} >Don&#39;t have an account?</a>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    onLogin: React.PropTypes.func,
    onSwitch: React.PropTypes.func
};

export default Login;
