const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {User} = require('./../models/users');

const {users, populateUser} = require('./seed/seed');



beforeEach(populateUser);


describe('POST /users', () => {

    it('should create a user', async () => {
        const email = 'subh@gmail.com';
        const password = 'abc123';

        const res = await request(app)
            .post('/users')
            .send({email,password})
            .expect(200);
        expect(res.header['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBeTruthy();

        let user;

        try {
            user = await User.findOne({email});
        } catch(err) {
            console.log(err);
        }

        expect(user).toBeTruthy();
        expect(user.email).toBeTruthy();
        expect(user.password).toBeTruthy();
        expect(user.password).not.toBe(password);

    });


    it('should return validation errors if request invalid', async () => {
        let email = 'sgil.com';
        let password = '123a';
        const res = await request(app)
            .post('/users')
            .send({email,password})
            .expect(400);
    });

    it('should not create user if email in use',async () => {
        const email = users[0].email;
        const password = '123abc';

        const res = await request(app)
            .post('/users')
            .send({email,password})
            .expect(400);
    });


});


describe('GET /users/me', () => {
    it('should return a user if authenticated', async () => {
        const res = await request(app)
            .get('/users/me')
            .set('x-auth',users[0].tokens[0].token)
            .expect(200);

        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
    });

    it('should return 401 if not authenticated', async () => {
        const res = await request(app)
            .get('/users/me')
            .expect(401);
        expect(res.body).toEqual({});
    });

});