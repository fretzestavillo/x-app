import {
  Body,
  Controller,
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

    // Generate a unique filename to prevent overwriting
    const filename = Date.now() + '-' + file.originalname;

    // Define the file path (where to store the file)
    const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads'); // Going up one level from the current directory (which may be dist)

    // Check if the 'uploads' directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    // Define the full file path
    const filePath = path.join(uploadDir, filename);

    // Save the file to disk
    fs.writeFileSync(filePath, file.buffer);

    //should be replace in production
    const host = 'http://localhost:3000';

    const fileUrl = `${host}/uploads/${filename}`;

    // Optionally, save file path in the database
    const fileEntity = await this.postService.uploadProfilePic(
      fileUrl,
      body.id
    ); // Assuming FileService has a saveFile method

    return {
      message: 'Profile picture uploaded successfully!',
      filePath: fileEntity.filePath, // Return file path or any necessary info
    };
  }






  @Post('uploadPost')
  @UseInterceptors(FileInterceptor('postFile')) // ✅ Must match frontend `formData.append('postFile', selectedFile)`
  async uploadPost(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any
  ) {
    Logger.log('Received file:', file ? file.originalname : 'No file uploaded'); // ✅ Debug log
    Logger.log('Received form data:', body);

    return {
      message: 'File uploaded!',
      fileDetails: file
        ? {
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
          }
        : 'No file uploaded',
      formData: body,
    };

    // Generate a unique filename to prevent overwriting
    // const filename = Date.now() + '-' + file.originalname;

    // // Define the file path (where to store the file)
    // const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads'); // Going up one level from the current directory (which may be dist)

    // // Check if the 'uploads' directory exists, if not, create it
    // if (!fs.existsSync(uploadDir)) {
    //   fs.mkdirSync(uploadDir);
    // }

    // // Define the full file path
    // const filePath = path.join(uploadDir, filename);

    // // Save the file to disk
    // fs.writeFileSync(filePath, file.buffer);

    // //should be replace in production
    // const host = 'http://localhost:3000';

    // const fileUrl = `${host}/uploads/${filename}`;

    // // Optionally, save file path in the database
    // const fileEntity = await this.postService.uploadProfilePic(
    //   fileUrl,
    //   body.id
    // ); // Assuming FileService has a saveFile method

    // return {
    //   message: 'Profile picture uploaded successfully!',
    //   filePath: fileEntity.filePath, // Return file path or any necessary info
    // };
  }
}
