import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { UserService } from '../src/user/user.service';

describe('User', () => {
  let app: INestApplication;
  let accessToken: string;

  const user = {
    id: 1,
    name: 'test',
    email: 'admin@mail.com',
    password: '$2b$10$qF6NihfnTstqZVGi0wFGcuJCWLIVb9YNAUR4fOQYRCFU30j1aLOoa',
    role_id: 1,
    role: {
      id: 1,
      name: 'Admin',
      permissions: [0],
    },
  };

  const userService = {
    findAll: () => [user],
    findOne: () => user,
    findOneByEmail: () => user,
    create: () => user,
    update: () => user,
    remove: () => user,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@mail.com', password: 'not-set' });

    accessToken = response.body.body.accessToken;
  });

  it(`/GET user`, () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK)
      .expect({
        statusCode: HttpStatus.OK,
        message: 'Success',

        body: userService.findAll(),
      });
  });

  it(`/GET/:id User`, () => {
    return request(app.getHttpServer())
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.OK)
      .expect({
        statusCode: HttpStatus.OK,
        message: 'Success',
        body: userService.findOne(),
      });
  });

  it(`/POST User`, () => {
    return request(app.getHttpServer())
      .post('/users')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .expect(HttpStatus.CREATED)
      .expect({
        statusCode: HttpStatus.CREATED,
        message: 'Success',
        body: userService.create(),
      });
  });

  it(`/PATCH/:id User`, () => {
    return request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .expect(HttpStatus.OK)
      .expect({
        statusCode: HttpStatus.OK,
        message: 'Success',

        body: userService.update(),
      });
  });

  it(`/DELETE/:id User`, () => {
    return request(app.getHttpServer())
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(user)
      .expect(HttpStatus.OK)
      .expect({
        statusCode: HttpStatus.OK,
        message: 'Success',

        body: userService.remove(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
