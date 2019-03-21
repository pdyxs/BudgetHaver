import React, { Component, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import './Setup.scss';
import Pages from './Pages';

class Setup extends Component
{
  constructor() {
    super();
    this.state = {
      page: 0,
      finished: false
    };
  }

  nextPage = () => {
    if (this.state.page + 1 < Pages.length) {
      this.setState({
        page: this.state.page + 1
      });
    } else {
      this.setState({
        finished: true
      });
    }
  }

  render() {
    if (this.state.finished) {
      return (
        <Redirect to="/spend" />
      );
    }
    var Page = Pages[this.state.page];
    return (
      <div className="card card-fullpage align-middle text-center py-3 mb-3 overflow-auto">
        <div className="my-auto">
          <Page onNext={this.nextPage} />
        </div>
      </div>
    );
  }
}

export default Setup;
