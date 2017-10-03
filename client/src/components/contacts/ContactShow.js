import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchContact, deleteContact } from '../../actions';

class ContactShow extends Component {
	componentDidMount() {
		const { id } = this.props.params;
		this.props.fetchContact(id);
	}
	onDeleteClick() {
		const {id} = this.props.params;

		this.props.deleteContact(id, () => {
			this.props.history.push('/contacts');
		})
	}
	render() {
		const { contact } = this.props;

		if (!contact) {
			return (
				<div className="center-align">
					<br />
					<br />
					<br />
					<div className="preloader-wrapper big active">
						<div className="spinner-layer spinner-blue-only">
							<div className="circle-clipper left">
								<div className="circle"></div>
							</div><div className="gap-patch">
								<div className="circle"></div>
							</div><div className="circle-clipper right">
								<div className="circle"></div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return (
			<div>
				<br />
				<br />
				<br />
				<div className="card">
			    <div className="card-content">
						Title: <strong> {contact.contactTitle} </strong><br />
						Name: <strong> {contact.contactName} {contact.contactLastName} </strong><br />
						Telephone: <strong> {contact.contactTelephone} </strong><br />
						Address: <strong> {contact.contactAddress} </strong><br />
						<button className="waves-effect waves-light btn red darken-1 button-right" onClick={this.onDeleteClick.bind(this)}>
							Delete Contact
						</button>
			    </div>
			  </div>
			</div>
		);
	}
}

function mapStateToProps({contacts}, ownProps) {
  console.log('hello', ownProps.params)
  return {contact: contacts[ownProps.params.id]}
}

export default connect(mapStateToProps, {fetchContact, deleteContact})(ContactShow)
