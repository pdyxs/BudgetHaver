import Pages from './';
import React, { Component, Fragment } from "react";

class HistoryPage extends Component {

  render() {
    return (
      <div className="card-body text-left py-0 px-0" role="tabpanel" id="history" aria-labelledby="history-tab">
        <table className="table m-0">
          <thead>
            <tr>
              <th className="border-top-0">When</th>
              <th className="border-top-0">How much</th>
            </tr>
          </thead>
          <tbody id="historyList">
          </tbody>
        </table>
      </div>
    );
  }
}

export default HistoryPage;
