const checkClient = (req, res, next) => {

    const client = req.headers['user-agent'];
    if (!client) {
        return res.status(400).json({ message: "Client information is missing" });
    }
    else if(isBloackAgent(client)){
        return res.status(403).json({ message: "Access denied for suspicious request" });
    }
    next();
};

const isBloackAgent = (userAgent)=>{
    return blockedPatterns.some(pattern => pattern.test(userAgent));
};

const blockedPatterns =[
    /curl/i,
    /wget/i,
    /python-requests/i,
    /java/i,
    /php/i,
    /node-fetch/i,
    /python/i,
    /go-http-client/i,
    /ruby/i,
    /httpclient/i
];

module.exports = checkClient;