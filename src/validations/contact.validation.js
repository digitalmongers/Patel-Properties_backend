const { z } = require('zod');

const submitContact = {
    body: z.object({
        name: z.string().min(1, 'Name is required').max(100),
        email: z.string().email('Invalid email address'),
        phone: z.string().optional(),
        message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
    }),
};

const getContacts = {
    query: z.object({
        page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
        limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
        status: z.enum(['pending', 'resolved', 'ignored']).optional(),
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
