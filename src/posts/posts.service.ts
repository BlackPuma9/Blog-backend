import {Injectable, NotFoundException} from '@nestjs/common';
import { Post } from "./entity/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from 'typeorm';


@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {}

    async findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    async findOne(id: number) : Promise<Post | null> {
        return this.postsRepository.findOneBy({ id })
    }

    async create(createPostDto: CreatePostDto) : Promise<Post> {
        const newPost = { ...createPostDto };
        return this.postsRepository.save(newPost);
    }

    async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
       const post = await this.findOne(id);
       if (!post) {
           throw new NotFoundException();
       }
       if (updatePostDto?.title) {
           post.title = updatePostDto.title;
       }
       if(updatePostDto?.description) {
           post.description = updatePostDto.description;
       }
       return this.postsRepository.save(post);
    }

    async remove(id: number): Promise<void> {
        await this.postsRepository.delete(id);
    }
}
