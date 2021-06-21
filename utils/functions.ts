const restfulBooker_instance = require('../config/restful-booker.config.ts').instance;
const API_PATHS = require('../data/endpoints.ts').API_PATHS;
const AUTH_CREDENTIALS = require('../data/constants.ts').AUTH_CREDENTIALS;

class Functions {
    constructor() {
    }

    getAuthorizationToken() {
        return restfulBooker_instance.post(API_PATHS.AUTHORIZATION, AUTH_CREDENTIALS)
            .then(response => response.data.token)
            .catch(err => console.error(err));
    }

    getBookingsTotalQuantity() {
        return restfulBooker_instance.get(API_PATHS.ALL_BOOKINGS)
            .then(response => response.data.length)
            .catch(error => error);
    }

    requestFor(api_path) {
        return restfulBooker_instance.get(api_path)
            .then(res => res)
            .catch(error => error);
    }

    createBooking(api_path, booking_info) {
        return restfulBooker_instance.post(api_path, booking_info)
            .then(response => response)
            .catch(err => console.error(err));
    }

    updateBooking(booking_id, update_info, authorization_token) {
        return restfulBooker_instance.put(API_PATHS.SPECIFIED_BOOKING(booking_id), update_info, {
            headers: {
                'Cookie': `token=${authorization_token}`
            }
        })
            .then(response => response)
            .catch(err => console.error(`ERROR: ${err.response.status} ${err.response.statusText}`))
    }

    partiallyUpdateBooking(booking_id, update_info, authorization_token) {
        return restfulBooker_instance.patch(API_PATHS.SPECIFIED_BOOKING(booking_id), update_info, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${authorization_token}`
            }
        })
            .then(response => response.data)
            .catch(err => console.error(`ERROR: ${err.response.status} ${err.response.statusText}`))
    }

    deleteBooking(booking_id, authorization_token) {
        return restfulBooker_instance.delete(API_PATHS.SPECIFIED_BOOKING(booking_id), {
            headers: {
                'Cookie': `token=${authorization_token}`
            }
        }).catch(err => err);
    }
}

module.exports = new Functions();
