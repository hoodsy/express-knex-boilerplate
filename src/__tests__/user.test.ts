import request from 'supertest';

import app from '../app';
import db from '../db';
import UserService from '../services/user';

const USER = {
    email: 'test@test.com',
    password: 'test',
};

describe('UserService', () => {
    beforeAll(async () => {
        await db.migrate.latest();
    });

    test('create', async () => {
        const user = await UserService.create(USER.email, USER.password);
        expect(user.email).toEqual(USER.email);
    });

    test('get', async () => {
        const user = await UserService.get(USER.email);

        if (user) {
            expect(user.email).toEqual(USER.email);
        } else {
            fail(`No user exists with email ${USER.email}`);
        }
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
