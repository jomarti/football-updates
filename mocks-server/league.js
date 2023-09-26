const leagues = require('./mocks//leagues.json');

module.exports = {
    path:  `/leagues`,
    method: 'GET',
    status: (req, res, next) => {
        let status = 200;
        res.status(status);
        next();
    },
    template: leagues,
};