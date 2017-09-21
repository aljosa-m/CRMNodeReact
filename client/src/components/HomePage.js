import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class HomePage extends Component {
	compoentnWillMount() {
		this.props.fetchMessaage();
	}
	render() {
		return <div>{this.props.message}</div>;
	}
}

function mapStateToProps(state){
  return {message: state.auth.message}
}

export default connect(mapStateToProps, actions)(HomePage);
