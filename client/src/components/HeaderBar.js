import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class HeaderBar extends Component {
  renderContent() {
    switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
          <div>
            <li key="5"><a href="/api/register">Sign Up</a></li>
          </div>
        )
			default:
				return (
          <div>
            <li key="1">
  						<Link to="/login">Login</Link>
  					</li>
            <li key="2">
  						<Link to="/register">Register</Link>
  					</li>
            <li key="3">
  						<a href="/api/logout">Logout</a>
  					</li>
          </div>
        )
		}

  }
	render() {
		return (
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Logo</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>    );
	}
}

export default HeaderBar;
