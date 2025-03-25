import { Injectable } from '@nestjs/common';
import { Post } from "./entity/post.entity";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsService {
    private posts: Post[] = [];

    async findAll(sort: 'ascending' | 'descending' = 'ascending') {
        const sortAsc = (a: Post, b: Post) => (a.title > b.title ? 1 : -1);
        const sortDesc = (a: Post, b: Post) => (a.title < b.title ? 1 : -1);

        return sort === 'ascending'
        ? this.posts.sort(sortAsc)
        : this.posts.sort(sortDesc);
    }

    async findOne(id: number) {
        return this.posts.find(post => post.id === id);
    }

    async create(createPostDto: CreatePostDto) {
        const newPost = { ...createPostDto, id: 1, createdAt: new Date(), updatedAt: new Date() };
        this.posts.push(newPost);

        return newPost;
    }

    async update(id: number, updatePostDto: UpdatePostDto) {
        console.log(id, updatePostDto);
    }

    async remove(id: number) {
        console.log('Post removed', id);
    }
}
