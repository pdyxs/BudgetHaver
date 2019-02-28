import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import achievements from 'modules/achievements/specs';

class StarsUnlockedInterrupt extends Component {
  render() {
    return (
      <div className="w-100 h-100 card align-middle text-center p-3">
        <div className="my-auto">
          <p className="lead">You just got your first star!</p>
          <p>
            You get a star for each achievement you finish, and for
            supporting the app (both with and without money)*.
          </p>
          <p>
            Once a certain number of stars are gained globally, I'll
            add another feature to the app*. You can spend Stars to vote
            on what that feature is*.
          </p>
          <p>
            *none of this works yet. Plan is for it to be in the release version
          </p>
          <div className="mt-5">
            <button onClick={this.props.onComplete} className="btn btn-primary">
              Show me my star!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StarsUnlockedInterrupt;
