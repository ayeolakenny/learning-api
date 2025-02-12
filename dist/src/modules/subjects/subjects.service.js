"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const prisma_utils_1 = require("../../../prisma/prisma.utils");
const client_1 = require("@prisma/client");
let SubjectsService = class SubjectsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSubject(dto) {
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
    async createTopic(id, dto) {
        return await this.prisma.topic.create({
            data: {
                ...dto,
                subject: (0, prisma_utils_1.connectId)(id),
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
    async getOneSubject(id) {
        return await this.prisma.subject.findUnique({
            where: { id },
            include: { topics: true },
        });
    }
    async getOneTopic(id) {
        return await this.prisma.topic.findUnique({
            where: { id },
        });
    }
    async completeTopic(topicId, user) {
        return await this.prisma.userProgress.upsert({
            where: { userId_topicId: { userId: user.sub, topicId } },
            update: { completed: true },
            create: { userId: user.sub, topicId, completed: true },
        });
    }
    async getUserCompletionRate(subjectId, user) {
        const totalTopics = await this.prisma.topic.count({ where: { subjectId } });
        const completedTopics = await this.prisma.userProgress.count({
            where: { userId: user.sub, topic: { subjectId }, completed: true },
        });
        return {
            completionRate: `${Math.ceil(totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0)}%`,
            completedTopics,
            totalTopics,
        };
    }
    async getSubjectRankings(subjectId) {
        const learners = await this.prisma.user.findMany({
            where: { role: client_1.Role.STUDENT },
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
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map