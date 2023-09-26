const countries = require('./mocks/countries.json');

module.exports = {
    path:  `/countries`,
    method: 'GET',
    status: (req, res, next) => {
        let status = 200;
        res.status(status);
        next();
    },
    template: countries,
};