import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import _ from 'lodash';

class RecurrencePage extends Component {

  render() {
    return (
      <div className="card-body text-left py-0 px-0">

      </div>
    );
  }
}

const mapStateToProps = ({history}) => {
  return {
    history
  };
}

export default connect(mapStateToProps) (RecurrencePage);
