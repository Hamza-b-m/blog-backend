import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  create(props: Prisma.BlogCreateArgs) {
    try {
      return this.prisma.blog.create(props);
    } catch (cause) {
      throw new InternalServerErrorException("Unable to create blog", {
        cause,
      });
    }
  }

  findAll(props: Prisma.BlogFindManyArgs) {
    try {
      return this.prisma.blog.findMany(props);
    } catch (cause) {
      throw new InternalServerErrorException("Unable to find blog", {
        cause,
      });
    }
  }

  findOne(props: Prisma.BlogFindFirstArgs) {
    try {
      return this.prisma.blog.findFirst(props);
    } catch (cause) {
      throw new InternalServerErrorException("Unable to find blog", {
        cause,
      });
    }
  }

  update(props: Prisma.BlogUpdateArgs) {
    try {
      return this.prisma.blog.update(props);
    } catch (cause) {
      throw new InternalServerErrorException("Unable to update blog", {
        cause,
      });
    }
  }

  remove(id: string, select: Prisma.BlogSelect = { id: true }) {
    try {
      return this.prisma.blog.delete({
        where: {
          id,
        },
        select,
      });
    } catch (cause) {
      throw new InternalServerErrorException("Unable to delete blog", {
        cause,
      });
    }
  }
}
