import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {SetupStrings} from 'modules/localisation';

class Welcome extends Component {
  render() {
    return (
      <div className="mx-4">
        <div className="lead">{SetupStrings.Welcome_Title}</div>
        {SetupStrings.Welcome_Texts.map((t, index) =>
          <p className="text-secondary" key={index}>{t}</p>
        )}
        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">{SetupStrings.Welcome_Next}
            <FontAwesomeIcon className="ml-2" icon={['far', 'chevron-double-right']} />
          </button>
        </div>
      </div>
    );
  }
}

export default Welcome;
