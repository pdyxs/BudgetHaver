import React, { Component, Fragment } from "react";
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Stars.scss';

class Stars extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
  }

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    return (
      <Fragment>
        <div className={
            classnames("w-100", "h-100", "fader", {"on": this.state.expanded})
          }>
        </div>
        <div className={
            classnames("stars", "w-100", "border-bottom", "border-primary", "bg-light",
                {"expanded": this.state.expanded})
          }>
          <div className="container py-3">
            <h2 className="display-5 text-center">Stars</h2>
          </div>
          <div className="px-1 pt-2 bg-primary banner"
               onClick={this.toggleExpanded}>
            <FontAwesomeIcon className="text-light icon" icon={['fas', 'star']} />
            <FontAwesomeIcon className="text-primary triangle" icon={['fas', 'caret-down']} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Stars;
