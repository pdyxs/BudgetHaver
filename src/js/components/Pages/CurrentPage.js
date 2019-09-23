import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { setHome, toggleHelp } from 'modules/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import classnames from 'classnames';

class CurrentPage extends Component {
  constructor() {
    super();
    this.state = {
      isInHelp: false
    };
  }

  openHelp = () => {
    this.props.toggleHelp(true);
    this.setState({
      isInHelp: true
    });
  }

  closeHelp = () => {
    this.props.toggleHelp(false);
    this.setState({
      isInHelp: false
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname &&
        prevProps.location.pathname !=
       this.props.location.pathname)
    {
      this.props.setHome(this.props.location.pathname);
    }
  }

  render() {
    return (
      <div className={classnames(
          "card", "border-secondary", "bg-light", "border-top-0", "rounded-top-0", "tab-content", "mb-3")}>
        <Switch>
          { Pages.map(page => (
            <Route path={`/${page.id}`} key={page.id}>
              <Fragment>
                {this.state.isInHelp ?
                  <div className="card-body pb-0">
                    <div className="card">
                      <div className="card-body">
                        <div  className="btn btn-link position-absolute"
                              style={{top: '2px', right: '2px'}}
                              onClick={this.closeHelp}>
                          <FontAwesomeIcon icon={['far', 'times']} />
                        </div>
                        <h5 className="card-title">{page.name}</h5>
                        <ReactMarkdown source={page.Help} escapeHtml={false} />
                      </div>
                    </div>
                  </div>
                  :
                  page.Help && <div  className="btn btn-link position-absolute"
                        style={{top: '5px', right: '5px'}}
                        onClick={this.openHelp}>
                    <FontAwesomeIcon icon={['far', 'question']} />
                  </div>
                }
                <page.Page />
              </Fragment>
            </Route>
          ))}
          {this.props.navigation.home != null &&
            <Redirect from={'/'} exact to={this.props.navigation.home} push />
          }
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({navigation}) => {
  return {
    navigation
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setHome: (page) => dispatch(setHome(page)),
    toggleHelp: (newState) => dispatch(toggleHelp(newState))
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps) (CurrentPage)
);
