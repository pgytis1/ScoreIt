import { FETCH_RECENT_GAMES, RECEIVING_RECENT_GAMES,
         RECENT_GAMES_RECEIVED } from './constants';

const defaultState = {
    isLoaded: false,
    games: [],
    hasMore: true
};

export default function recentGames(state = defaultState, action) {
    switch (action.type) {
    case FETCH_RECENT_GAMES:
        return Object.assign({}, state, { games: action.recentGames });
    case RECEIVING_RECENT_GAMES: {
        return Object.assign({}, state, { isLoaded: false });
    }
    case RECENT_GAMES_RECEIVED: {
        return Object.assign({}, state, { isLoaded: true });
    }
    default:
        return state;
    }
}
