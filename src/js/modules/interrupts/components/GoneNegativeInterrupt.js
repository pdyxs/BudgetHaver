import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import achievements from 'modules/achievements/specs';

class GoneNegativeInterrupt extends Component {
  render() {
    return (
      <div className="w-100 h-100 card align-middle text-center p-3">
        <div className="my-auto">
          <p className="lead">Don't Panic!</p>
          <p>
            You're balance has gone negative for the first time.
            This happens sometimes!
          </p>
          <p>
            Sometimes you might stay in the negative for a few days, or even a week or two. That's fine too!
          </p>
          <p>
            Just make sure you work towards being positive. If you're still in the negative after a while,
            think about increasing your daily budget (assuming that you can afford to).
          </p>
          <div className="mt-5">
            <button onClick={this.props.onComplete} className="btn btn-primary">
              Let's do this!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GoneNegativeInterrupt;
