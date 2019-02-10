import React, { Component, Fragment } from "react";
import moment from 'moment';
import { getCurrencyFormatter } from 'modules/currencies';

class HistoryRow extends Component {
  constructor() {
    super();
    this.state = {
      transaction: 0
    };
  }

  rotateCurrency = () => {
    this.setState({
      transaction: (this.state.transaction + 1) % this.props.record.transaction.length
    })
  }

  render() {
    var {date, transaction, amount} = this.props.record;
    var currentTransaction = null;
    if (transaction) {
      currentTransaction = transaction[this.state.transaction];
      amount = currentTransaction.amount;
    }
    var currencyFormatter = getCurrencyFormatter(
      currentTransaction ? currentTransaction.currency : 'AUD'
    );
    return (
      <tr>
        <td>{moment(date).calendar()}</td>
        <td className="text-right">
          {currencyFormatter(amount)}
        </td>
        <td className="py-2">
          {currentTransaction &&
            <button className={`btn btn-sm btn-outline-${transaction.length == 1 ? 'secondary' : 'primary'}`}
              disabled={transaction.length == 1}
              onClick={this.rotateCurrency}>
              {currentTransaction.currency}
            </button>
          }
        </td>
      </tr>
    );
  }
}

export default HistoryRow;
