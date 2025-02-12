import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto, CreateTopicDto } from './subjects.types';
import { connectId } from 'prisma/prisma.utils';
import { IAuthUser } from '../auth/auth.types';
import { Role } from '@prisma/client';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubject(dto: CreateSubjectDto) {
    const { topics, ...rest } = dto;
    return await this.prisma.subject.create({
      data: {
        ...rest,
        topics: {
          create: topics.map((t) => t),
        },
      },
    });
  }

  async createTopic(id: string, dto: CreateTopicDto) {
    return await this.prisma.topic.create({
      data: {
        ...dto,
        subject: connectId(id),
      },
    });
  }

  async listSubjects() {
    return await this.prisma.subject.findMany({
      include: {
        topics: true,
      },
    });
  }

  async getOneSubject(id: string) {
    return await this.prisma.subject.findUnique({
      where: { id },
      include: { topics: true },
    });
  }

  async getOneTopic(id: string) {
    return await this.prisma.topic.findUnique({
      where: { id },
    });
  }

  async completeTopic(topicId: string, user: IAuthUser) {
    return await this.prisma.userProgress.upsert({
      where: { userId_topicId: { userId: user.sub, topicId } },
      update: { completed: true },
      create: { userId: user.sub, topicId, completed: true },
    });
  }

  async getUserCompletionRate(subjectId: string, user: IAuthUser) {
    const totalTopics = await this.prisma.topic.count({ where: { subjectId } });
    const completedTopics = await this.prisma.userProgress.count({
      where: { userId: user.sub, topic: { subjectId }, completed: true },
    });

    return {
      completionRate: `${Math.ceil(
        totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0,
      )}%`,
      completedTopics,
      totalTopics,
    };
  }

  async getSubjectRankings(subjectId: string) {
    const learners = await this.prisma.user.findMany({
      where: { role: Role.STUDENT },
      include: {
        progress: { where: { topic: { subjectId }, completed: true } },
      },
    });

    const rankings = learners.map((user) => {
      const completedTopics = user.progress.length;
      return {
        userId: user.id,
        name: user.name,
        completedTopics,
        completionRate: (completedTopics / (learners.length || 1)) * 100,
      };
    });

    return rankings.sort((a, b) => b.completionRate - a.completionRate);
  }
}
