import { SubjectsService } from './subjects.service';
import { CreateSubjectDto, CreateTopicDto } from './subjects.types';
import { IAuthUser } from '../auth/auth.types';
export declare class SubjectsController {
    private readonly subjects;
    constructor(subjects: SubjectsService);
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
    markTopicAsCompleted(topicId: string, user: IAuthUser): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        completed: boolean;
        userId: string;
        topicId: string;
    }>;
    getUserCompletionRate(id: string, user: IAuthUser): Promise<{
        completionRate: string;
        completedTopics: number;
        totalTopics: number;
    }>;
    getSubjectRankings(id: string): Promise<{
        userId: string;
        name: string;
        completedTopics: number;
        completionRate: number;
    }[]>;
}
