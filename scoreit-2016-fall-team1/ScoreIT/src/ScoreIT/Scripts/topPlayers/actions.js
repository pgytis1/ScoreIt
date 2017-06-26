import request from 'superagent';
import { showError } from '../messages/actions';

import { FETCH_TOP_PLAYERS } from './constants';

export function fetchTopPlayers() {
    return function (dispatch) {
        request
            .get('/api/player/getleaderboard')
            .query({
                limit: 3,
                sortBy: 'points'
            })
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch({
                        type: FETCH_TOP_PLAYERS,
                        topPlayers: res.body,
                    });
                }
            });
    };
}
