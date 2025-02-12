import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto, CreateTopicDto } from './subjects.types';
import { IdParam } from 'src/utils/decorator.utils';
import { Auth, AuthUser } from '../auth/decorators/auth.decorator';
import { Role } from '@prisma/client';
import { IAuthUser } from '../auth/auth.types';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjects: SubjectsService) {}

  @Auth([Role.ADMIN])
  @Post()
  async createSubject(@Body() dto: CreateSubjectDto) {
    return await this.subjects.createSubject(dto);
  }

  @Auth([Role.ADMIN])
  @Post(':id/topic')
  async createTopic(@IdParam() id: string, @Body() dto: CreateTopicDto) {
    return await this.subjects.createTopic(id, dto);
  }

  @Auth()
  @Get()
  async listSubjects() {
    return await this.subjects.listSubjects();
  }

  @Auth()
  @Get(':id')
  async getOneSubject(@IdParam() id: string) {
    return await this.subjects.getOneSubject(id);
  }

  @Auth()
  @Get('topics/:id')
  async getOneTopic(@IdParam() id: string) {
    return this.subjects.getOneTopic(id);
  }

  @Auth([Role.STUDENT])
  @Post('complete/:topicId')
  async markTopicAsCompleted(
    @IdParam('topicId') topicId: string,
    @AuthUser() user: IAuthUser,
  ) {
    return this.subjects.completeTopic(topicId, user);
  }

  @Auth([Role.STUDENT])
  @Get(':id/user-completion')
  async getUserCompletionRate(
    @IdParam() id: string,
    @AuthUser() user: IAuthUser,
  ) {
    return this.subjects.getUserCompletionRate(id, user);
  }

  @Auth([Role.ADMIN])
  @Get(':id/rankings')
  async getSubjectRankings(@IdParam() id: string) {
    return this.subjects.getSubjectRankings(id);
  }
}
