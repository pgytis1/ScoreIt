import { combineReducers } from 'redux';

import topPlayers from './topPlayers/reducer';
import recentGames from './recentGames/reducer';
import game from './game/reducer';
import leaderboard from './leaderboard/reducer';
import messages from './messages/reducer';
import user from './user/reducer';
import modal from './modal/reducer';
import player from './player/reducer';

const reducers = {
    player,
    topPlayers,
    recentGames,
    game,
    leaderboard,
    messages,
    user,
    modal
};

export default combineReducers(reducers);
