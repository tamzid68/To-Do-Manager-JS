const rateLimit = require('express-rate-limit');

const rateLimitMiddleware = rateLimit({
    windowMs: 10*1000, // 10 seconds
    max: 5, // Limit each IP to 5 requests per `window` (here, per 10 seconds)
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = rateLimitMiddleware;
