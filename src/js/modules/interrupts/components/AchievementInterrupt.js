import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import achievements from 'modules/achievements/specs';

import { InterruptStrings } from 'modules/localisation';

class AchievementInterrupts extends Component {
  render() {
    var achievement = _.find(achievements, {id: this.props.action.achievement});
    return (
      <div className="w-100 h-100 card align-middle text-center py-3 mb-3 overflow-auto">
        <div className="my-auto">
          <p className="lead">{InterruptStrings.AchievementCongrats}</p>
          <p className="display-4">
            <FontAwesomeIcon className="d-block mx-auto" icon={['fas', 'star']} />
            {achievement.name}
          </p>
          <p className="lead">{InterruptStrings.achievement}</p>
          <p className="mt-4 lead">{achievement.description}</p>
          <div className="mt-5">
            <button onClick={this.props.onComplete} className="btn btn-primary">
              {InterruptStrings.AchievementButton}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AchievementInterrupts;
