import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

var currencyFormatter = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  minimumFractionDigits: 2
});

class HistoryPage extends Component {

  render() {
    var list = _.reverse(_.takeRight(this.props.history.list, 5));
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
            {list.map((record, index) => (
              <tr key={index}>
                <td>{moment(record.date).calendar()}</td>
                <td>{currencyFormatter.format(record.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({history}) => {
  return {
    history
  };
}

export default connect(mapStateToProps) (HistoryPage);
