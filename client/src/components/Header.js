import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class Header extends Component {
  renderLinks(){
    if (this.props.authenticated) {
      return (
        <div>
          <li className="nav-item" key={4}>
            <Link className="nav-link" to="/client/new">Add New Client</Link>
          </li>
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signout">Sign Out</Link>
          </li>
          
        </div>

      )
    } else {
      return (
        <div>
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>
          <li className="nav-item" key={3}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
        </div>
      )
    }

  }

  render() {
    return (
      <nav className="nav-wrapper blue darken-1">
        <Link to="/" className="brand-logo center">CRM</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {this.renderLinks()}
        </ul>
      </nav>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}
export default connect(mapStateToProps) (Header);
