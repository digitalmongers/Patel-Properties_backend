const { z } = require('zod');
const { PROPERTY_INTERESTS, REGEX } = require('../constants');

const submitContact = {
    body: z.object({
        name: z.string().min(1, 'Name is required').max(100),
        email: z.string().email('Invalid email address'),
        phone: z.string().regex(REGEX.PHONE, 'Invalid phone number format'),
        propertyInterest: z.enum(PROPERTY_INTERESTS, {
            errorMap: () => ({ message: 'Please select a valid property interest' }),
        }),
        message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
    }),
};

const getContacts = {
    query: z.object({
        page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
        limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
    }),
};

const getContact = {
    params: z.object({
        contactId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Contact ID format'),
    }),
};

module.exports = {
    submitContact,
    getContacts,
    getContact,
};
