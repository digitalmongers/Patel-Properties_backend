const { z } = require('zod');
const AppError = require('../utils/AppError');

const validate = (schema) => (req, res, next) => {
    try {
        const validSchema = z.object({
            params: schema.params || z.any(),
            query: schema.query || z.any(),
            body: schema.body || z.any(),
        });

        // Parse synchronous
        const parsed = validSchema.parse({
            params: req.params,
            query: req.query,
            body: req.body,
        });

        // Overwrite req properties with parsed values
        Object.assign(req, parsed);

        return next();
    } catch (err) {
        if (err instanceof z.ZodError) {
            const errorMessage = err.errors.map((details) => details.message).join(', ');
            return next(new AppError(400, errorMessage));
        }
        next(err);
    }
};

module.exports = validate;
