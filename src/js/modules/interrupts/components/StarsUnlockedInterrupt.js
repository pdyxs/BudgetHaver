import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import achievements from 'modules/achievements/specs';

import { InterruptStrings } from 'modules/localisation';

class StarsUnlockedInterrupt extends Component {
  render() {
    return (
      <div className="w-100 h-100 card align-middle text-center p-3">
        <div className="my-auto">
          <p className="lead">{InterruptStrings.FirstStarHeading}</p>
          {InterruptStrings.FirstStarTexts.map((t, index) =>
            <p key={index} dangerouslySetInnerHTML={{__html: t}}></p>
          )}
          <div className="mt-5">
            <button onClick={this.props.onComplete} className="btn btn-primary">
              {InterruptStrings.FirstStarButton}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StarsUnlockedInterrupt;
