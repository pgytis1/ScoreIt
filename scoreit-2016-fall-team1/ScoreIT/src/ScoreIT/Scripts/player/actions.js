import request from 'superagent';

import { FETCH_PLAYER, UPDATE_AVATAR } from './constants';
import { updateAvatar as updateUserAvatar } from '../user/actions';
import { showError } from '../messages/actions';

export function fetchPlayer() {
    return (dispatch) => {
        request
            .get('/api/player/getPlayerWithRecentGames/')
            .end((err, res) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch({
                        type: FETCH_PLAYER,
                        player: res.body
                    });
                }
            });
    };
}

export function updateAvatar(avatar) {
    return {
        type: UPDATE_AVATAR,
        avatar
    };
}

export function uploadAvatar(avatar) {
    return (dispatch) => {
        request
            .put('api/player/updateAvatar')
            .send({ avatar })
            .end((err) => {
                if (err) {
                    dispatch(showError([`${err}`]));
                } else {
                    dispatch(updateAvatar(avatar));
                    dispatch(updateUserAvatar(avatar));
                }
            });
    };
}

