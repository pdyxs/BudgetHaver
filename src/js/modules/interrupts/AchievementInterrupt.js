import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import achievements from 'modules/achievements/specs';

class AchievementInterrupts extends Component {
  render() {
    var achievement = _.find(achievements, {id: this.props.action.achievement});
    return (
      <div className="w-100 h-100 card align-middle text-center">
        <div className="my-auto">
          <p className="lead">Congratulations! You are a </p>
          <p className="display-4">
            <FontAwesomeIcon className="d-block mx-auto" icon={['fas', 'star']} />
            {achievement.name}
          </p>
          <p className="lead">{achievement.description}</p>
            <div className="mt-5">
              <button onClick={this.props.onComplete}
                className="btn btn-primary">Great!
              </button>
            </div>
        </div>
      </div>
    );
  }
}

export default AchievementInterrupts;
