const request = require('supertest');

const app = require('../../app');
const db = require('../../db');
const UserService = require('../services/user');

const USER = {
    email: 'test@test.com',
    password: 'test',
};

describe('UserService', () => {
    beforeAll(async () => {
        await db.migrate.latest();
    });

    test('create', async () => {
        const user = await UserService.create(USER);
        expect(user.email).toEqual(USER.email);
    });

    test('get', async () => {
        const user = await UserService.get({ email: USER.email });
        expect(user.email).toEqual(USER.email);
    });
});

describe('UserController', () => {
    beforeAll(async () => {
        await db.migrate.latest();
    });

    test('/user/login', async () => {
        const res = await request(app).post('/api/user/login').send(USER);
        const user = res.body;
        expect(res.status).toEqual(200);
        expect(user.email).toEqual(USER.email);
    });

    test('/user/logout', async () => {
        const res = await request(app).get('/api/user/logout');
        expect(res.status).toEqual(200);
    });
});
