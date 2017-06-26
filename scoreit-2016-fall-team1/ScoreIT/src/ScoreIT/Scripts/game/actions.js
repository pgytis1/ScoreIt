import request from 'superagent';

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
    FETCH_PLAYERS_FOR_SELECTION,
    RECEIVING_PLAYERS,
    PLAYERS_RECEIVED,
    RESET_PLAYERS
} from './constants';

import { showError, resetMessages } from '../messages/actions';
import { Team1, Team2 } from '../constants';

export function resetGame() {
    return {
        type: RESET_GAME
    };
}

export function receiveUnfinishedGame(
    scoreTeamBlue,
    scoreTeamRed,
    gameId,
    team1Player1Profile,
    team1Player2Profile,
    team2Player1Profile,
    team2Player2Profile,
    goalLimit
) {
    return {
        type: RECEIVE_UNFINISHED_GAME,
        scoreTeamBlue,
        scoreTeamRed,
        gameId,
        team1Player1Profile,
        team1Player2Profile,
        team2Player1Profile,
        team2Player2Profile,
        goalLimit
    };
}

export function fetchUnfinishedGame(status) {
    return (dispatch) => {
        request
            .get('api/player/GetUnfinishedGame')
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                }
                if (err || res.body == null) {
                    if (status == null) {
                        dispatch(resetGame());
                    }
                } else {
                    dispatch(receiveUnfinishedGame(
                        res.body.team1Score,
                        res.body.team2Score,
                        res.body.gameId,
                        res.body.team1Player1,
                        res.body.team1Player2,
                        res.body.team2Player1,
                        res.body.team2Player2,
                        res.body.goalLimit
                    ));
                }
            });
    };
}

// A lot of ifs, because at the last score update (when score reaches goalLimt) we have to update score,
// and to set the game status to finished ir order to switch from ActiveGame to FinishedGame component
export function updateScore(value, team, gameId) {
    return function (dispatch) {
        request
            .put('/api/game/UpdateScore')
            .send({
                GameId: gameId,
                Team: team,
                ScoreDelta: value,
            })
            .end((err, res) => {
                if (err) {
                    dispatch(showError([[`${err}`]]));
                } else if (res.text === 'finished') {
                    if (team === Team1) {
                        dispatch({
                            type: UPDATE_SCORE_TEAM1,
                            value
                        });
                        // http://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559
                        setTimeout(() => {
                            dispatch({
                                type: FINISH_GAME
                            });
                        }, 2000);
                    } else {
                        dispatch({
                            type: UPDATE_SCORE_TEAM2,
                            value
                        });
                        setTimeout(() => {
                            dispatch({
                                type: FINISH_GAME
                            });
                        }, 2000);
                    }
                } else {
                    if (team === Team1) {
                        dispatch({
                            type: UPDATE_SCORE_TEAM1,
                            value,
                        });
                    } else {
                        dispatch({
                            type: UPDATE_SCORE_TEAM2,
                            value,
                        });
                    }
                }
            });
    };
}


export function finishGame(gameId) {
    return function (dispatch) {
        request
            .post(`/api/game/finishGame/${gameId}`)
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch({
                        type: FINISH_GAME
                    });
                }
            });
    };
}

export function fetchPlayersForSelection(limit, skip) {
    return function (dispatch) {
        let allPlayers;
        dispatch({
            type: RECEIVING_PLAYERS,
        });
        request
            .get('/api/player/searchByUsername')
            .query({
                limit,
                skip
            })
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    allPlayers = res.body;
                    request
                    .get('/api/player/getPlayersFromLastGame/')
                    .end((err, res) => {
                        if (res.body != null) {
                            dispatch({
                                type: FETCH_PLAYERS_FOR_SELECTION,
                                allPlayers,
                                recentPlayers: res.body,
                                limit
                            });
                        } else {
                            dispatch({
                                type: FETCH_PLAYERS_FOR_SELECTION,
                                allPlayers,
                                recentPlayers: [],
                                limit
                            });
                        }
                        dispatch({
                            type: PLAYERS_RECEIVED,
                        });
                    });
                }
            });
    };
}

export function cancelGame(gameId) {
    return function (dispatch) {
        request
            .post(`/api/game/cancelGame/${gameId}`)
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch(resetGame());
                }
            });
    };
}

export function startNewGame(player1Id, player2Id, player3Id, player4Id, goalLimit) {
    return function (dispatch) {
        request.post('api/game/createNewGame')
            .send({
                Player1Id: player1Id,
                Player2Id: player2Id,
                Player3Id: player3Id,
                Player4Id: player4Id,
                GoalLimit: goalLimit,
            })
            .end((err, res) => {
                if (err) {
                    if (player1Id == null) {
                        dispatch(showError(['Player 1 is not found.']));
                    } else if (player2Id == null) {
                        dispatch(showError(['Player 2 is not found.']));
                    } else if (player3Id == null) {
                        dispatch(showError(['Player 3 is not found.']));
                    } else if (player4Id == null) {
                        dispatch(showError(['Player 4 is not found.']));
                    } else {
                        dispatch(showError([`${err}`]));
                    }
                } else {
                    dispatch(resetMessages());
                    fetchUnfinishedGame()(dispatch);
                }
            });
    };
}


export function selectPlayer1(player) {
    return {
        type: SELECT_PLAYER1,
        player
    };
}

export function selectPlayer2(player) {
    return {
        type: SELECT_PLAYER2,
        player
    };
}

export function selectPlayer3(player) {
    return {
        type: SELECT_PLAYER3,
        player
    };
}

export function selectPlayer4(player) {
    return {
        type: SELECT_PLAYER4,
        player
    };
}

export function choosePlayer(whichPlayer, player) {
    return function (dispatch) {
        if (whichPlayer === 'player1') {
            dispatch(selectPlayer1(player));
        } else if (whichPlayer === 'player2') {
            dispatch(selectPlayer2(player));
        } else if (whichPlayer === 'player3') {
            dispatch(selectPlayer3(player));
        } else {
            dispatch(selectPlayer4(player));
        }
    };
}

export function resetPlayers() {
    return {
        type: RESET_PLAYERS
    };
}

