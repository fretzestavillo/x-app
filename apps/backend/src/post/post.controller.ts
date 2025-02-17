import { Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('getPost')
  async getData(data: any): Promise<any> {
    const result = await this.postService.getData();
    return result;
  }
}
