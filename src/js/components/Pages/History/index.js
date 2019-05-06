import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';
import HistoryRow from './HistoryRow';
import moment from 'moment';

import strings from 'modules/localisation';

class HistoryPage extends Component {

  render() {
    var list = _.reverse(_.takeRightWhile(this.props.history.list,
      (val, index) =>
        this.props.history.list.length - index <= 5 ||
        moment(val.date).isSame(moment(), 'day')
    ));
    return (
      <div className="card-body text-left py-0 px-0">
        <table className="table m-0">
          <colgroup>
            <col />
            <col width="90" />
            <col width="70" />
          </colgroup>
          <thead>
            <tr>
              <th className="border-top-0">{strings.When}</th>
              <th className="border-top-0 text-right pr-1">{strings.Amount}</th>
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
