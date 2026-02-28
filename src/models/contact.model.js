const mongoose = require('mongoose');
const { PROPERTY_INTERESTS } = require('../constants');

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        propertyInterest: {
            type: String,
            required: true,
            enum: PROPERTY_INTERESTS,
        },
        message: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add index for faster queries
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
