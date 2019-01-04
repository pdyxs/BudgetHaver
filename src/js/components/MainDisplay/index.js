import React, { Component, Fragment } from "react";

class MainDisplay extends Component {

  render() {
    return (
      <Fragment>
        <div className="card text-light bg-info">
          <div className="card-header">
            <h3 className="card-title mb-0">You have</h3>
          </div>
          <div className="card-body">
            <h2 className="display-3">$300.00</h2>
          </div>
        </div>
        <div className="text-small text-muted">
          You get $50 per day
        </div>
      </Fragment>
    );
  }
}

export default MainDisplay;
