import {
    Controller,
    Get,
    Param,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostIdDto } from './posts.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    async getPosts(): Promise<
        {
            id: number;
            title: string;
            body: string;
        }[]
    > {
        return this.postsService.getPosts();
    }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async getPostDetails(@Param() postDto: PostIdDto): Promise<{
        id: number;
        title: string;
        body: string;
    }> {
        const id = postDto.id;
        return this.postsService.getPostDetails(id);
    }
}
