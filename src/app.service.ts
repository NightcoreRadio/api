import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getSongs() {
    return this.prisma.song.findMany();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
