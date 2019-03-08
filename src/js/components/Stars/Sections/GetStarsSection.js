import React, { Component, Fragment } from "react";
import classnames from 'classnames';

const ways = [
  {
    name: "Gain 1 star per achievement"
  },
  {
    name: "Buy 1 star",
    button: "(price here)"
  },
  {
    name: "Buy 3 stars",
    button: "(price here)"
  },
  {
    name: "Buy 10 stars",
    button: "(price here)"
  },
  {
    name: "Give stars, get a star",
    button: "Rate the app"
  }
]

class GetStarsSection extends Component {
  render() {
    return (
      <Fragment>
        <p className="lead text-center pb-0 mb-0">Get more stars</p>
        <div className="show-full" style={{maxHeight: "335px"}}>
          <p className="small">I'm making this app in my spare time. The more support it gets,
            the more time I'll be able to put into making it better and making more apps like it.</p>
          <ul className="list-group">
            {ways.map((way, i) => (
              <li key={i} className="list-group-item bg-dark color-light border-light p-2 d-flex justify-content-between align-items-center">
                <span>{way.name}</span>
                {way.button &&
                  <button className="ml-1 btn btn-primary">{way.button}</button>
                }
              </li>
            ))}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default GetStarsSection;
