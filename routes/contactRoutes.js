const mongoose = require('mongoose');
const Path = require('path-parser');
const { URL } = require('url');
const Contact = mongoose.model('contacts');
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.get('/api/contacts', async (req, res) => {
		const contacts = await Contact.find();
		res.send({ contacts });
	});

	app.post('/api/contacts', async (req, res) => {
		const {
			contactTitle,
			contactName,
			contactLastName,
			contactEmail,
			contactTelephone,
			contactAddress
		} = req.body;

		const contact = await new Contact({
			contactTitle,
			contactName,
			contactLastName,
			contactEmail,
			contactTelephone,
			contactAddress
		}).save();
		res.send('contact');
	});

  app.get('/api/contacts/:id', async(req, res) => {
    const contact = await Contact.findOne({_id: req.params.id})
    res.send({contact})
  })

  app.delete('/api/contacts/:id/delete', async(req, res) => {
    const contact = await Contact.findOneAndRemove({_id: req.params.id})
    res.send({contact})
  })
}
