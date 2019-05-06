import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import moment from 'moment';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

import classnames from 'classnames';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faUndo,
  faBan,
  faEdit,
  faCheck
} from '@fortawesome/pro-regular-svg-icons';

library.add(faEdit);
library.add(faTrash);
library.add(faUndo);
library.add(faBan);
library.add(faCheck);

class HistoryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: 0,
      isToolbox: false,
      isEditing: false,
      editValue: props.record?.transaction[0].amount
    };
  }

  rotateCurrency = () => {
    this.setState({
      transaction: (this.state.transaction + 1) % this.props.record.transaction.length
    })
  }

  toggleToolbox = () => {
    this.setState({
      isToolbox: !this.state.isToolbox,
      isEditing: false
    });
  }

  enableEditing = () => {
    this.setState({
      isEditing: true
    })
  }

  acceptEdit = () => {
    this.setState({
      isEditing: false
    })
  }

  rejectEdit = () => {
    this.setState({
      isEditing: false
    })
  }

  editValue = (evt) => {
    this.setState({
      editValue: evt.target.value
    });
  }

  render() {
    var {date, transaction, amount} = this.props.record;
    var currentTransaction = null;
    if (transaction) {
      if (this.state.isEditing) {
        currentTransaction = transaction[0];
      } else {
        currentTransaction = transaction[this.state.transaction];
      }
      amount = currentTransaction.amount;
    }
    var currencyFormatter = getCurrencyFormatter(
      currentTransaction ? currentTransaction.currency : 'AUD'
    );
    return (
      <tr>
        <td onClick={this.state.isToolbox ? () => {} : this.toggleToolbox}
            className={classnames({'py-2': this.state.isToolbox})}>
          {!this.state.isToolbox &&
            <span>{moment(date).calendar()}</span>
          }
          {this.state.isToolbox &&
            <span className="w-100 d-flex justify-content-around">
              <button className={classnames('btn', 'btn-sm', 'btn-outline-info',
                {'active': this.state.isEditing})}
                onClick={this.enableEditing}
                >
                <FontAwesomeIcon icon={['far', 'edit']} />
              </button>
              {!this.state.isEditing &&
                <Fragment>
                  <button className="btn btn-sm btn-outline-danger">
                    <FontAwesomeIcon icon={['far', 'trash']} />
                  </button>
                  <button className="btn btn-sm btn-outline-secondary"
                    onClick={this.toggleToolbox}>
                    <FontAwesomeIcon icon={['far', 'undo']} />
                  </button>
                </Fragment>
              }
              {this.state.isEditing &&
                <Fragment>
                  <button className={classnames('btn', 'btn-sm', {
                      'btn-outline-success': this.state.editValue != currentTransaction.amount,
                      'btn-outline-secondary': this.state.editValue == currentTransaction.amount
                    })}
                    onClick={this.acceptEdit}
                    disabled={this.state.editValue == currentTransaction.amount}>
                    <FontAwesomeIcon icon={['far', 'check']} />
                  </button>
                  <button className="btn btn-sm btn-outline-danger"
                    onClick={this.rejectEdit}>
                    <FontAwesomeIcon icon={['far', 'ban']} />
                  </button>
                </Fragment>
              }
            </span>
          }
        </td>
        <td onClick={!this.state.isEditing ? this.toggleToolbox : undefined}
          className={classnames("text-right", {'py-2': this.state.isEditing})}>
          {this.state.isEditing &&
            <div className="input-group input-group-sm ml-auto" style={{'maxWidth': '90px'}}>
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {currencies[this.props.baseCurrency].symbol_native}
                </span>
              </div>
              <input className="form-control form-control-sm text-right" type="number"
                onChange={this.editValue}
                value={this.state.editValue} />
            </div>
          }
          {!this.state.isEditing &&
            <Fragment>{currencyFormatter(amount)}</Fragment>
          }
        </td>
        <td className="py-2" onClick={this.rotateCurrency}>
          {currentTransaction &&
            <button className={
                classnames('btn', 'btn-sm', {
                  'btn-outline-primary': transaction.length > 1 && !this.state.isEditing,
                  'btn-outline-secondary': transaction.length == 1 || this.state.isEditing
                })}
              disabled={transaction.length == 1 || this.state.isEditing}>
              {currentTransaction.currency}
            </button>
          }
        </td>
      </tr>
    );
  }
}

const mapStateToProps = ({currencies}) => {
  return {
    ...currencies
  };
}

export default connect(
  mapStateToProps
)(HistoryRow);
