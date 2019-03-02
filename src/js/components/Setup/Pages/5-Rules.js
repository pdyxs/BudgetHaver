import React, { Component, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { getCurrencyFormatter } from 'modules/currencies';

import {SetupStrings} from 'modules/localisation';

class Rules extends Component {
  render() {
    var formatter = getCurrencyFormatter(this.props.baseCurrency);
    return (
      <div className="mx-4">
        <div className="lead">{SetupStrings.Rules_Budget_Header}</div>
        <h3 className="display-5">{formatter(this.props.balance)}</h3>
        <div className="text-secondary">
          <p>{SetupStrings.Rules_Header}</p>
          <ol>
            {SetupStrings.Rules_List.map((t, index) =>
              <li key={index} dangerouslySetInnerHTML={{__html: t}}></li>
            )}
          </ol>
        </div>
        <div className="mt-5 text-right">
          <button onClick={this.props.onNext}
            className="btn btn-primary">{SetupStrings.Rules_Next}
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
)(Rules);
