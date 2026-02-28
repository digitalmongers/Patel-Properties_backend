const Contact = require('../models/contact.model');

class ContactRepository {
    async create(data) {
        return await Contact.create(data);
    }

    async findAll(filter = {}, options = {}) {
        const { sort = { createdAt: -1 }, limit = 10, skip = 0 } = options;
        return await Contact.find(filter).sort(sort).skip(skip).limit(limit);
    }

    async findById(id) {
        return await Contact.findById(id);
    }

    async updateById(id, data) {
        return await Contact.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }

    async deleteById(id) {
        return await Contact.findByIdAndDelete(id);
    }
}

module.exports = new ContactRepository();
