import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';

import { faInstagram, faTwitter, faMedium } from '@fortawesome/free-brands-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faInstagram);
library.add(faTwitter);
library.add(faMedium);

class InfoPage extends Component {

  render() {
    return (
      <div className="card-body">
        <p>Budget Haver was made by <span className="font-weight-bold">Paul Sztajer</span></p>
        <dl className="row">
          <dt className="col-5">Website</dt>
          <dd className="col-7"><a href="https://pdyxs.wtf">{`pdyxs.wtf`}</a></dd>

          <dt className="col-5">Blog</dt>
          <dd className="col-7">
            <a href="https://medium.com/@pdyxs">@pdyxs<span className="pl-3"><FontAwesomeIcon icon={['fab', 'medium']} /></span></a>
          </dd>

          <dt className="col-5">Social</dt>
          <dd className="col-7">
            <a href="https://instagram.com/pdyxs">@pdyxs<span className="pl-3"><FontAwesomeIcon icon={['fab', 'instagram']} /></span></a>
            <a href="https://twitter.com/pdyxs"><span className="pl-3"><FontAwesomeIcon icon={['fab', 'twitter']} /></span></a>
          </dd>

          <dt className="col-5">Email</dt>
          <dd className="col-7"><a href="mailto:talk@pdyxs.wtf">{`talk@pdyxs.wtf`}</a></dd>
        </dl>
        <p>I'd love to hear feedback on this app, please send it on whichever platform suits you best</p>
      </div>
    );
  }
}

export default InfoPage;
