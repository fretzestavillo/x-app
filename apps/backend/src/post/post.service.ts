import { Injectable, Logger } from '@nestjs/common';
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
    private postRepository: Repository<PostEntity>,

    @InjectRepository(UserXEntity)
    private userXRepository: Repository<UserXEntity>,

    @InjectRepository(ProfilePicEntity)
    private profilePicRepository: Repository<ProfilePicEntity>,

    private jwtService: JwtService
  ) {}

  async uploadProfilePic(filePath: string, userId: string) {
    const userX = await this.userXRepository.findOne({ where: { id: userId } });

    if (!userX) {
      throw new Error('User not found');
    }

    userX.filePath = filePath;

    return await this.userXRepository.save(userX);
  }

  async uploadPost(postFile: string, body: PostDataForm) {
    const user = await this.userXRepository.findOne({
      where: { id: body.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();

    const phTime = new Date(
      now.toLocaleString('en-US', { timeZone: 'Asia/Manila' })
    );

    const newPost = this.postRepository.create({
      user,
      profilePic: body.profilePic,
      fullName: body.fullName,
      username: body.username,
      postDate: phTime,
      postText: body.postText,
      postContent: postFile ? postFile : null,
      messageCount: 0,
      repostCount: 0,
      heartCount: 0,
      viewsCount: 0,
    });

    return this.postRepository.save(newPost);
  }

  async getPost() {
    const posts = await this.postRepository.find({
      relations: ['user'], // Include user details
      order: { postDate: 'DESC' }, // Sort by latest post
    });

    // Convert UTC dates to Philippine Time (PHT) and format response
    return posts.map((post) => ({
      id: post.id,
      user: {
        id: post.user.id,
        fullName: post.user.full_name,
      },
      profilePic: post.profilePic,
      fullName: post.fullName,
      username: post.username,
      postDate: new Date(post.postDate).toLocaleString('en-US', {
        timeZone: 'Asia/Manila',
      }),
      postText: post.postText,
      postContent: post.postContent || null,
      messageCount: post.messageCount,
      repostCount: post.repostCount,
      heartCount: post.heartCount,
      viewsCount: post.viewsCount,
    }));
  }
}
