const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
  contactTitle: String,
  contactName: String,
  contactLastName: String,
  contactEmail: String,
  contactTelephone: String,
  contactAddress: String
})

mongoose.model('contacts', contactSchema);
