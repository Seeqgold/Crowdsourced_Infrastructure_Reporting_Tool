const request = require('supertest');
const app = require('../index.js');
const user = require('../models/user.model.js');
const {createUser, getUser, getUsers,updateUser, deleteUser, loginUser} = require('../controllers/user.controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

jest.mock('../models/user.model');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');


describe('User Controller Tests', () => {
    test('Should create a user successfully', async () => {
        user.findOne.mockResolvedValue(null);
        bcrypt.genSalt.mockResolvedValue('salt');
        bcrypt.hash.mockResolvedValue('hashedPassword');
        user.create.mockResolvedValue({ username: 'testuser', email: 'test@example.com', password: 'hashedPassword' });

        const response = await request(app).post('/api/user').send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('testuser');
    });
    test('Should return error if username or email exists', async () => {
        user.findOne.mockResolvedValue({ username: 'testuser', email: 'test@example.com' });
        
        const response = await request(app).post('/api/user').send({ username: 'testuser', email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Username or Email already exists');
    });

    test('Should log in a user successfully', async () => {
        user.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedPassword' });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockToken');

        const response = await request(app).post('/api/user/login').send({ email: 'test@example.com', password: 'password123' });
        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBe('mockToken');
    });

    test('Should return error for invalid credentials', async () => {
        user.findOne.mockResolvedValue(null);

        const response = await request(app).post('/api/login').send({ email: 'wrong@example.com', password: 'wrongpassword' });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Invalid email or password');
    });

    test('Should get a user by ID', async () => {
        user.findById.mockResolvedValue({ _id: '123', username: 'testuser', email: 'test@example.com' });
        
        const response = await request(app).get('/api/user/123');
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('testuser');
    });

    test('Should update a user', async () => {
        user.findByIdAndUpdate.mockResolvedValue({ _id: '123', username: 'updateduser' });
        user.findById.mockResolvedValue({ _id: '123' });
        
        const response = await request(app).put('/api/user/123').send({ _id: '123' });
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe('updateduser');
    });

    test('Should delete a user', async () => {
        user.findByIdAndDelete.mockResolvedValue({ _id: '123' });
        
        const response = await request(app).delete('/api/user/123');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('user deleted sucessfully');
    });
});

