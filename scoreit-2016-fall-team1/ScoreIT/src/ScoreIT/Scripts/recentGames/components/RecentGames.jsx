import React from 'react';
import { Link } from 'react-router';

import RecentGame from './RecentGame';

const RecentGames = ({ recentGames, isSeeAll, isLoaded }) => {
    function renderSeeAllButton() {
        if (!isSeeAll) {
            return <Link className="button" to="/feed">SEE ALL</Link>;
        }

        return null;
    }
    
    return (
        <div>
            <ol className="history wrapper">
                {(isLoaded === false) ? (<div className="loading" />) :
                    (recentGames.map((recentGame, index) =>
                        <RecentGame
                            recentGame={recentGame}
                            index={index}
                            key={index}
                            />
                    ))
                }
            </ol>
            {renderSeeAllButton(isSeeAll)}
        </div>
    );
};

RecentGames.propTypes = {
    recentGames: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    isSeeAll: React.PropTypes.bool.isRequired,
    isLoaded: React.PropTypes.bool.isRequired,
};

export default RecentGames;
