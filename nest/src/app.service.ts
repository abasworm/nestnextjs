import { Injectable } from '@nestjs/common';

interface HelloWorld {
  name: string;
}
@Injectable()
export class AppService {
  getHello(): HelloWorld {
    const a: HelloWorld = {
      name: 'Hello World',
    };
    return a;
  }
}
