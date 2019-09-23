import Pages from '../Pages';
import React, { Component, Fragment } from "react";
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./menu.scss";

class Menu extends Component {

  render() {
    return (
      <ul className="nav nav-tabs mt-2" id="tabMenu" role="tablist">
        { Pages.map(page => (
          <li key={page.id} className={`nav-item${page.startRight ? ' ml-auto' : ''}`}>
            <NavLink className="nav-link" to={`/${page.id}`} activeClassName="active">
              <FontAwesomeIcon icon={['far', page.icon]} />
            </NavLink>
          </li>
        ))}
      </ul>
    );
  }
}

export default Menu;
