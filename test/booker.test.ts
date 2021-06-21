const API_PATHS = require('../data/endpoints.ts').API_PATHS;
const TEST_BOOKING = require('../data/constants.ts').TEST_BOOKING;
const PARTIAL_TEST_BOOKING = require('../data/constants.ts').PARTIAL_TEST_BOOKING;
const {expect} = require('chai');
const Functions = require('../utils/functions.ts');


describe('Restful-booker', () => {
    let authToken: string = '';

    before('should create auth token', async () => {
        authToken = await Functions.getAuthorizationToken();
    });

    it('should respond to ping', async () => {
        const response = await Functions.requestFor(API_PATHS.PING);

        expect(response.status).to.equal(201);
        expect(response.statusText).to.equal('Created');
    });

    it('should return 404 error for non-existent page', async () => {
        const reqResponse = await Functions.requestFor(API_PATHS.INVALID_ADDRESS);

        expect(reqResponse.response.status).to.equal(404);
        expect(reqResponse.response.statusText).to.equal('Not Found');
    });


    it('should get ids of all bookings available', async () => {
        const bookingsQuantity: number = await Functions.getBookingsTotalQuantity();

        expect(bookingsQuantity).to.be.greaterThanOrEqual(10);
    });


    it('should get booking with specified ID', async () => {
        const bookingId = 3;
        const booking = await Functions.requestFor(API_PATHS.SPECIFIED_BOOKING(bookingId));

        expect(booking.status).to.equal(200);
        expect(booking.statusText).to.equal('OK');
        expect(booking.data.firstname).to.be.a('string');
        expect(booking.data.lastname).to.be.a('string');
        expect(booking.data.totalprice).to.be.a('number');
        expect(booking.data.depositpaid).to.be.a('boolean');
    });

    it('should create new booking', async () => {
        const initialBookingsQuantity: number = await Functions.getBookingsTotalQuantity();
        const newBooking = await Functions.createBooking(API_PATHS.ALL_BOOKINGS, TEST_BOOKING);
        const updatedBookingsQuantity: number = await Functions.getBookingsTotalQuantity();

        expect(newBooking.status).to.equal(200);
        expect(newBooking.statusText).to.equal('OK');
        expect(newBooking.data.booking.firstname).to.equal(TEST_BOOKING.firstname);
        expect(newBooking.data.booking.lastname).to.equal(TEST_BOOKING.lastname);
        expect(newBooking.data.booking.totalprice).to.equal(TEST_BOOKING.totalprice);
        expect(newBooking.data.booking.depositpaid).to.equal(TEST_BOOKING.depositpaid);
        expect(newBooking.data.booking.bookingdates.checkin).to.equal(TEST_BOOKING.bookingdates.checkin);
        expect(newBooking.data.booking.bookingdates.checkout).to.equal(TEST_BOOKING.bookingdates.checkout);
        expect(newBooking.data.booking.additionalneeds).to.equal(TEST_BOOKING.additionalneeds);
        expect(updatedBookingsQuantity).to.equal(initialBookingsQuantity + 1);
    });

    it('should update booking with specified id', async () => {
        const bookingId = 1;
        const initialBooking = await Functions.requestFor(API_PATHS.SPECIFIED_BOOKING(bookingId));
        const updatedBooking = await Functions.updateBooking(bookingId, TEST_BOOKING, authToken);

        expect(updatedBooking.status).to.equal(200);
        expect(updatedBooking.statusText).to.equal('OK');
        expect(initialBooking.data.firstname).not.to.equal(updatedBooking.data.firstname);
        expect(updatedBooking.data.firstname).to.equal(TEST_BOOKING.firstname);
        expect(initialBooking.data.lastname).not.to.equal(updatedBooking.data.lastname);
        expect(updatedBooking.data.lastname).to.equal(TEST_BOOKING.lastname);
        expect(initialBooking.data.totalprice).not.to.equal(updatedBooking.data.totalprice);
        expect(updatedBooking.data.totalprice).to.equal(TEST_BOOKING.totalprice);
        expect(updatedBooking.data.depositpaid).to.equal(TEST_BOOKING.depositpaid);
        expect(updatedBooking.data.bookingdates.checkin).to.equal(TEST_BOOKING.bookingdates.checkin);
        expect(updatedBooking.data.bookingdates.checkout).to.equal(TEST_BOOKING.bookingdates.checkout);
        expect(updatedBooking.data.additionalneeds).to.equal(TEST_BOOKING.additionalneeds);
    });

    it('should partially update specified booking', async () => {
        const bookingId = 7;
        const initialBooking = await Functions.requestFor(API_PATHS.SPECIFIED_BOOKING(bookingId));
        const updatedBooking = await Functions.partiallyUpdateBooking(bookingId, PARTIAL_TEST_BOOKING, authToken);

        expect(initialBooking.firstname).to.not.equal(updatedBooking.firstname);
        expect(updatedBooking.firstname).to.equal(PARTIAL_TEST_BOOKING.firstname);
        expect(initialBooking.lastname).to.not.equal(updatedBooking.lastname);
        expect(updatedBooking.lastname).to.equal(PARTIAL_TEST_BOOKING.lastname);
        expect(initialBooking.totalprice).to.not.equal(updatedBooking.totalprice);
        expect(updatedBooking.totalprice).to.equal(PARTIAL_TEST_BOOKING.totalprice);
    });

    it('should delete specified booking', async () => {
        const bookingId = 2;
        const initialBookingsQuantity = await Functions.getBookingsTotalQuantity();
        await Functions.deleteBooking(bookingId, authToken);
        const updatedBookingsQuantity = await Functions.getBookingsTotalQuantity();

        expect(updatedBookingsQuantity).to.equal(initialBookingsQuantity - 1);
    })
});