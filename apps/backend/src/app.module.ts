import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth-module/auth.module';
import { UserXEntity } from './auth-module/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { PostEntity } from './post/post.entity';
import { PostModule } from './post/post.module';
import { ProfilePicEntity } from './post/profile.pic.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'uploads'), // Going up three levels to access 'uploads'
      serveRoot: '/uploads', // This is the URL path to access your files
    }),

    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserXEntity, PostEntity, ProfilePicEntity],
      synchronize: true, // Set to false in production for safety
    }),
    AuthModule,
    PostModule,
  ],
})
export class AppModule {}
