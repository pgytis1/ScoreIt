import { connect } from 'react-redux';
import React from 'react';

import Messages from './Messages';
import { deleteMessage, resetMessages } from '../actions';


class MessagesContainer extends React.Component {


    componentWillUnmount() {
        this.props.onContainerCloser();
    }

    render() {
        return (
            <Messages
              messages={this.props.messages}
              onCloseMessage={this.props.onCloseMessage}
            />
        );
    }
}


const mapStateToProps = state => ({
    messages: state.messages,
});

const mapDispatchToProps = ({
    onCloseMessage: deleteMessage,
    onContainerCloser: resetMessages
});

MessagesContainer.propTypes = {
    onContainerCloser: React.PropTypes.func,
    onCloseMessage: React.PropTypes.func,
    messages: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
