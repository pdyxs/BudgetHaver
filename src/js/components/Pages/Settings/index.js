import Pages from './';
import React, { Component, Fragment } from "react";
import { NavLink, Switch, Route } from 'react-router-dom';

import CurrencySettings from './currencies';
import SetupSettings from './setup';
import DataSettings from './data';

var pages = [
  {
    id: 'basics',
    name: 'Basics',
    url: '',
    Component: SetupSettings
  },
  {
    id: 'currencies',
    name: 'Currencies',
    url: '/currencies',
    Component: CurrencySettings
  },
  {
    id: 'data',
    name: 'Data',
    url: '/data',
    Component: DataSettings
  }
];

class SettingsPage extends Component
{
  render() {
    return (
      <div className="card-body text-left" role="tabpanel" id="settings">
        <ul className="nav nav-pills mb-3" style={{"marginTop": "-1rem", "marginLeft": "-1rem"}}>
          {pages.map(page => (
            <li className="nav-item" key={page.id}>
              <NavLink to={`/settings${page.url}`} exact activeClassName="active" className="nav-link">{page.name}</NavLink>
            </li>
          ))}
        </ul>
        <Switch>
          {pages.map(page => (
            <Route key={page.id} exact
              path={`/settings${page.url}`}
              component={page.Component} />
          ))}
        </Switch>
      </div>
    );
  }
}

export default SettingsPage;
