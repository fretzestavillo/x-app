import { Module } from '@nestjs/common';
import { UserXEntity } from '../auth-module/auth.entity';
import { PostEntity } from './post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth-module/constant';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserXEntity, PostEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {},
    }),
  ],

  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
