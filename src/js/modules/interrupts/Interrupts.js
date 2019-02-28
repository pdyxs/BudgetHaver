import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import './Interrupts.scss';
import classnames from 'classnames';
import interruptTypes from './types';
import { completeInterrupt } from './';

class Interrupts extends Component {
  render() {
    var hasInterrupts = this.props.interrupts?.length > 0;
    var interrupt = hasInterrupts ? this.props.interrupts[0] : null;
    var InterruptComponent = interrupt ?
      _.find(interruptTypes, {id: interrupt.type}).Component : null;
    return (
      <div className={classnames('interrupts', 'p-4', {'on': hasInterrupts})}>
        {hasInterrupts && InterruptComponent &&
          <InterruptComponent action={interrupt.trigger} onComplete={this.props.completeInterrupt} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({interrupts: {active}}) => {
  return {
    interrupts: active
  };
}

const mapDispatchToProps = dispatch => {
  return {
    completeInterrupt: () => dispatch(completeInterrupt())
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Interrupts);
