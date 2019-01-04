import Pages from './';
import React, { Component, Fragment } from "react";

class SettingsPage extends Component {

  render() {
    return (
      <div className="card-body text-left" role="tabpanel" id="settings">
        <div className="form-group">
          <label>Override Balance</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input readOnly type="number" pattern="-?\d+\.\d*" className="form-control" id="balanceOverrideInput" placeholder="0" />
            <div className="input-group-append">
              <button className="btn btn-danger unlock-edit-button" target="#balanceOverrideInput">
                <i className="far fa-edit locked"></i>
                <i className="far fa-lock unlocked"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Daily Budget</label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input readOnly type="number" pattern="\d*" className="form-control" id="dailyBudgetInput" placeholder="0" />
            <div className="input-group-append">
              <button className="btn btn-danger unlock-edit-button" target="#dailyBudgetInput">
                <i className="far fa-edit locked"></i>
                <i className="far fa-lock unlocked"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
