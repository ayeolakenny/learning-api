import { PrismaService } from '../prisma/prisma.service';
import { CreateSubjectDto, CreateTopicDto } from './subjects.types';
import { IAuthUser } from '../auth/auth.types';
export declare class SubjectsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSubject(dto: CreateSubjectDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createTopic(id: string, dto: CreateTopicDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        subjectId: string;
    }>;
    listSubjects(): Promise<({
        topics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            videoUrl: string;
            subjectId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOneSubject(id: string): Promise<{
        topics: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            description: string;
            videoUrl: string;
            subjectId: string;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getOneTopic(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        description: string;
        videoUrl: string;
        subjectId: string;
    }>;
    completeTopic(topicId: string, user: IAuthUser): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        userId: string;
        topicId: string;
    }>;
    getUserCompletionRate(subjectId: string, user: IAuthUser): Promise<{
        completionRate: string;
        completedTopics: number;
        totalTopics: number;
    }>;
    getSubjectRankings(subjectId: string): Promise<{
        userId: string;
        name: string;
        completedTopics: number;
        completionRate: number;
    }[]>;
}
