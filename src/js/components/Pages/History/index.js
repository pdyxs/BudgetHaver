import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import HistoryRow from './HistoryRow';

class HistoryPage extends Component {

  render() {
    var list = _.reverse(_.takeRight(this.props.history.list, 5));
    return (
      <div className="card-body text-left py-0 px-0">
        <table className="table m-0">
          <thead>
            <tr>
              <th className="border-top-0">When</th>
              <th className="border-top-0">Amount</th>
              <th className="border-top-0"></th>
            </tr>
          </thead>
          <tbody id="historyList">
            {list.map((record, index) => (
              <HistoryRow record={record} key={index} />
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
