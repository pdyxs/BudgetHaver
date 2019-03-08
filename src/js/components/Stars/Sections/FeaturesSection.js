import React, { Component, Fragment } from "react";
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const features = [
  {
    name: "Up-to-date exchange rates",
    description: "Right now the exchange rates are updated when the app is, which is about once a month. This feature would make this update every day",
    votes: 150
  },
  {
    name: "Save to Cloud",
    description: "Right now your data is only saved to your device. This would save it to the cloud, so that it's synchronised accross devices (and backed up in case you lose your phone)",
    votes: 280
  },
  {
    name: "Recurring Expenses",
    description: "A new screen that allows you to log recurring expenses and income, and see your full costs with your current budget",
    votes: 103
  },
  {
    name: "Reports (required for categories)",
    description: "A new screen that shows you how much you've spent in the last month",
    votes: 230
  }
];

const totalStarsNeeded = 1000;

const starsSoFar = 600;

const votesLeft = 1;

class FeaturesSection extends Component {
  render() {
    var progress = 100 * starsSoFar / totalStarsNeeded;
    return (
      <Fragment>
        <p className="lead text-center show-small max-height-lead">Your stars contribute to new features</p>
        <p className="pb-0 mb-0 show-small max-height-line">Progress to next Feature:</p>
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{width: `${progress}%`}} aria-valuenow={`${progress}%`} aria-valuemin="0" aria-valuemax="100">
            <span className="show-full hidden-by-opacity">
              {starsSoFar}
              <FontAwesomeIcon className="text-light icon" icon={['fas', 'star']} />
            </span>
          </div>
        </div>
        <div className="text-right show-full max-height-line">
          {totalStarsNeeded} <FontAwesomeIcon className="text-light icon" icon={['fas', 'star']} />
        </div>
        <div className="show-full mt-3" style={{maxHeight: "240px"}}>
          <p className="mb-0 lead text-center">Vote for the next feature</p>
          <p className="mb-0 small text-center">You have {votesLeft} vote left</p>
          <ul className="list-group">
            {features.map((feature, i) => (
              <li key={i} className="list-group-item bg-dark color-light border-light p-0 d-flex justify-content-between align-items-center">
                <span className="mx-2">{feature.name}</span>
                <span>
                  <span className="badge badge-primary badge-pill">{feature.votes}</span>
                  <button className="ml-1 btn btn-success">+</button>
                </span>
              </li>
            ))}
          </ul>
        </div>


      </Fragment>
    )
  }
}

export default FeaturesSection;
