import Pages from './';
import React, { Component, Fragment } from "react";
import LockableInput from 'components/generics/LockableInput';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

import { setLevel, AnalyticsLevels } from 'modules/analytics';

class DataSettings extends Component
{
  render() {
    return (
      <Fragment>
        <p>Budget Haver collects data to help me better understand how people are using it. I may also use the data to make pretty visualisations.</p>
        <p><span className="font-weight-bold">All data is anonymised</span> (so it can't be traced back to you)</p>
        <p className="mb-0">How much data do you want to send?*</p>
        <div className="list-group mb-2">
          {AnalyticsLevels.map((level, i) => (
            <a key={level.id}
              onClick={() => this.props.setLevel(level.id)}
              className={classnames('list-group-item', 'list-group-item-action', {'active': this.props.trackingLevel == level.id, 'text-white': this.props.trackingLevel == level.id})}>
              {i > 1 &&
                <span className={`text-${this.props.trackingLevel == level.id ? 'white' : 'black'}-50`}>{_(AnalyticsLevels).slice(1, i).map(l => l.name).join(', ')} and </span>
              }
              <span className="font-weight-bold">{level.name}</span>
              {level.description &&
                <span> ({level.description})</span>
              }
            </a>
          ))}
        </div>
        <p>*Note: In order to make the data usable at all, I do record these data collection settings</p>
      </Fragment>
    );
  }
}

const mapStateToProps = ({analytics}) => {
  return {
    ...analytics
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setLevel: (level) => {
      dispatch(setLevel(level))
    }
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(DataSettings);
