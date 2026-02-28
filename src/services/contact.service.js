const contactRepository = require('../repositories/contact.repository');
const AppError = require('../utils/AppError');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../constants');

class ContactService {
    async submitContactForm(contactData) {
        // Here we can add business logic, e.g., checking if ip is rate limited,
        // sending a confirmation email, notifying admins via slack/email, etc.

        const contact = await contactRepository.create(contactData);

        // Example: sendEmail(contact.email, 'Thank you for contacting us!');
        // Example: notifyAdmin('New contact submission from ' + contact.name);

        return contact;
    }

    async getAllContacts(query) {
        const { page = 1, limit = 10, status } = query;
        const skip = (page - 1) * limit;

        const filter = {};
        if (status) filter.status = status;

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
