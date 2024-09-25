const Contact = require('../model/contacts');

// Create Contact
createContact = async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const existingContact = await Contact.findByName(`${firstName} ${lastName}`);
      if (existingContact) {
        return res.status(400).json({ error: 'A contact with this name already exists.' });
      }
      const newContact = new Contact(req.body);
      await newContact.save();
      res.status(201).json(newContact);
    } catch (error) {
      console.error('Error creating contact:', error.message);
      res.status(400).json({ error: 'Unable to create contact' });
    }
  };
  

// Get all contacts
getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get contact by name
getContactByName = async (req, res) => {
    try {
      const contact = await Contact.findByName(req.params.name);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  

// Update contact by name
updateContactByName = async (req, res) => {
  const { name } = req.params;
  const updateData = req.body;

  try {
    const contact = await Contact.findByName(name);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Updating contact fields
    Object.assign(contact, updateData);

    await contact.save();
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete contact by name
deleteContactByName = async (req, res) => {
  const { name } = req.params;

  try {
    const contact = await Contact.findByName(name);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    // Delete contact by firstName and lastName
    await Contact.deleteOne({ firstName: contact.firstName, lastName: contact.lastName });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createContact,
  getAllContacts,
  getContactByName,
  updateContactByName,
  deleteContactByName
};
