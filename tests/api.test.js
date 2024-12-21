const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Contact = require('../models/contactModel');

describe('API Tests', () => {
    let authToken;
    let userId;
    let contactId;

    const testUser = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'test123'
    };

    const testContact = {
        name: 'John Doe',
        email: 'john@example.com',
        mobile: 1234567890
    };

    beforeAll(async () => {
        // Clean up database before tests
        await User.deleteMany({});
        await Contact.deleteMany({});
    });

    afterAll(async () => {
        // Clean up and close connection
        await User.deleteMany({});
        await Contact.deleteMany({});
        await mongoose.connection.close();
    });

    describe('User API', () => {
        test('Should register a new user', async () => {
            const res = await request(app)
                .post('/api/users/register')
                .send(testUser);
            
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('_id');
            userId = res.body._id;
        });

        test('Should login user', async () => {
            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('accessToken');
            authToken = res.body.accessToken;
        });

        test('Should get current user', async () => {
            const res = await request(app)
                .get('/api/users/current')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.email).toBe(testUser.email);
        });
    });

    describe('Contact API', () => {
        test('Should create a contact', async () => {
            const res = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${authToken}`)
                .send(testContact);
            
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('contact');
            contactId = res.body.contact._id;
        });

        test('Should get all contacts', async () => {
            const res = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBe(1);
        });

        test('Should get a specific contact', async () => {
            const res = await request(app)
                .get(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(testContact.name);
        });

        test('Should update a contact', async () => {
            const updatedContact = { ...testContact, name: 'Jane Doe' };
            const res = await request(app)
                .put(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send(updatedContact);
            
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(updatedContact.name);
        });

        test('Should delete a contact', async () => {
            const res = await request(app)
                .delete(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(res.statusCode).toBe(200);
            
            // Verify contact is deleted
            const getRes = await request(app)
                .get(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${authToken}`);
            expect(getRes.statusCode).toBe(404);
        });
    });

    describe('Cleanup', () => {
        test('Should delete user', async () => {
            const res = await request(app)
                .delete('/api/users/delete-user')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(res.statusCode).toBe(200);
            
            // Verify user is deleted
            const loginRes = await request(app)
                .post('/api/users/login')
                .send({
                    email: testUser.email,
                    password: testUser.password
                });
            expect(loginRes.statusCode).toBe(401);
        });
    });
});
