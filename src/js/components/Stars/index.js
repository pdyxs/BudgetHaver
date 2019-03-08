import React, { Component, Fragment } from "react";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { toggleStars } from 'modules/navigation';
import { starCount } from 'modules/stars';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ExpandableSections from 'components/generics/ExpandableSections';

import './Stars.scss';

import sections from './Sections';

class Stars extends Component {
  constructor() {
    super();
    this.sections = React.createRef();
  }

  toggleExpanded = () => {
    this.sections.current.reset();
    this.props.toggleStars(!this.props.areStarsOpen);
  }

  render() {
    return (
      <Fragment>
        <div className={
            classnames("w-100", "h-100", "fader", {"on": this.props.areStarsOpen})
          }
          onClick={this.toggleExpanded}>
          <div className="fixed-bottom mb-2 ml-3 mr-5 pr-2 text-warning bg-alpha">
            Note: this section is incomplete. Right now you can click on sections
            but that's about it.
          </div>
        </div>
        <div className={
            classnames("stars", "w-100", "border-bottom", "border-primary", "bg-dark", "text-light",
                {"expanded": this.props.areStarsOpen})
          }>
          <ExpandableSections ref={this.sections} sections={sections} />
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
