import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class UUIDValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isUUID(value, 4)) {
      throw new HttpException(
        `Value ${value} isn't valid UUID.`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
