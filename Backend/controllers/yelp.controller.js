const yelpService = require('../services/yelp.service')

module.exports = {
    getYelpIds,
    getYelpInfo
};


function getYelpIds(req, res, next) {
    yelpService.getYelpIds(req.body.lat, req.body.lng, req.body.passcode)
        .then(data => res.json(data))
        .catch(err => next(err));
}

function getYelpInfo(req, res, next) {
    yelpService.getYelpInfo(req.body)
        .then(data => res.json(data))
        .catch(err => next(err));
}


