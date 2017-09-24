import _ from 'lodash';
import React, { Component } from 'react';
import { Field, Form, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import ContactField from './ContactField';
import { createContact } from '../../actions';
import formField from './formField';
import validateEmails from '../../utils/validateEmail';

class ContactNew extends Component {
	renderFields() {
		return _.map(formField, ({ label, name }) => (
			<Field
				key={name}
				component={ContactField}
				type="text"
				label={label}
				name={name}
			/>
		));
	}
	onSubmit(values) {
		this.props.createContact(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<h3>Add new contact:</h3>
				<Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					{this.renderFields()}
					<button className="waves-effect waves-light btn blue darken-1" type="submit">Save</button>
				</Form>
			</div>
		);
	}
}

function validate(values) {
	const errors = {};

	errors.contactEmail = validateEmails(values.contactEmail || '');

	_.each(formField, ({ name }) => {
		if (!values[name]) {
			errors[name] = 'You must provide a value';
		}
	});
	return errors;
}

export default reduxForm({
	validate,
	form: 'contactForm',
	destroyOnUnmount: false
})(connect(null, { createContact })(ContactNew));
