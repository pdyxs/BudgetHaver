import Pages from './';
import React, { Component, Fragment } from "react";

class HelpPage extends Component {

  render() {
    return (
      <div className="card-body text-left" role="tabpanel" id="help">
        <p><span className="title-content font-italic"></span> is a minimalistic budgeting
        app, designed to force you to make everyday spending decisions consciously.</p>
        <p>To use it, first choose a daily budget in the <i className="far fa-cog"></i> Settings tab.
          This amount will be added to your balance each day.</p>
        <p>Then, whenever you spend money, log it in the <i className="far fa-dollar-sign"></i> Spend tab.
          You should log this at the point of decision (so if some of the money will be automatically
          paid later, put it in when you set that up).</p>
        <p>Finally, take your balance seriously. Going below 0 is bad.</p>
        <p>Things you shouldn't log:
          <ul>
            <li>Recurring costs - these affect your daily budget</li>
            <li>Savings - just lower your daily budget to start saving</li>
            <li>ATM Withdrawals - you still have the money!</li>
          </ul>
        </p>
      </div>
    );
  }
}

export default HelpPage;
