import { FETCH_PLAYER, UPDATE_AVATAR } from './constants';

const defaultState = {
    id: 0,
    userName: '',
    rankName: '',
    level: 0,
    wins: 0,
    points: 0,
    levelProgress: 0,
    pointsToReachNextRank: 0,
    avatar: '',
    recentGames: []
};

export default function player(state = defaultState, action) {
    switch (action.type) {
    case FETCH_PLAYER:
        return action.player;
    case UPDATE_AVATAR:
        return Object.assign({}, state, { avatar: action.avatar });
    default:
        return state;
    }
}
