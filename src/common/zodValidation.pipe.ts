import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from "@nestjs/common";
import { Schema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== "body") {
      return value;
    }
    const result = this.schema.safeParse(value);
    if (result.success) {
      return result.data;
    }

    throw new BadRequestException({
      errors: result.error.issues.map((issue) => issue.message),
    });
  }
}
