const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'https://restful-booker.herokuapp.com',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

module.exports = { instance };