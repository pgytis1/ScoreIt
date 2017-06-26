import {
    FETCH_USER_INFO,
    LOGOUT,
    UPDATE_AVATAR
} from './constants';

const defaultState = {
    isLoggedIn: null,
    userName: null,
    id: null,
    avatar: null
};

function fetchUserInfo(userInfo) {
    if (userInfo) {
        return {
            isLoggedIn: true,
            userName: userInfo.userName,
            id: userInfo.id,
            avatar: userInfo.avatar
        };
    }

    return {
        isLoggedIn: false,
        userName: null,
        id: null,
    };
}

export default function user(state = defaultState, action) {
    switch (action.type) {
    case FETCH_USER_INFO:
        return fetchUserInfo(action.userInfo);
    case LOGOUT:
        return Object.assign({}, defaultState, { isLoggedIn: false });
    case UPDATE_AVATAR:
        return Object.assign({}, state, { avatar: action.avatar });
    default:
        return state;
    }
}
