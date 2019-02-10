import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Welcome extends Component {
  render() {
    return (
      <div className="mx-4">
        <div className="lead">Welcome to Budget Haver</div>
        <div className="text-secondary">Answer three questions, and you'll be the proud owner of a brand new budget!</div>
        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">OK...
            <FontAwesomeIcon className="ml-2" icon={['far', 'chevron-double-right']} />
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
