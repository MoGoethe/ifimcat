import { 
  Controller,
  Get,
} from '@nestjs/common';
import { BlogService } from './blog.service';


@Controller('/blog')
export class BlogController {
  constructor(private readonly blogService: BlogService){}

  @Get()
  hello(): string {
    return this.blogService.hello();
  }
};