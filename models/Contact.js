const mongoose = require('mongoose');
const {Schema} = mongoose;

const contactSchema = new Schema({
  contactTitle: String,
  contactName: String,
  constactLastName: String,
  contactEmail: String,
  contactTelephone: String,
  contactDob: Date,
  contactAddress: String
})

mongoose.model('contacts', contactSchema);
