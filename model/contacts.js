const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumbers: [{ type: String, required: true }],
  emails: [{ type: String }],
  address: { type: String },
  createdAt: { type: Date, default: Date.now, immutable: true },
});

// Virtual property for fullname
contactSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Static method for searching by name
contactSchema.statics.findByName = function(name) {
  const names = name.trim().split(' ');
  console.log(`Searching for: firstName: ${names[0]}, lastName: ${names[1]}`);
  if (names.length < 2) {
    throw new Error('Invalid name format. Expected "First Last".');
  }
  return this.findOne({ firstName: names[0], lastName: names[1] });
};


const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
