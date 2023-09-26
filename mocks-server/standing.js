const leagues = require('./mocks/standings.json');

module.exports = {
    path:  `/standings`,
    method: 'GET',
    status: (req, res, next) => {
        let status = 200;
        res.status(status);
        next();
    },
    template: leagues,
};