import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import moment from 'moment';
import { currencies, getCurrencyFormatter } from 'modules/currencies';

import { deleteHistoryRecord, editHistoryRecord } from 'modules/history';

import classnames from 'classnames';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faBan,
  faEdit,
  faCheck
} from '@fortawesome/pro-regular-svg-icons';

library.add(faEdit);
library.add(faTrash);
library.add(faBan);
library.add(faCheck);

class HistoryRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: 0,
      isToolbox: false,
      isEditing: false,
      isDeleting: false,
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
      isEditing: false,
      isDeleting: false
    });
  }

  enableEditing = () => {
    this.setState({
      isEditing: true,
      editValue: this.props.record?.transaction[0].amount
    })
  }

  acceptEdit = () => {
    this.props.editRecord(this.props.record, this.state.editValue);
    this.setState({
      isEditing: false,
      isToolbox: false
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

  enableDeleting = () => {
    this.setState({
      isDeleting: true
    })
  }

  rejectDelete = () => {
    this.setState({
      isDeleting: false
    })
  }

  acceptDelete = () => {
    this.props.deleteRecord(this.props.record);
    this.setState({
      isDeleting: false,
      isToolbox: false
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
            className={classnames('pr-0', {'py-2': this.state.isToolbox})}>
          {!this.state.isToolbox &&
            <span>{moment(date).calendar()}</span>
          }
          {this.state.isToolbox &&
            <span className="w-100 d-flex justify-content-around">
              {!this.state.isDeleting &&
                <button className={classnames('btn', 'btn-sm', 'btn-outline-info',
                  {'active': this.state.isEditing})}
                  onClick={this.enableEditing}
                  >
                  <FontAwesomeIcon icon={['far', 'edit']} />
                </button>
              }
              {!this.state.isEditing &&
                <button className={classnames('btn', 'btn-sm', 'btn-outline-danger',
                  {'active': this.state.isDeleting})}
                  onClick={this.enableDeleting}>
                  <FontAwesomeIcon icon={['far', 'trash']} />
                </button>
              }
              {!this.state.isEditing && !this.state.isDeleting &&
                <button className="btn btn-sm btn-outline-secondary"
                  onClick={this.toggleToolbox}>
                  <FontAwesomeIcon icon={['far', 'ban']} />
                </button>
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
              {this.state.isDeleting &&
                <Fragment>
                  <button className={classnames('btn', 'btn-sm', 'btn-outline-danger')}
                    onClick={this.acceptDelete}>
                    Delete
                  </button>
                  <button className="btn btn-sm btn-outline-secondary"
                    onClick={this.rejectDelete}>
                    <FontAwesomeIcon icon={['far', 'ban']} />
                  </button>
                </Fragment>
              }
            </span>
          }
        </td>
        <td onClick={(!this.state.isEditing && !this.state.isDeleting) ? this.toggleToolbox : undefined}
          className={classnames("text-right", 'pr-1', {'py-2': this.state.isEditing})}>
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

const mapDispatchToProps = dispatch => {
  return {
    deleteRecord: (record) => dispatch(deleteHistoryRecord(record)),
    editRecord: (record, amount) => dispatch(editHistoryRecord(record, amount))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(HistoryRow);
