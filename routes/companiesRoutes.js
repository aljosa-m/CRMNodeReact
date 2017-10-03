const mongoose = require('mongoose');
const Path = require('path-parser');
const { URL } = require('url');
const Company = mongoose.model('companies');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.get('/api/companies', async (req, res) => {
		const companies = await Company.find();
		res.send({ companies });
	});

	app.post('/api/companies', async (req, res) => {
		const {
			companyName,
			companyAddress,
			companyTelephone,
			companyWebsite
		} = req.body;

		const company = await new Company({
      companyName,
			companyAddress,
			companyTelephone,
			companyWebsite
		}).save();
		res.send('company');
	});

	app.get('/api/companies/:id', async (req, res) => {
		const company = await Company.findOne({ _id: req.params.id });
		res.send({ company });
	});

	app.delete('/api/companies/:id/delete', async (req, res) => {
		const company = await Company.findOneAndRemove({ _id: req.params.id });
		res.send({ company });
	});
};
