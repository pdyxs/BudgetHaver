import Pages from './';
import React, { Component, Fragment } from "react";

class SpendPage extends Component {

  render() {
    return (
      <div className="card-body" role="tabpanel" id="spend" aria-labelledby="spend-tab">
        <div className="input-group rounded-bottom-0">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
          </div>
          <input id="spendMoneyInput" type="number" pattern="-?\d+\.\d*" className="form-control" placeholder="0.00" />
        </div>
        <div className="progress mb-2 rounded-top-0">
          <div className="progress-bar bg-success" role="progressbar" id="spendingBar"
            style={{width: "100%"}}></div>
        </div>
        <div className="mb-3">
          <select id="currencySelector" className="custom-select" value="1">
            <option value="1">AUD</option>
            <option value="0.71">USD</option>
            <option value="2250">Colombian Peso</option>
            <option value="0.62">Euro</option>
          </select>
          <div id="currencyConverter" className="text-small text-muted">
            = <span id="convertedCurrency">32</span> AUD
          </div>
        </div>
        <button className="btn btn-lg btn-danger" id="spendButton" disabled>Spend Money!</button>
      </div>
    );
  }
}

export default SpendPage;
