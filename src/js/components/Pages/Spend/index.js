import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { spendMoney } from 'modules/budget';

class SpendPage extends Component {
  constructor() {
    super();
    this.state = {
      spendInput: ''
    };
  }

  spendInputChanged = (evt) => {
    this.setState({
      spendInput: Number(evt.target.value)
    });
  }

  spend = () => {
    this.props.spend(this.state.spendInput);
    this.setState({
      spendInput : ''
    });
  }

  render() {
    var percentLeft = Math.max(0, 100 * (1 - this.state.spendInput / this.props.budget.balance));
    var canSpend = this.state.spendInput != 0;
    var spendStyle = percentLeft > 50 ? 'success' :
                     percentLeft > 0 ? 'warning' :
                                        'danger';
    return (
      <div className="card-body text-center" role="tabpanel" id="spend" aria-labelledby="spend-tab">
        <div className="input-group rounded-bottom-0">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input id="spendMoneyInput" type="number" pattern="-?\d+\.\d*"
            className="form-control" placeholder="0.00"
            value={this.state.spendInput} onChange={this.spendInputChanged} />
        </div>
        <div className="progress mb-2 rounded-top-0">
          <div className={`progress-bar bg-${spendStyle}`} role="progressbar" id="spendingBar"
            style={{width: `${percentLeft}%`}}></div>
        </div>
        <div className="mb-3">
          <select id="currencySelector" className="custom-select">
            <option value="1">AUD</option>
            <option value="0.71">USD</option>
            <option value="2250">Colombian Peso</option>
            <option value="0.62">Euro</option>
          </select>
          <div id="currencyConverter" className="text-small text-muted">
            = <span id="convertedCurrency">32</span> AUD
          </div>
        </div>
        <button className={`btn btn-lg btn-${spendStyle}`}
          onClick={this.spend}
          id="spendButton" disabled={!canSpend}>Spend Money!</button>
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
    spend: (amount) => {
      dispatch(spendMoney(amount))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(SpendPage);
