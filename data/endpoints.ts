const API_PATHS = {
    AUTHORIZATION: '/auth',
    PING: '/ping',
    INVALID_ADDRESS: '/foo',
    ALL_BOOKINGS: '/booking',
    SPECIFIED_BOOKING: bookingId => `/booking/${bookingId}`
}

module.exports = { API_PATHS };