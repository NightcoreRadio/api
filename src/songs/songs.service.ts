import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSongDto } from './dto/create-song.dto';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async create(createSongDto: CreateSongDto) {
    const { albumId, ...songData } = createSongDto;

    return this.prisma.song.create({
      data: {
        ...songData,
        release_date: new Date(songData.release_date),
        album: {
          connect: { id: albumId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.song.findMany();
  }

  async findOne(id: string) {
    return this.prisma.song.findUnique({
      where: { id },
      // Changed 'artist' to 'artists' to match your schema
      include: { artists: true, album: true },
    });
  }
}
