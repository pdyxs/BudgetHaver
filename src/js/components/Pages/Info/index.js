import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { faInstagram, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import strings from 'modules/localisation';

library.add(faInstagram);
library.add(faTwitter);
library.add(faMedium);

class InfoPage extends Component {

  render() {
    return (
      <div className="card-body">
        <p>
          {strings.formatString(strings.Byline, {title: strings.AppTitle, author: <span className="font-weight-bold">{strings.Author}</span>})}
        </p>
        <dl className="row">
          <dt className="col-5">{strings.Website}</dt>
          <dd className="col-7"><a href="https://pdyxs.wtf">{`pdyxs.wtf`}</a></dd>

          <dt className="col-5">{strings.Blog}</dt>
          <dd className="col-7">
            <a href="https://medium.com/@pdyxs">@{strings.Username}<span className="pl-3"><FontAwesomeIcon icon={['fab', 'medium']} /></span></a>
          </dd>

          <dt className="col-5">{strings.Social}</dt>
          <dd className="col-7">
            <a href="https://instagram.com/pdyxs">@{strings.Username}<span className="pl-3"><FontAwesomeIcon icon={['fab', 'instagram']} /></span></a>
            <a href="https://twitter.com/pdyxs"><span className="pl-3"><FontAwesomeIcon icon={['fab', 'twitter']} /></span></a>
          </dd>

          <dt className="col-5">{strings.Email}</dt>
          <dd className="col-7"><a href="mailto:talk@pdyxs.wtf">{`talk@pdyxs.wtf`}</a></dd>
        </dl>
        <p>{strings.Feedback}</p>
      </div>
    );
  }
}

export default InfoPage;
