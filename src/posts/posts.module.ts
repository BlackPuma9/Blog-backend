import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {Post} from "./entity/post.entity";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        // Use useFactory, useClass, or useExisting
        // to configure the DataSourceOptions.
        useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: +configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DATABASE'),
            entities: [Post],
            synchronize: true,
        }),
    }),
        TypeOrmModule.forFeature([Post]),
    ],
    controllers: [PostsController],
    providers: [PostsService],
})
export class PostsModule {}
