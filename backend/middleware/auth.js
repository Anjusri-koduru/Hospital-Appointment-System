const auth = (req, res, next) => {
    console.log("Auth Middleware Executed");
    next();
};

module.exports = auth;