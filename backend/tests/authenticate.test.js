const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticate = require('../middleware/authenticate');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');
jest.mock('dotenv');
describe('Authenticate Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();
    });

    test('Should allow request with valid token', async () => {
        // Mock a valid token and decoded user
        const mockUser = { id: '12345', email: 'test@example.com' };
        req.headers.authorization = 'Bearer validToken';

        jwt.verify.mockReturnValue(mockUser); // Mocking token verification

        await authenticate(req, res, next);

        expect(req.user).toEqual(mockUser);
        expect(next).toHaveBeenCalled(); // Ensures next() was called
    });

    test('Should return 401 if no token is provided', async () => {
        req.headers.authorization = ''; // No token

        await authenticate(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({ message: 'Access denied.' });
        expect(next).not.toHaveBeenCalled(); // next() should not be called
    });

    test('Should return 401 for invalid token', async () => {
        req.headers.authorization = 'Bearer invalidToken';

        jwt.verify.mockImplementation(() => { 
            throw new Error('Invalid token'); 
        });

        await authenticate(req, res, next);

        expect(res.statusCode).toBe(401);
        expect(res._getJSONData()).toEqual({ message: 'Access denied. Invalid token.' });
        expect(next).not.toHaveBeenCalled();
    });
});
