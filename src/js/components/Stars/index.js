import React, { Component, Fragment } from "react";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toggleStars } from 'modules/navigation';
import { starCount } from 'modules/stars';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Stars.scss';

class Stars extends Component {
  toggleExpanded = () => {
    this.props.toggleStars(!this.props.areStarsOpen);
  }

  render() {
    return (
      <Fragment>
        <div className={
            classnames("w-100", "h-100", "fader", {"on": this.props.areStarsOpen})
          }
          onClick={this.toggleExpanded}>
        </div>
        <div className={
            classnames("stars", "w-100", "border-bottom", "border-primary", "bg-dark", "text-light",
                {"expanded": this.props.areStarsOpen})
          }>
          <div className="container py-3">
            <h2 className="display-5 text-center">Stars</h2>
            {_.map(this.props.achievements, (val, key) => (
              <Fragment key={key}>
                {val.achieved &&
                  <span>{key}</span>
                }
              </Fragment>
            ))}
          </div>
          <div className="px-1 pt-2 bg-primary banner"
               onClick={this.toggleExpanded}>
            <FontAwesomeIcon className="text-light icon" icon={['fas', 'star']} />
            <div className="count text-primary font-weight-bold">{starCount(this.props)}</div>
            <FontAwesomeIcon className="text-primary triangle" icon={['fas', 'caret-down']} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({achievements, navigation: {areStarsOpen}}) => ({
  achievements,
  areStarsOpen
});

const mapDispatchToProps = dispatch => {
  return {
    toggleStars: (newState) => {
      dispatch(toggleStars(newState))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
) (Stars);
