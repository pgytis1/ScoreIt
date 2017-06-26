import request from 'superagent';

import { FETCH_RECENT_GAMES, RECEIVING_RECENT_GAMES,
         RECENT_GAMES_RECEIVED } from './constants';
import { showError } from '../messages/actions';

export function fetchRecentGames(count, skip, id) {
    return (dispatch) => {
        dispatch({
            type: RECEIVING_RECENT_GAMES,
        });
        request
            .get('/api/game/recentGames')
            .query({
                count,
                skip,
                playerId: id
            })
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch({
                        type: FETCH_RECENT_GAMES,
                        recentGames: res.body,
                    });
                    dispatch({
                        type: RECENT_GAMES_RECEIVED,
                    });
                }
            });
    };
}
