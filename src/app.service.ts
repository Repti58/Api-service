import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // return 'Hello World!';
    throw new ForbiddenException()
  }
}
