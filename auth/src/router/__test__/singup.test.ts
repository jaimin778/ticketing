import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successfull singup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
});

it('return a 400 with invalid email address', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: "test",
            password: "password"
        })
        .expect(400);
});

it("returns a 400 with the invalid password", async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@gmail.com",
            password: "p"
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@gmail.com"
        })
        .expect(400);
    
    await request(app)
        .post("/api/users/signup")
        .send({
            password: "password"
        })
        .expect(400);
});

it('Disallows to duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);
    
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(400);
});

it('sets a cookie after successful signup', async () =>{
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: "test@gmail.com",
            password: "password"
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});