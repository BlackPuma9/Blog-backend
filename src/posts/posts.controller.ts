import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as Entity } from './entity/post.entity';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Get()
  findAll(): Promise<Entity[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Entity | null> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() input: CreatePostDto): Promise<Entity> {
    return this.postsService.create(input);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Entity> {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: number): Promise<void> {
    return this.postsService.delete(id);
  }
}
