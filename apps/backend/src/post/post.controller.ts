import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

import { PostService } from './post.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('uploadProfilePic')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any
  ) {
    Logger.log('Here at controller');

    const filename = Date.now() + '-' + file.originalname;

    const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const host = 'http://localhost:3000';

    const fileUrl = `${host}/uploads/${filename}`;

    const fileEntity = await this.postService.uploadProfilePic(
      fileUrl,
      body.id
    );

    return {
      message: 'Profile picture uploaded successfully!',
      filePath: fileEntity.filePath,
    };
  }

  @Post('uploadPost')
  @UseInterceptors(FileInterceptor('postFile'))
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any
  ) {
    const filename = Date.now() + '-' + file.originalname;

    const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const host = 'http://localhost:3000';

    const postFile = `${host}/uploads/${filename}`;

    const postDataReturn = await this.postService.uploadPost(postFile, body);

    return {
      message: 'Profile picture uploaded successfully!',
    };
  }

  @Get('getPost') // Defines the GET route
  async getPost() {
    return this.postService.getPost();
  }
}
