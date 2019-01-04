import Pages from './';
import React, { Component, Fragment } from "react";
import { Switch, Route } from 'react-router-dom';

class CurrentPage extends Component {

  render() {
    return (
      <div className="card border-top-0 rounded-top-0 tab-content mb-3">
        <Switch>
          { Pages.map(page => (
            <Route path={`/${page.id}`} key={page.id}>
              <page.Page />
            </Route>
          ))}
        </Switch>
      </div>
    );
  }
}

export default CurrentPage;
