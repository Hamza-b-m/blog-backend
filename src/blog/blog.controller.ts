import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Query,
  NotFoundException,
  HttpCode,
} from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogDto, CreateBlog_validation } from "./dto/create-blog.dto";
import { UpdateBlogDto, UpdateBlog_validation } from "./dto/update-blog.dto";
import { ZodValidationPipe } from "src/common/zodValidation.pipe";

@Controller("blog")
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateBlog_validation))
  create(@Body() data: CreateBlogDto) {
    return this.blogService.create({ data });
  }

  @Get()
  findAll(@Query("search") search = "") {
    const contains = search.trim();
    return this.blogService.findAll({
      where: {
        OR: [
          {
            title: {
              contains,
            },
          },
          {
            content: {
              contains,
            },
          },
          {
            author: {
              contains,
            },
          },
        ],
      },
    });
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const result = await this.blogService.findOne({
      where: { id },
    });
    if (!result) {
      throw new NotFoundException("Blog doesn't exist");
    }
    return result;
  }

  @Patch(":id")
  @UsePipes(new ZodValidationPipe(UpdateBlog_validation))
  update(@Param("id") id: string, @Body() data: UpdateBlogDto) {
    return this.blogService.update({
      where: { id },
      data,
    });
  }

  @Post(":id/upvote")
  @HttpCode(200)
  upvote(@Param("id") id: string) {
    return this.blogService.update({
      where: { id },
      data: {
        upvote: {
          increment: 1,
        },
      },
    });
  }

  @Post(":id/downvote")
  @HttpCode(200)
  downvote(@Param("id") id: string) {
    return this.blogService.update({
      where: { id },
      data: {
        downvote: {
          increment: 1,
        },
      },
    });
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blogService.remove(id);
  }
}
