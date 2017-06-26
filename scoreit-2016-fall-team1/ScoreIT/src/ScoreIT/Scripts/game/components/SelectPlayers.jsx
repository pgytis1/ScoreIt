import React from 'react';
import { connect } from 'react-redux';
import DebounceInput from 'react-debounce-input';
import InfiniteScroll from 'react-infinite-scroller';

import { choosePlayer, fetchPlayersForSelection, resetPlayers } from '../actions';
import Image from '../../otherComponents/Image';

class SelectPlayers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchBoxInputClassName: '',
            visiblePlayers: [],
            searchQuery: '',
            limit: 8,
            skip: 0,
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleClearButton = this.handleClearButton.bind(this);
        this.handlePlayerClick = this.handlePlayerClick.bind(this);
        this.filterAllPlayers = this.filterAllPlayers.bind(this);
        this.filterRecentPlayers = this.filterRecentPlayers.bind(this);
        this.filterFunction = this.filterFunction.bind(this);
        this.loadMorePlayers = this.loadMorePlayers.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(fetchPlayersForSelection(this.state.limit, this.state.skip));
        this.setState({
            skip: this.state.limit
        });
    }

    componentWillUnmount() {
        this.props.dispatch(resetPlayers());
    }

    handleSearch(event) {
        this.setState({
            searchBoxInputClassName: !event.target.value ? '' : 'populated',
            searchQuery: event.target.value
        });
    }

    handleClearButton() {
        this.setState({
            searchBoxInputClassName: '',
            searchQuery: ''
        });
    }


    handlePlayerClick(player) {
        this.props.dispatch(choosePlayer(this.props.neededPlayer, player));
    }

    filterRecentPlayers() {
        const filteredPlayers = this.props.recentPlayers.filter(el => !this.props.usedPlayers.includes(el.id));

        return filteredPlayers;
    }

    filterAllPlayers() {
        // We have to filter array three times - to avoid including players
        // 1. which were already chosen
        // 2. which will be shown in recentPlayers tab (unless search query is not empty)
        // 3. take into consideration search query
        let filteredPlayers = this.props.allPlayers.filter(el => !this.props.usedPlayers.includes(el.id));
        if (this.state.searchQuery === '') filteredPlayers = filteredPlayers.filter(el => this.filterFunction(el, this.props.recentPlayers));
        filteredPlayers = filteredPlayers.filter(x => x.userName.indexOf(this.state.searchQuery) >= 0);
        return filteredPlayers;
    }

    filterFunction(el, array) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === el.id) {
                return false;
            }
        }
        return true;
    }

    loadMorePlayers() {
        if (this.props.hasMorePlayers) {
            this.props.dispatch(fetchPlayersForSelection(this.state.limit, this.state.skip));
            this.setState({
                skip: this.state.skip + this.state.limit,
            });
        }
    }

    renderPlayer(player, i) {
        return (
            <a key={i} className="player" onClick={() => this.handlePlayerClick(player)} >

                {/* <div className="player-place">
                {i+1}.
                </div>*/}

                <div className="player-avatar" >
                    <Image image={player.avatar} style={{ backgroundImage: 'url(http://placehold.it/54x54)', borderRadius: '50%', height: '54px', width: '54px' }} />
                    <span className="level">
                        <i>{player.level}</i>
                    </span>

                </div>

                <div className="player-meta" >
                    <span className="player-name">
                        {player.userName}
                    </span>

                    <span className="player-level">
                        {player.rankName}
                    </span>

                    <span className="player-stats">
                        <i>/</i> W
            <strong> {player.wins}</strong>

                        <i>/</i> L
            <strong> {player.losses}</strong>
                    </span>
                </div>
                <i className="icon-chevron" />
            </a>
        );
    }

    render() {
        let element;
        let recentPlayers = [];
        let allPlayers = [];

        if (this.props.recentPlayers !== null && this.props.recentPlayers.length !== 0) {
            recentPlayers = this.filterRecentPlayers();
        }

        if (this.props.allPlayers != null) {
            allPlayers = this.filterAllPlayers();
        }

        if (this.state.searchBoxInputClassName === '' && recentPlayers.length !== 0) {
            element = (
                <div>
                    <span className="player-group-separator">Recent:</span>
                    {recentPlayers.map((player, i) => this.renderPlayer(player, i))}
                </div>
            );
        } else {
            element = null;
        }
        return (
            <div className="modal with-search" >
                <div className="modal-header">
                    <button className="modal-close icon-close" onClick={this.props.onClose} />
                    <h1> Select a player </h1>
                </div>
                <div className="search">
                    <DebounceInput
                      type="text"
                      placeholder="Search by Name"
                      className={this.state.searchBoxInputClassName}
                      value={this.state.searchQuery}
                      onChange={this.handleSearch}
                      ref={this.bindInput}
                      debounceTimeout={300}
                    />
                    <button onClick={this.handleClearButton}>Clear</button>
                </div>
                <div className="modal-content">
                    {element}
                    <InfiniteScroll
                      loader={<div className="loader">Loading ...</div>}
                      loadMore={this.loadMorePlayers}
                      hasMore={this.props.hasMorePlayers}
                      pageStart={0}
                      threshold={1}
                      useWindow={false}
                    >
                        <span className="player-group-separator">All:</span>
                        {allPlayers.map((player, i) => this.renderPlayer(player, i))}
                        {this.props.isLoaded === false ? <div className="loading" /> : null}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

SelectPlayers.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    isLoaded: React.PropTypes.bool.isRequired,
    hasMorePlayers: React.PropTypes.bool.isRequired,
    recentPlayers: React.PropTypes.arrayOf(React.PropTypes.object),
    allPlayers: React.PropTypes.arrayOf(React.PropTypes.object),
    onClose: React.PropTypes.func.isRequired,
    neededPlayer: React.PropTypes.string,
    usedPlayers: React.PropTypes.arrayOf(React.PropTypes.number)
};

function mapStateToProps(state) {
    return {
        allPlayers: state.game.allPlayers,
        recentPlayers: state.game.recentPlayers,
        neededPlayer: state.modal.neededPlayer,
        usedPlayers: [
            state.user.id,
            state.game.team1Player2Id,
            state.game.team2Player1Id,
            state.game.team2Player2Id
        ],
        hasMorePlayers: state.game.hasMore,
        isLoaded: state.game.isLoaded,
    };
}

export default connect(mapStateToProps)(SelectPlayers);
