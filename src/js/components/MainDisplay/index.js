import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

class MainDisplay extends Component {

  render() {
    var balanceFormatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 2
    });
    var budgetFormatter = new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0
    });
    return (
      <Fragment>
        <div className="card text-light bg-info">
          <div className="card-header">
            <h3 className="card-title mb-0">You have</h3>
          </div>
          <div className="card-body">
            <h2 className="display-3">{balanceFormatter.format(this.props.budget.balance)}</h2>
          </div>
        </div>
        <div className="text-small text-muted">
          You get {budgetFormatter.format(this.props.budget.budget)} per day
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({budget}) => {
  return {
    budget
  }
}

export default connect(mapStateToProps)(MainDisplay);
