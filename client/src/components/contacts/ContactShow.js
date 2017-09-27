import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchContact } from '../../actions';

class ContactShow extends Component {
	componentDidMount() {
		const { id } = this.props.params;
		this.props.fetchContact(id);
	}
	render() {
		const { contact } = this.props;

		if (!contact) {
			return <div>Loading...</div>;
		}
		return (
			<div>
				{contact.contactTitle} {contact.contactName}
				<br />
				{contact.contactAddress}
			</div>
		);
	}
}

function mapStateToProps({contacts}, ownProps) {
  console.log('hello', ownProps.params)
  return {contact: contacts[ownProps.params.id]}
}

export default connect(mapStateToProps, {fetchContact})(ContactShow)
