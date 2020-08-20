import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ServeStaticModule } from '@nestjs/serve-static';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SessionModule } from 'nestjs-session';
import session from 'express-session';
import { join } from 'path';
import connectRedis from 'connect-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm';
import { UserModule } from './modules/user/user.module';
import config, { isProductionEnvironment } from './config';
import { redis } from './redis';
import { TopicModule } from './modules/topic/topic.module';
import { BlogModule } from './modules/blog/blog.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { UploadModule } from './modules/upload/upload.module';

const RedisStore = connectRedis(session);
console.log(join(__dirname, '../dist/', 'client'))

@Module({
  imports: [
    TagModule,
    CategoryModule,
    BlogModule,
    UserModule,
    TopicModule,
    UploadModule,
    SessionModule.forRoot({
      session: {
        store: new RedisStore({
          client: redis as any,
        }),
        name: 'pid',
        secret: config.auth.sessionSecretKey,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: isProductionEnvironment,
          maxAge: 1000 * 60 * 60 * 24,
        },
      }
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
      uploads: {
        maxFileSize: 1000000000,
        maxFiles: 10,
      },
      cors: config.cors,
    }),
    TypeOrmModule.forRoot(typeOrmConfig as TypeOrmModuleOptions),
    ServeStaticModule.forRoot({rootPath: join(__dirname, '../dist/', 'client')}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
