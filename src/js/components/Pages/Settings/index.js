import Pages from './';
import React, { Component, Fragment } from "react";
import LockableInput from 'components/generics/LockableInput';
import { connect } from 'react-redux';
import { overrideBalance, overrideBudget } from 'modules/budget';

class SettingsPage extends Component
{

  setBalance = (value) => {
    this.props.overrideBalance(Number(value));
  }

  setBudget = (value) => {
    this.props.overrideBudget(Number(value));
  }

  render() {
    return (
      <div className="card-body text-left" role="tabpanel" id="settings">
        <div className="form-group">
          <label>Override Balance</label>
          <LockableInput
            type="number"
            pattern="-?\d+\.\d*"
            placeholder="0"
            value={this.props.budget.balance || 0}
            onSubmit={this.setBalance}
            prepend={(
              <span className="input-group-text">$</span>
            )}>
          </LockableInput>
        </div>

        <div className="form-group">
          <label>Daily Budget</label>
          <LockableInput
            type="number"
            pattern="-?\d+\.\d*"
            placeholder="0"
            value={this.props.budget.budget || 0}
            onSubmit={this.setBudget}
            prepend={(
              <span className="input-group-text">$</span>
            )}>
          </LockableInput>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({budget}) => {
  return {
    budget
  };
}

const mapDispatchToProps = dispatch => {
  return {
    overrideBalance: (amount) => {
      dispatch(overrideBalance(amount))
    },
    overrideBudget: (amount) => {
      dispatch(overrideBudget(amount))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SettingsPage);
