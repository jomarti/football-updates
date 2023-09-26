const fixtures = require('./mocks/fixtures.json');

module.exports = {
    path:  `/fixtures`,
    method: 'GET',
    status: (req, res, next) => {
        let status = 200;
        res.status(status);
        next();
    },
    template: fixtures,
};