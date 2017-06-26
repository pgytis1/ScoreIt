import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import HomePageContainer from './otherComponents/HomePageContainer';
import RecentGamesPageContainer from './recentGames/components/RecentGamesPageContainer';
import LoginAndRegisterContainer from './user/components/LoginAndRegisterContainer';
import GamePageContainer from './game/components/GamePageContainer';
import LeaderboardPageContainer from './leaderboard/components/LeaderboardPageContainer';
import LeaderboardContainer from './leaderboard/components/LeaderboardContainer';
import MainPage from './main/components/MainPage';
import PlayerProfilePageContainer from './player/components/PlayerProfilePageContainer';
import reducers from './rootReducer';

const store = createStore(
    reducers,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware),
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={HomePageContainer} />
            <Route path="/feed" component={RecentGamesPageContainer} />
            <Route path="/login" component={LoginAndRegisterContainer} />
            <Route path="/leaderboard" component={LeaderboardPageContainer} />
            <Route path="/main" component={MainPage}>
                <Route path="/main/game" component={GamePageContainer} />
                <Route path="/main/leaderboard" component={LeaderboardContainer} />
                <Route path="/main/profile" component={PlayerProfilePageContainer} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
