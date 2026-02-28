const contactService = require('../services/contact.service');
const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/ApiResponse');
const { HTTP_STATUS, SUCCESS_MESSAGES } = require('../constants');

const submitContact = catchAsync(async (req, res) => {
    const contact = await contactService.submitContactForm(req.body);
    res.status(HTTP_STATUS.CREATED).send(new ApiResponse(HTTP_STATUS.CREATED, contact, SUCCESS_MESSAGES.CREATED));
});

const getContacts = catchAsync(async (req, res) => {
    const contacts = await contactService.getAllContacts(req.query);
    res.status(HTTP_STATUS.OK).send(new ApiResponse(HTTP_STATUS.OK, contacts, SUCCESS_MESSAGES.FETCHED));
});

const getContact = catchAsync(async (req, res) => {
    const contact = await contactService.getContact(req.params.contactId);
    res.status(HTTP_STATUS.OK).send(new ApiResponse(HTTP_STATUS.OK, contact, SUCCESS_MESSAGES.FETCHED));
});

module.exports = {
    submitContact,
    getContacts,
    getContact,
};
