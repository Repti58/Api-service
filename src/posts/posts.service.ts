import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class PostsService {
    constructor(private httpService: HttpService) {}
    isPostValid(post: { id: number; title: string; body: string }) {
        function isIdValid(id: number) {
            return !!id && Number.isInteger(id);
        }

        function isTitleValid(title: string) {
            return !!title && typeof title === 'string' && title.length <= 100;
        }

        function isBodyValid(body: string) {
            return !!body && typeof body === 'string' && body.length <= 200;
        }
        return (
            isIdValid(post.id) &&
            isTitleValid(post.title) &&
            isBodyValid(post.body)
        );
    }

    filterPosts(posts: { id: number; title: string; body: string }[]) {
        const result = posts.filter((post) => this.isPostValid(post));
        return result;
    }

    private handleError(
        error: AxiosError,
        errorMessage: string,
    ): Observable<never> {
        throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    async getPosts() {
        const response = this.httpService
            .get('https://jsonplaceholder.typicode.com/posts')
            .pipe(
                catchError((error: AxiosError) =>
                    this.handleError(error, 'Failed to fetch posts'),
                ),
            );
        const posts = await firstValueFrom(response);
        return this.filterPosts(posts.data);
    }

    async getPostDetails(id: number) {
        const response = this.httpService
            .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .pipe(
                catchError((error: AxiosError) =>
                    this.handleError(error, 'Failed to fetch post details'),
                ),
            );
        const post = (await firstValueFrom(response)).data;
        return this.isPostValid(post)
            ? post
            : new HttpException(
                  'The post does not match the specified parameters',
                  HttpStatus.UNPROCESSABLE_ENTITY,
              );
    }
}
