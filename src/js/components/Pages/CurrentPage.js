import Pages from './';
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { setHome } from 'modules/home';

class CurrentPage extends Component {
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
      <div className="card border-top-0 rounded-top-0 tab-content mb-3">
        <Switch>
          { Pages.map(page => (
            <Route path={`/${page.id}`} key={page.id}>
              <page.Page />
            </Route>
          ))}
          {this.props.home.page != null &&
            <Redirect from={'/'} exact to={this.props.home.page} push />
          }
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({home}) => {
  return {
    home
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setHome: (page) => {
      dispatch(setHome(page))
    }
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps) (CurrentPage)
);
