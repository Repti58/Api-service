import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';

describe('PostsService', () => {
    let postsService: PostsService;
    let httpService: HttpService;
    const mockData = [
        {
            id: 1,
            title: 'Test Title Post1',
            body: 'Test Body Post1',
        },
        {
            id: 2,
            title: 'Test Title Post2',
            body: 'Test Body Post2',
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PostsService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn(),
                    },
                },
            ],
        }).compile();

        postsService = module.get<PostsService>(PostsService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should be defined', () => {
        expect(postsService).toBeDefined();
    });

    it('should fetch and filter posts successfully', async () => {
        const response = {
            data: mockData,
        };
        (httpService.get as jest.Mock).mockReturnValue(of(response));
        const result = await postsService.getPosts();
        expect(result).toEqual(postsService.filterPosts(mockData));
    });

    it('should handle errors when fetching posts', async () => {
        const errorMessage = 'Failed to fetch posts';
        (httpService.get as jest.Mock).mockReturnValue(
            throwError(() => new Error('test')),
        );
        try {
            await postsService.getPosts();
        } catch (error) {
            expect(error.message).toEqual(errorMessage);
        }
    });

    it('should fetch and validate post details successfully', async () => {
        const postId = 1;
        const response = {
            data: mockData[0],
        };
        (httpService.get as jest.Mock).mockReturnValue(of(response));
        const result = await postsService.getPostDetails(postId);
        expect(result).toEqual(mockData[0]);
    });

    it('should handle errors when fetching post details', async () => {
        const postId = 1;
        const errorMessage = 'Failed to fetch post details';
        (httpService.get as jest.Mock).mockReturnValue(
            throwError(() => new Error('test')),
        );
        try {
            await postsService.getPostDetails(postId);
        } catch (error) {
            expect(error.message).toEqual(errorMessage);
        }
    });
});
