const express = require('express');
const validate = require('../../middlewares/validate.middleware');
const contactValidation = require('../../validations/contact.validation');
const contactController = require('../../controllers/contact.controller');

const router = express.Router();

router
    .route('/')
    .post(validate(contactValidation.submitContact), contactController.submitContact)
    .get(validate(contactValidation.getContacts), contactController.getContacts);

router
    .route('/:contactId')
    .get(validate(contactValidation.getContact), contactController.getContact);

module.exports = router;
