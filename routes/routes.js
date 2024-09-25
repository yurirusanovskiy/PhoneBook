const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

router.get('/contacts', controllers.getAllContacts);
router.post('/contacts', controllers.createContact);
router.get('/contacts/:name', controllers.getContactByName);
router.put('/contacts/:name', controllers.updateContactByName);
router.delete('/contacts/:name', controllers.deleteContactByName);

module.exports = router;
