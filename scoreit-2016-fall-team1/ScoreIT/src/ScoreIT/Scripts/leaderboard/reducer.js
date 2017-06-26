import { FETCH_LEADERBOARD, LEADERBOARD_RECEIVED, RECEIVING_LEADERBOARD,
         CONCAT_LEADERBOARD } from './constants';

const defaultState = {
    isLoaded: false,
    players: [],
    hasMore: false,
    showLoader: false
};

export default function leaderboard(state = defaultState, action) {
    switch (action.type) {
    case FETCH_LEADERBOARD: {
        return Object.assign({}, state,
            {
                hasMore: !(action.limit > action.leaderboardPlayers.length),
                players: action.leaderboardPlayers
            }
        );
    }
    case CONCAT_LEADERBOARD: {
        return Object.assign({}, state,
            {
                hasMore: !(action.limit > action.leaderboardPlayers.length),
                players: state.players.concat(action.leaderboardPlayers)
            }
        );
    }
    case RECEIVING_LEADERBOARD: {
        if (action.showLoader) {
            return Object.assign({}, state,
                {
                    showLoader: true,
                    isLoaded: false,
                    hasMore: false
                });
        }
        return Object.assign({}, state,
            {
                isLoaded: false,
                hasMore: false
            });
    }
    case LEADERBOARD_RECEIVED: {
        return Object.assign({}, state,
            {
                isLoaded: true,
                showLoader: false,
            });
    }
    default: {
        return state;
    }
    }
}
