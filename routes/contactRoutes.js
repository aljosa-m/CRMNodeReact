const mongoose = require('mongoose');
const Path = require('path-parser');
const { URL } = require('url');
const Contact = mongoose.model('contacts')
const requireLogin = require('../middlewares/requireLogin');


module.exports = app => {
  app.get('/api/contacts', requireLogin, async(req, res) => {
    const contacts = await Contact.find()
    res.send({contacts})
  })

  app.post('/api/contacts', async(req, res) => {
    const {contactTitle, contactName, constactLastName, contactEmail, contactTelephone, contactDob, contactAddress} = req.body;

    const contact = await (new Contact({
      contactTitle,
      contactName,
      constactLastName,
      contactEmail,
      contactTelephone,
      contactAddress
    })).save()
    res.send('contact')
  })
}
