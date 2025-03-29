import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/entity/category.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Post | null> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, description, categoryId } = createPostDto;
    const post = new Post();
    post.title = title;
    post.description = description;

    const category = await this.categoriesRepository.findOneBy({
      id: categoryId,
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    post.category = category;

    return this.postsRepository.save(post);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException();
    }
    if (updatePostDto?.title) {
      post.title = updatePostDto.title;
    }
    if (updatePostDto?.description) {
      post.description = updatePostDto.description;
    }
    return this.postsRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
