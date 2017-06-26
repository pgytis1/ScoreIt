import React from 'react';
import { DEFAULT_GOAL_LIMIT, DEFAULT_GOAL_NUMBER } from '../constants';

class GoalLimit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SliderState: DEFAULT_GOAL_NUMBER,
            MaxGoalLimit: DEFAULT_GOAL_LIMIT
        };
        this.handleGoalLimit = this.handleGoalLimit.bind(this);
    }

    handleGoalLimit(event) {
        this.setState({ SliderState: event.target.value });
        this.props.onSliderChange(event.target.value);
    }

    render() {
        const result = [];
        for (let i = 0; i < this.state.MaxGoalLimit; i++) {
            if (i < this.state.SliderState) result[i] = 'selected';
            else result[i] = '';
        }

        const resultElements = result.map((elem, index) => (
            <i className={elem} key={index} />
            ));

        return (
            <div className="game-setup-goals">
                <h2>
                        Goal Limit {this.state.SliderState}
                </h2>
                <div className="game-setup-goals-input">
                    <input
                      type="range"
                      min="1"
                      max={this.state.MaxGoalLimit}
                      step="1"
                      defaultValue={this.state.SliderState}
                      onChange={this.handleGoalLimit}
                    />
                    <div className="game-setup-goals-input-pips">
                        {resultElements}
                    </div>
                </div>
            </div>
        );
    }
}

GoalLimit.propTypes = {
    onSliderChange: React.PropTypes.func
};

export default GoalLimit;
