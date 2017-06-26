import {
    RECEIVE_UNFINISHED_GAME,
    UPDATE_SCORE_TEAM1,
    UPDATE_SCORE_TEAM2,
    FINISH_GAME,
    RESET_GAME,
    SELECT_PLAYER1,
    SELECT_PLAYER2,
    SELECT_PLAYER3,
    SELECT_PLAYER4,
    SET_GOAL_LIMIT,
    REMOVE_PLAYER2,
    REMOVE_PLAYER3,
    REMOVE_PLAYER4,
    DEFAULT_GOAL_NUMBER,
    SET_GAME_TO_DEFAULT,
    FETCH_PLAYERS_FOR_SELECTION,
    RECEIVING_PLAYERS,
    PLAYERS_RECEIVED,
    RESET_PLAYERS
} from './constants';

const defaultState = {
    status: null,
    goalLimit: null,
    team1Player1Id: null,
    team1Player2Id: null,
    team2Player1Id: null,
    team2Player2Id: null,
    team1Player1Avatar: null,
    team1Player2Avatar: null,
    team2Player1Avatar: null,
    team2Player2Avatar: null,
    scoreTeamBlue: null,
    scoreTeamRed: null,
    gameId: null,
    team1Player1Profile: null,
    team1Player2Profile: null,
    team2Player1Profile: null,
    team2Player2Profile: null,
    allPlayers: [],
    recentPlayers: null,
    isLoaded: false,
    hasMore: false
};

export default function game(state = defaultState, action) {
    switch (action.type) {
    case RECEIVE_UNFINISHED_GAME:
        return Object.assign({},
            {
                scoreTeamBlue: action.scoreTeamBlue,
                scoreTeamRed: action.scoreTeamRed,
                playersIds: action.playersIds,
                gameId: action.gameId,
                team1Player1Id: action.team1Player1Id,
                team1Player2Id: action.team1Player2Id,
                team2Player1Id: action.team2Player1Id,
                team2Player2Id: action.team2Player2Id,
                team1Player1Profile: action.team1Player1Profile,
                team1Player2Profile: action.team1Player2Profile,
                team2Player1Profile: action.team2Player1Profile,
                team2Player2Profile: action.team2Player2Profile,
                goalLimit: action.goalLimit,
                status: 'active'
            });
    case UPDATE_SCORE_TEAM1:
        return Object.assign({}, state,
                { scoreTeamBlue: state.scoreTeamBlue + action.value },
            );

    case UPDATE_SCORE_TEAM2:
        return Object.assign({}, state,
                { scoreTeamRed: state.scoreTeamRed + action.value },
            );

    case FINISH_GAME:
        return Object.assign({}, state,
                { status: 'finished' },
            );

    case SET_GAME_TO_DEFAULT:
        return defaultState;

    case RESET_GAME:
        return Object.assign({}, state,
            {
                status: 'inSetup',
                goalLimit: DEFAULT_GOAL_NUMBER,
                allPlayers: [],
                recentPlayers: null,
                isLoaded: false,
                hasMore: false
            });

    case SELECT_PLAYER1:
        return Object.assign({}, state,
            {
                team1Player1Id: action.player.id,
                team1Player1Avatar: action.player.avatar
            });

    case SELECT_PLAYER2:
        return Object.assign({}, state,
            {
                team1Player2Id: action.player.id,
                team1Player2Avatar: action.player.avatar
            });

    case SELECT_PLAYER3:
        return Object.assign({}, state,
            {
                team2Player1Id: action.player.id,
                team2Player1Avatar: action.player.avatar
            });

    case SELECT_PLAYER4:
        return Object.assign({}, state,
            {
                team2Player2Id: action.player.id,
                team2Player2Avatar: action.player.avatar
            });

    case SET_GOAL_LIMIT:
        return Object.assign({}, state,
            {
                goalLimit: action.goalLimit
            });

    case REMOVE_PLAYER2:
        return Object.assign({}, state,
            {
                team1Player2Id: null,
                team1Player2Avatar: null
            });

    case REMOVE_PLAYER3:
        return Object.assign({}, state,
            {
                team2Player1Id: null,
                team2Player1Avatar: null
            });

    case REMOVE_PLAYER4:
        return Object.assign({}, state,
            {
                team2Player2Id: null,
                team2Player2Avatar: null
            });

    case FETCH_PLAYERS_FOR_SELECTION: {
        if (action.limit > action.allPlayers.length) {
            return Object.assign({}, state,
                {
                    allPlayers: state.allPlayers.concat(action.allPlayers),
                    recentPlayers: action.recentPlayers,
                    hasMore: false
                });
        }
        return Object.assign({}, state,
            {
                allPlayers: state.allPlayers.concat(action.allPlayers),
                recentPlayers: action.recentPlayers,
                hasMore: true
            });
    }

    case RECEIVING_PLAYERS: {
        return Object.assign({}, state,
            {
                isLoaded: false,
                hasMore: false
            });
    }
    case PLAYERS_RECEIVED: {
        return Object.assign({}, state, { isLoaded: true });
    }

    case RESET_PLAYERS: {
        return Object.assign({}, state,
            {
                allPlayers: [],
                recentPlayers: []
            });
    }

    default:
        return state;
    }
}
