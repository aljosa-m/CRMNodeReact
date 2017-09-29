import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchContacts } from '../../actions';

class ContactList extends Component {
	componentDidMount() {
			this.props.fetchContacts();
	}
	renderContacts() {
		return _.map(this.props.contacts, contact => {
			console.log(contact);
			return (
				<div className="collection" key={contact._id}>
					<Link to={`/contacts/${contact._id}`} className="collection-item">
          <div className="row">
            <div className="col s3">{contact.contactName}</div>
            <div className="col s3">{contact.contactLastName}</div>
            <div className="col s3">{contact.contactEmail}</div>
            <div className="col s3 right-align">{contact.contactTelephone}</div>
          </div>

					</Link>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Contacts</h3>
				<div>{this.renderContacts()}</div>
			</div>
		);
	}
}

function mapStateToProps({ contacts }) {
	return { contacts };
}

export default connect(mapStateToProps, { fetchContacts })(ContactList);
