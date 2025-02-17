import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserXEntity } from '../auth-module/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>, // Inject Post repository
    @InjectRepository(UserXEntity)
    private userRepository: Repository<UserXEntity>, // Inject UserXEntity repository (if needed)
    private jwtService: JwtService // Inject JwtService
  ) {}

  async getData() {
    return 'shit';
  }
}
