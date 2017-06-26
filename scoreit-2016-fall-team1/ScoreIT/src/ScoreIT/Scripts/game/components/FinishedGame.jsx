import React from 'react';
import { connect } from 'react-redux';

import { RESET_GAME } from '../constants';

function FinishedGame({ dispatch, game, onRematch,scoreTeamRed, scoreTeamBlue  }) {
    function handleNewGame() {
        dispatch(
            {
                type: RESET_GAME,
            },
        );
    }

    return (
        <section className="game-finished" style={{ display: '' }}>
            <h1>Result</h1>
            <div className="game-result win">
                {scoreTeamBlue}:{scoreTeamRed}
            </div>

            <button className="button" onClick={handleNewGame}>
                New Game
      </button>

            <button className="button link" onClick={onRematch} >
                Rematch
      </button>
        </section>
    );
}

FinishedGame.propTypes = {
    scoreTeamRed: React.PropTypes.number,
    scoreTeamBlue: React.PropTypes.number
};

function mapStateToProps(state) {
    return {
        scoreTeamRed: state.game.scoreTeamRed,
        scoreTeamBlue: state.game.scoreTeamBlue
    };
}

export default connect(mapStateToProps)(FinishedGame);
