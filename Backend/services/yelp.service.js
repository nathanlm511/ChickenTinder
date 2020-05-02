'use strict';

const yelp = require('yelp-fusion');
const groupService = require('../services/group.service')

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'P_5KtKHbRtJexfiel456JcvEqweMscQBtX58h1wst_lh4CL00KzfJsDFoBVbwJ6fbJuDGYcoJhE26P2xWvK1kZ9D45fFightSCzplj0bHQrcX6QYojwt1LR5kMWtXnYx';

const client = yelp.client(apiKey);

module.exports = {
    getYelpIds,
    getYelpInfo
}

const numRestaurants = 10;

async function getYelpIds(lat, lng, passcode) {
    const searchRequest = {
        latitude: lat,
        longitude: lng
    };

    const result = await client.search(searchRequest).then(async (response) => {
        let ids = [];
        let names = [];
        for (let i = 0; i < numRestaurants; i++) {
            const id = response.jsonBody.businesses[i].id;
            const name = response.jsonBody.businesses[i].name;
            ids.push(id);
            names.push(name);
        }
        const group = await groupService.addRestaurantsToGroup(passcode, ids, names);
        return ids;
    }).catch(e => {
        console.log(e);
    });
    return result;
}

async function getYelpInfo({id}) {

    const result = await client.business(id).then(response => {
        console.log(response.jsonBody.name);
        return response.jsonBody;
    }).catch(e => {
        console.log(e);
    });
    return result;
}
