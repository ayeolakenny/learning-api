import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  videoUrl: string;
}

export class CreateSubjectDto {
  @IsString()
  name: string;

  @IsArray()
  @Type(() => CreateTopicDto)
  topics: CreateTopicDto[];
}
