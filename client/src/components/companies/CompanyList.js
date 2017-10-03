import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchCompanies } from '../../actions';

class CompanyList extends Component {
	componentDidMount() {
			this.props.fetchCompanies();
	}
	renderCompanies() {
		return _.map(this.props.companies, company => {
			return (
				<div className="collection" key={company._id}>
					<Link to={`/contacts/${company._id}`} className="collection-item">
          <div className="row">
            <div className="col s3">{company.companyName}</div>
            <div className="col s3">{company.companyAddress}</div>
            <div className="col s3">{company.companyTelephone}</div>
            <div className="col s3 right-align">{company.companyWebsite}</div>
          </div>

					</Link>
				</div>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Companies</h3>
				<div>{this.renderCompanies()}</div>
			</div>
		);
	}
}

function mapStateToProps({ companies }) {
	return { companies };
}

export default connect(mapStateToProps, { fetchCompanies })(CompanyList);
