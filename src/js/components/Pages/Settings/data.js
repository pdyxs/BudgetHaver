import Pages from './';
import React, { Component, Fragment } from "react";
import LockableInput from 'components/generics/LockableInput';
import { connect } from 'react-redux';
import _ from 'lodash';
import classnames from 'classnames';

import { setLevel, AnalyticsLevels } from 'modules/analytics';

import strings from 'modules/localisation';
import ReactMarkdown from 'react-markdown';

class DataSettings extends Component
{
  render() {
    return (
      <Fragment>
        <p>{strings.DataWhy}</p>
        <ReactMarkdown source={strings.DataAnonymous} />
        <p className="mb-0">{strings.DataQuestion}</p>
        <div className="list-group mb-2">
          {AnalyticsLevels.map((level, i) => (
            <a key={level.id}
              onClick={() => this.props.setLevel(level.id)}
              className={classnames('list-group-item', 'list-group-item-action', {'active': this.props.trackingLevel == level.id, 'text-white': this.props.trackingLevel == level.id})}>
              {i > 1 &&
                <span className={`text-${this.props.trackingLevel == level.id ? 'white' : 'black'}-50`}>{_(AnalyticsLevels).slice(1, i).map(l => l.name).join(', ')} {strings.and} </span>
              }
              <span className="font-weight-bold">{level.name}</span>
              {level.description &&
                <span> ({level.description})</span>
              }
            </a>
          ))}
        </div>
        <p>{strings.DataAsterisk}</p>
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
