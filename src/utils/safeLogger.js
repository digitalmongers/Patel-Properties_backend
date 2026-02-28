// Simple stringification and masking function to avoid logging sensitive data

const sensitiveKeys = ['password', 'token', 'authorization', 'cookie', 'secret', 'creditCard'];

const sanitize = (obj) => {
    if (obj === null || obj === undefined) return obj;
    if (typeof obj !== 'object') return obj;

    const sanitized = Array.isArray(obj) ? [] : {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object' && value !== null) {
            // Avoid circular references or deep objects blowing up the log
            try {
                sanitized[key] = sanitize(value);
            } catch (e) {
                sanitized[key] = '[Complex Object]';
            }
        } else {
            if (sensitiveKeys.some((k) => key.toLowerCase().includes(k))) {
                sanitized[key] = '[FILTERED]';
            } else {
                sanitized[key] = value;
            }
        }
    }

    return sanitized;
};

module.exports = { sanitize };
