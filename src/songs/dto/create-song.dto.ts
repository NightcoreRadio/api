import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  isrc: string; // Added ISRC

  @IsString()
  @IsNotEmpty()
  albumId: string; // Added album link [cite: 16, 17]

  @IsOptional()
  images: any;

  @IsDateString()
  release_date: string;

  @IsInt()
  track_number: number;

  @IsInt()
  disc_number: number;

  @IsInt()
  duration: number;

  @IsBoolean()
  explicit: boolean;
}
