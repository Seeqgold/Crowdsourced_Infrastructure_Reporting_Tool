const validateUser = require('../middlewares/validateUser');
const httpMocks = require('node-mocks-http');

describe('User Validation Middleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn(); // Mock the next function
    });

    test('Should call next() for valid data', () => {
        req.body = { username: 'JohnDoe', email: 'john@example.com', password: 'securePass123' };

        validateUser(req, res, next);

        expect(next).toHaveBeenCalled(); // Ensure next() is called
        expect(res.statusCode).toBe(200); // No error response expected
    });

    test('Should return 400 error for missing username', () => {
        req.body = { email: 'john@example.com', password: 'securePass123' };

        validateUser(req, res, next);

        expect(res.statusCode).toBe(400);
        expect(res._getJSONData().message).toBe('"username" is required');
    });
});