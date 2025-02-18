import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PostEntity } from './post.entity';
import { ProfilePicEntity } from './profile.pic.entity';
import { UserXEntity } from '../auth-module/auth.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>, // Inject Post repository

    @InjectRepository(UserXEntity)
    private userXRepository: Repository<UserXEntity>, // Inject UserXEntity repository (if needed)

    @InjectRepository(ProfilePicEntity)
    private profilePicRepository: Repository<ProfilePicEntity>, // Inject Post repository

    private jwtService: JwtService // Inject JwtService
  ) {}

  async uploadProfilePic(filePath: string, userId: string) {
    // Find the user by ID from the repository
    const userX = await this.userXRepository.findOne({ where: { id: userId } });

    if (!userX) {
      throw new Error('User not found');
    }

    // Update the user's profile picture path
    userX.filePath = filePath;

    // Save the updated user entity
    return await this.userXRepository.save(userX);
  }
}
