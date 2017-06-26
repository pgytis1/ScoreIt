import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import DebounceInput from 'react-debounce-input';

import LeaderboardPlayer from './LeaderboardPlayer';
import { fetchLeaderboard } from '../actions';
import { fetchPlayerProfile } from '../../modal/actions';
import MessagesContainer from '../../messages/components/MessagesContainer';
import PlayerProfileModalContainer from '../../game/components/PlayerProfileModalContainer';

class LeaderboardContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            byWhat: 'Wins',
            searchQuery: '',
            activeByWins: 'active',
            activeByLevel: '',
            skip: 0,
            limit: 8,
            searchBoxInputClassName: ''
        };

        this.handleClearButton = this.handleClearButton.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleLeaderboardByWins = this.handleLeaderboardByWins.bind(this);
        this.handleLeaderboardByLevel = this.handleLeaderboardByLevel.bind(this);
        this.loadMorePlayers = this.loadMorePlayers.bind(this);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchLeaderboard('', 'Wins', this.state.skip, this.state.limit, false, true));
        this.setState({
            skip: this.state.limit
        });
    }

    handleClearButton() {
        this.setState({
            searchBoxInputClassName: '',
            searchQuery: '',
            skip: this.state.limit,
            limit: 8,
        });

        this.props.dispatch(fetchLeaderboard('', this.state.byWhat, 0, 8, false, true));
    }

    handleSearch(event) {
        this.setState({
            skip: this.state.limit,
            searchQuery: event.target.value,
            searchBoxInputClassName: !event.target.value ? '' : 'populated'
        });

        this.props.dispatch(fetchLeaderboard(event.target.value, this.state.byWhat,
                                             0, this.state.limit, false, true));
    }

    handlePlayerClick(id) {
        this.props.dispatch(fetchPlayerProfile(id));
    }

    handleLeaderboardByWins() {
        this.setState({
            byWhat: 'wins',
            activeByWins: 'active',
            activeByLevel: '',
            skip: this.state.limit,
        });

        this.props.dispatch(fetchLeaderboard(this.state.searchQuery, 'wins', 0, this.state.limit, false, true));
    }

    handleLeaderboardByLevel() {
        this.setState({
            byWhat: 'level',
            activeByLevel: 'active',
            activeByWins: '',
            skip: this.state.limit,
        });
        this.props.dispatch(fetchLeaderboard(this.state.searchQuery, 'level', 0, this.state.limit, false, true));
    }

    loadMorePlayers() {
        if (this.props.hasMorePlayers && this.props.isLoaded) {
            this.props.dispatch(fetchLeaderboard(this.state.searchQuery, this.state.byWhat,
                                                 this.state.skip, this.state.limit, true, false));
            this.setState({
                skip: this.state.skip + this.state.limit,
            });
        }
    }

    render() {
        return (
            <div className="feed wrapper">
                <PlayerProfileModalContainer />
                <MessagesContainer />
                <div className="search">
                    <DebounceInput
                      type="text"
                      placeholder="Search by Name"
                      className={this.state.searchBoxInputClassName}
                      value={this.state.searchQuery}
                      onChange={this.handleSearch}
                      debounceTimeout={300}
                    />
                    <button onClick={this.handleClearButton}>Clear</button>
                </div>

                <div className="page-rankings-sort">
                    <button className={this.state.activeByWins} onClick={this.handleLeaderboardByWins}>
                        By Wins
                   </button>
                    <button className={this.state.activeByLevel} onClick={this.handleLeaderboardByLevel}>
                        By Level
                    </button>
                </div>

                <div className="page-rankings-list">
                    <InfiniteScroll
                      loadMore={this.loadMorePlayers}
                      hasMore={this.props.hasMorePlayers}
                      pageStart={0}
                    >
                        {this.props.showLoader ? null : this.props.players.map((player, i) =>
                            <LeaderboardPlayer
                              player={player}
                              i={i}
                              key={i}
                              onClick={this.handlePlayerClick}
                            />
                        )}
                        {this.props.isLoaded === false ? <div className="loading" /> : null}

                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

LeaderboardContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    players: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    isLoaded: React.PropTypes.bool.isRequired,
    hasMorePlayers: React.PropTypes.bool.isRequired,
    showLoader: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        players: state.leaderboard.players,
        isLoaded: state.leaderboard.isLoaded,
        hasMorePlayers: state.leaderboard.hasMore,
        showLoader: state.leaderboard.showLoader,
    };
}

export default connect(mapStateToProps)(LeaderboardContainer);
