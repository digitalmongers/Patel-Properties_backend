const sgMail = require('@sendgrid/mail');
const env = require('../configs/env');
const Logger = require('../utils/logger');

if (env.SENDGRID_API_KEY) {
    sgMail.setApiKey(env.SENDGRID_API_KEY);
}

const OWNER_EMAIL = env.OWNER_EMAIL;
const FROM_EMAIL = env.SENDGRID_FROM_EMAIL;
const FROM_NAME = env.SENDGRID_FROM_NAME;

class EmailService {
    /**
     * Send email via SendGrid
     * @param {string} to
     * @param {string} subject
     * @param {string} text
     * @param {string} html
     * @param {string} replyTo - Optional email address to reply to
     * @returns {Promise<void>}
     */
    async sendEmail(to, subject, text, html, replyTo = null) {
        if (!env.SENDGRID_API_KEY) {
            Logger.warn('SENDGRID_API_KEY not set. Email not sent.', { to, subject });
            return;
        }

        const msg = {
            to,
            from: {
                email: FROM_EMAIL,
                name: FROM_NAME,
            },
            ...(replyTo && { replyTo }),
            subject,
            text,
            html,
        };

        try {
            await sgMail.send(msg);
            Logger.info(`Email sent successfully to ${to}`, { subject });
        } catch (error) {
            Logger.error(`Error sending email to ${to}`, { error: error.response ? error.response.body : error.message });
        }
    }

    /**
     * Notify the owner about a new contact submission.
     * @param {Object} contactData 
     */
    async sendContactToOwner(contactData) {
        const subject = `New Contact Form Submission: ${contactData.name}`;
        const text = `
You have a new contact form submission.

Name: ${contactData.name}
Email: ${contactData.email}
Phone: ${contactData.phone}
Property Interest: ${contactData.propertyInterest}

Message:
${contactData.message}
        `;
        const html = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Phone:</strong> ${contactData.phone}</p>
            <p><strong>Property Interest:</strong> ${contactData.propertyInterest}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${contactData.message.replace(/\\n/g, '<br/>')}</p>
        `;

        await this.sendEmail(OWNER_EMAIL, subject, text, html, contactData.email);
    }

    /**
     * Send an acknowledgment email to the user.
     * @param {Object} contactData 
     */
    async sendAcknowledgementToUser(contactData) {
        const subject = 'Thank you for contacting Patel Properties';
        const text = `
Dear ${contactData.name},

Thank you for reaching out to Patel Properties regarding "${contactData.propertyInterest}".
We have received your message and will get back to you as soon as possible.

Here is a copy of your message:
${contactData.message}

Best Regards,
The Patel Properties Team
        `;
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Thank you for contacting Patel Properties</h2>
                <p>Dear ${contactData.name},</p>
                <p>Thank you for reaching out to us regarding <strong>${contactData.propertyInterest}</strong>.</p>
                <p>We have received your message and our team will get back to you as soon as possible.</p>
                <br/>
                <p><strong>Your Message:</strong></p>
                <blockquote style="background-color: #f9f9f9; padding: 15px; border-left: 5px solid #ccc;">
                    ${contactData.message.replace(/\\n/g, '<br/>')}
                </blockquote>
                <br/>
                <p>Best Regards,</p>
                <p><strong>The Patel Properties Team</strong></p>
            </div>
        `;

        await this.sendEmail(contactData.email, subject, text, html);
    }
}

module.exports = new EmailService();
