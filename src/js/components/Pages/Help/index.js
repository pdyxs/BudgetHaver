import Pages from './';
import React, { Component, Fragment } from "react";
import ReactMarkdown from 'react-markdown';
import Help from './help.md';

class HelpPage extends Component {

  render() {
    return (
      <div className="card-body text-left" role="tabpanel" id="help">
        <ReactMarkdown source={Help} escapeHtml={false} />
      </div>
    );
  }
}

export default HelpPage;
