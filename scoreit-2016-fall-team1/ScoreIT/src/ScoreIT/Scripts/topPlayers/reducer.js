import { FETCH_TOP_PLAYERS } from './constants';

const defaultState = [];

export default function topPlayers(state = defaultState, action) {
    switch (action.type) {
    case FETCH_TOP_PLAYERS:
        return [...action.topPlayers];
    default:
        return state;
    }
}
