import {
    SHOW_SUCCESS,
    SHOW_ERROR,
    DELETE_MESSAGE,
    RESET_MESSAGES
} from './constants';

const defaultState = [];


export default function messages(state = defaultState, action) {
    switch (action.type) {
    case SHOW_SUCCESS: {
        let newState = state;
        for (let i = 0; i < messages.length; i += 1) {
            const newMessage = {
                id: action.ids[i],
                text: action.messages[i],
                color: 'green',
            };
            newState = [...newState, newMessage];
        }
        return newState;
    }
    case SHOW_ERROR: {
        let newState = defaultState;
        for (let i = 0; i < action.messages.length; i += 1) {
            let newMessage = {
                id: action.ids[i],
                text: action.messages[i],
                color: 'red',
            };
            newState = [...newState, newMessage];
        }
        return newState;
    }
    case DELETE_MESSAGE: {
        return state.filter((message => message.id !== action.id));
    }
    case RESET_MESSAGES: {
        return defaultState;
    }
    default:
        return state;
    }
}
