import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('PostsController (E2E)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should throw a BadRequestException when an invalid ID is provided', () => {
        return request(app.getHttpServer()).get('/posts/0').expect(400);
    });

    it('should throw a BadRequestException when invalid ID is provided', () => {
        return request(app.getHttpServer()).get('/posts/1,5').expect(400);
    });

    it('should return post details when valid ID is provided', () => {
        return request(app.getHttpServer()).get('/posts/5').expect(200);
    });
});
