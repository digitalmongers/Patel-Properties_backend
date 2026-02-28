const contactRepository = require('../repositories/contact.repository');
const emailService = require('./email.service');
const AppError = require('../utils/AppError');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

class ContactService {
    async submitContactForm(contactData) {
        // Create the contact entry in the database
        const contact = await contactRepository.create(contactData);

        // Fire & Forget email dispatch to prevent blocking the HTTP response
        emailService.sendContactToOwner(contact).catch(err => {
            // Error is handled inside emailService itself, this catch ensures no unhandled promises bubble up
            require('../utils/logger').error('SendGrid Owner Notification Failed', { error: err });
        });

        emailService.sendAcknowledgementToUser(contact).catch(err => {
            require('../utils/logger').error('SendGrid User Acknowledgment Failed', { error: err });
        });

        return contact;
    }

    async getAllContacts(query) {
        const { page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;

        const filter = {};

        return await contactRepository.findAll(filter, { limit: parseInt(limit), skip });
    }

    async getContact(id) {
        const contact = await contactRepository.findById(id);
        if (!contact) {
            throw new AppError(HTTP_STATUS.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND);
        }
        return contact;
    }
}

module.exports = new ContactService();
