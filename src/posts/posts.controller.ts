import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import {UpdatePostDto} from "./dto/update-post.dto";

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}
    @Get()
    findAll(@Query('sort') sort: 'ascending' | 'descending' = 'descending') {
        console.log(sort);
        return this.postsService.findAll(sort);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.postsService.findOne(id);
    }

    @Post()
    create(@Body() input: CreatePostDto ) {
        console.log(input);
        return this.postsService.create(input);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.postsService.remove(+id);
    }
}
