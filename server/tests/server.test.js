const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {User} = require('./../models/users');

const {users, populateUser} = require('./seed/seed');



beforeEach(populateUser);


describe('POST /users', () => {
    it('should create a user',(done) => {
        let email = 'subh@gmail.com';
        let password = 'abc123';

        request(app)
            .post('/users')
            .send({email,password})
            .expect(200)
            .expect((res) => {
                expect(res.header['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBeTruthy();
            })
            .end((err) => {
                if(err) {
                    return done(err);
                }
                done();
            });

    });
});