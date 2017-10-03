const mongoose = require('mongoose');
const {Schema} = mongoose;

const companySchema = new Schema({
  companyName: String,
  companyAddress: String,
  companyTelephone: String,
  companyWebsite: String,
})

mongoose.model('companies', companySchema);
