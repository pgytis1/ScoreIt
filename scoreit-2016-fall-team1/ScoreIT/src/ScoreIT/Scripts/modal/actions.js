import request from 'superagent';

import { SHOW_PLAYER_PROFILE } from './constants';
import { showError } from '../messages/actions';

export function fetchPlayerProfile(id) {
    return (dispatch) => {
        request
            .get('/api/player/getPlayerWithRecentGames')
            .query({ id })
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch({
                        type: SHOW_PLAYER_PROFILE,
                        player: res.body
                    });
                }
            });
    };
}

