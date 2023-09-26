const leagues = require('./mocks/teams.json');

module.exports = {
    path:  `/teams`,
    method: 'GET',
    status: (req, res, next) => {
        let status = 200;
        res.status(status);
        next();
    },
    template: leagues,
};