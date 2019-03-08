import React, { Component, Fragment } from "react";
import classnames from 'classnames';
import stars from './stars.json';
import {starCount} from 'modules/stars';
import { connect } from 'react-redux';
import _ from 'lodash';

function bv_to_rgb(bv) {
  var t = 4600 * ((1 / ((0.92 * bv) + 1.7)) +(1 / ((0.92 * bv) + 0.62)) )

  // t to xyY
  var x, y = 0

  if (t >= 1667 & t <= 4000) {
    x = ((-0.2661239 * Math.pow(10,9)) / Math.pow(t,3)) + ((-0.2343580 * Math.pow(10,6)) / Math.pow(t,2)) + ((0.8776956 * Math.pow(10,3)) / t) + 0.179910
  } else if (t > 4000) {
    x = ((-3.0258469 * Math.pow(10,9)) / Math.pow(t,3)) + ((2.1070379 * Math.pow(10,6)) / Math.pow(t,2)) + ((0.2226347 * Math.pow(10,3)) / t) + 0.240390
  }

  if (t >= 1667 & t <= 2222) {
    y = -1.1063814 * Math.pow(x,3) - 1.34811020 * Math.pow(x,2) + 2.18555832 * x - 0.20219683
  } else if (t > 2222 & t <= 4000) {
    y = -0.9549476 * Math.pow(x,3) - 1.37418593 * Math.pow(x,2) + 2.09137015 * x - 0.16748867
  } else if (t > 4000) {
    y = 3.0817580 * Math.pow(x,3) - 5.87338670 * Math.pow(x,2) + 3.75112997 * x - 0.37001483
  }

  // xyY to XYZ, Y = 1
  var Y = 1.0
  var X = (y == 0)? 0 : (x * Y) / y
  var Z = (y == 0)? 0 : ((1 - x - y) * Y) / y

  //XYZ to rgb
  /*var r = 0.41847 * X - 0.15866 * Y - 0.082835 * Z
  var g = -0.091169 * X + 0.25243 * Y + 0.015708 * Z
  var b = 0.00092090 * X - 0.0025498 * Y + 0.17860 * Z*/

  //XYZ to rgb
  var r = 3.2406 * X - 1.5372 * Y - 0.4986 * Z
  var g = -0.9689 * X + 1.8758 * Y + 0.0415 * Z
  var b = 0.0557 * X - 0.2040 * Y + 1.0570 * Z

  //linear RGB to sRGB
  var R = (r <= 0.0031308)? 12.92*r : 1.055*Math.pow(r,1/0.5)-0.055
  var G = (g <= 0.0031308)? 12.92*g : 1.055*Math.pow(g,1/0.5)-0.055
  var B = (b <= 0.0031308)? 12.92*b : 1.055*Math.pow(b,1/0.5)-0.055

  return {r:Math.round(R*255),g:Math.round(G*255),b:Math.round(B*255)};
}


class ConstellationSection extends Component {
  render() {
    var myStars = [];
    var count = starCount(this.props);
    for (var i = 0; i != stars.length; ++i) {
      if (stars[i].system >= count) {
        break;
      }
      if (myStars.length <= stars[i].system) {
        myStars.push(stars[i]);
      } else if (stars[i].absmag < myStars[stars[i].system].absmag) {
        myStars[stars[i].system] = stars[i];
      }
    }
    _.forEach(myStars, star => {
      star.colour = bv_to_rgb(star.colourIndex);
    });
    return (
      <Fragment>
        <p className="lead text-center show-small max-height-lead">Your Constellation</p>
        <div className="star-map border rounded border-secondary aspect-constellation">
          <div className="aspect-p bg-dark">
            <svg id="constellation"
              viewBox="-100 -100 200 200"
              className="aspect">
              {myStars.map(star => (
                <circle key={star.id}
                  cx={star.px * 25} cy={star.py * 25}
                  r={Math.sqrt(star.luminosity) * 2}
                  fill={`rgb(${star.colour.r}, ${star.colour.g}, ${star.colour.b})`}
                   />
              ))}
            </svg>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({achievements}) => ({
  achievements
});

export default connect(
  mapStateToProps
) (ConstellationSection)
