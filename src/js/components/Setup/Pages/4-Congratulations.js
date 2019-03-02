import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getCurrencyFormatter } from 'modules/currencies';

import strings, { SetupStrings } from 'modules/localisation';

class Congratulations extends Component {
  render() {
    var formatter = getCurrencyFormatter(this.props.baseCurrency);
    return (
      <div className="mx-4">
        <div className="lead">{SetupStrings.Congratulations_Title}</div>
        <div className="lead">{SetupStrings.Congratulations_Title_2}</div>
        <div className="lead mt-3">{SetupStrings.Congratulations_Budget_Header}</div>
        <h3 className="display-5">{formatter(this.props.balance)}<br />
          <small>+{formatter(this.props.budget)}/{strings.day}</small></h3>
        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">{SetupStrings.Congratulations_Next}
            <FontAwesomeIcon className="ml-2" icon={['far', 'chevron-double-right']} />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({budget, currencies}) => {
  return {
    ...budget,
    ...currencies
  };
}

export default connect(
  mapStateToProps
)(Congratulations);
