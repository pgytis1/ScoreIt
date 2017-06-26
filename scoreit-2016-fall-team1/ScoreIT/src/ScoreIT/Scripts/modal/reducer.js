import {
    LOOK_FOR_PLAYER1,
    LOOK_FOR_PLAYER2,
    LOOK_FOR_PLAYER3,
    LOOK_FOR_PLAYER4,
    SHOW_PLAYER_PROFILE,
} from './constants';

const defaultState = {
    player: null,
    neededPlayer: null
};

export default function modal(state = defaultState, action) {
    switch (action.type) {
    case LOOK_FOR_PLAYER1:
        return Object.assign({}, { neededPlayer: 'player1', });
    case LOOK_FOR_PLAYER2:
        return Object.assign({}, { neededPlayer: 'player2' });
    case LOOK_FOR_PLAYER3:
        return Object.assign({}, { neededPlayer: 'player3' });
    case LOOK_FOR_PLAYER4:
        return Object.assign({}, { neededPlayer: 'player4' });
    case SHOW_PLAYER_PROFILE:
        return Object.assign({}, { player: action.player });
    default :
        return state;
    }
}