import request from 'superagent';

import { FETCH_LEADERBOARD, LEADERBOARD_RECEIVED, RECEIVING_LEADERBOARD,
          CONCAT_LEADERBOARD } from './constants';
import { showError } from '../messages/actions';

export function fetchLeaderboard(query, byWhat, skip, limit, shouldConcat, showLoader) {
    return function (dispatch) {
        dispatch({
            type: RECEIVING_LEADERBOARD,
            showLoader
        });
        request
            .get('/api/player/getleaderboard')
            .query({
                query,
                limit,
                sortBy: byWhat,
                skip
            })
            .end((error, response) => {
                if (error) {
                    dispatch(showError([[`${error}`]]));
                } else {
                    if (shouldConcat) {
                        dispatch({
                            type: CONCAT_LEADERBOARD,
                            leaderboardPlayers: response.body,
                            limit
                        });
                    } else {
                        dispatch({
                            type: FETCH_LEADERBOARD,
                            leaderboardPlayers: response.body,
                            limit
                        });
                    }

                    dispatch({
                        type: LEADERBOARD_RECEIVED,
                    });
                }
            });
    };
}

