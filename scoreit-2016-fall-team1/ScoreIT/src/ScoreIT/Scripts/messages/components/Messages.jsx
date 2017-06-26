import React, { PropTypes } from 'react';

import Message from './Message';

const Messages = ({ messages, onCloseMessage }) => (
    <div>
        {messages.map(message =>
            <Message
              onClick={() => (onCloseMessage(message.id))}
              key={message.id}
              text={message.text}
              color={message.color}
            />,
        )}
    </div>
);

Messages.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape(Message.PropTypes)).isRequired,
    onCloseMessage: PropTypes.func.isRequired,
};

export default Messages;
