const mongoose = require('mongoose');

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
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        status: { 
            type: String,
            enum: ['pending', 'resolved', 'ignored'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Add index for faster queries
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
