const AUTH_CREDENTIALS = {
    'username': 'admin',
    'password': 'password123'
}

const TEST_BOOKING = {
    "firstname": 'Ivan',
    "lastname": 'Ivanov',
    "totalprice": 1000000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": '2022-01-01',
        "checkout": '2022-12-31'
    },
    "additionalneeds": `All-inclusive`
}

const PARTIAL_UPDATE_BOOKING = {
    "firstname": 'Stepan',
    "lastname": 'Stepanov',
    "totalprice": 5000000,
}

module.exports = {
    AUTH_CREDENTIALS,
    TEST_BOOKING,
    PARTIAL_TEST_BOOKING: PARTIAL_UPDATE_BOOKING
}