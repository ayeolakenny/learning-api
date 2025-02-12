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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectsController = void 0;
const common_1 = require("@nestjs/common");
const subjects_service_1 = require("./subjects.service");
const subjects_types_1 = require("./subjects.types");
const decorator_utils_1 = require("../../utils/decorator.utils");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const client_1 = require("@prisma/client");
let SubjectsController = class SubjectsController {
    constructor(subjects) {
        this.subjects = subjects;
    }
    async createSubject(dto) {
        return await this.subjects.createSubject(dto);
    }
    async createTopic(id, dto) {
        return await this.subjects.createTopic(id, dto);
    }
    async listSubjects() {
        return await this.subjects.listSubjects();
    }
    async getOneSubject(id) {
        return await this.subjects.getOneSubject(id);
    }
    async getOneTopic(id) {
        return this.subjects.getOneTopic(id);
    }
    async markTopicAsCompleted(topicId, user) {
        return this.subjects.completeTopic(topicId, user);
    }
    async getUserCompletionRate(id, user) {
        return this.subjects.getUserCompletionRate(id, user);
    }
    async getSubjectRankings(id) {
        return this.subjects.getSubjectRankings(id);
    }
};
exports.SubjectsController = SubjectsController;
__decorate([
    (0, auth_decorator_1.Auth)([client_1.Role.ADMIN]),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subjects_types_1.CreateSubjectDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "createSubject", null);
__decorate([
    (0, auth_decorator_1.Auth)([client_1.Role.ADMIN]),
    (0, common_1.Post)(':id/topic'),
    __param(0, (0, decorator_utils_1.IdParam)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, subjects_types_1.CreateTopicDto]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "createTopic", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "listSubjects", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, decorator_utils_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getOneSubject", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('topics/:id'),
    __param(0, (0, decorator_utils_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getOneTopic", null);
__decorate([
    (0, auth_decorator_1.Auth)([client_1.Role.STUDENT]),
    (0, common_1.Post)('complete/:topicId'),
    __param(0, (0, decorator_utils_1.IdParam)('topicId')),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "markTopicAsCompleted", null);
__decorate([
    (0, auth_decorator_1.Auth)([client_1.Role.STUDENT]),
    (0, common_1.Get)(':id/user-completion'),
    __param(0, (0, decorator_utils_1.IdParam)()),
    __param(1, (0, auth_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getUserCompletionRate", null);
__decorate([
    (0, auth_decorator_1.Auth)([client_1.Role.ADMIN]),
    (0, common_1.Get)(':id/rankings'),
    __param(0, (0, decorator_utils_1.IdParam)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubjectsController.prototype, "getSubjectRankings", null);
exports.SubjectsController = SubjectsController = __decorate([
    (0, common_1.Controller)('subjects'),
    __metadata("design:paramtypes", [subjects_service_1.SubjectsService])
], SubjectsController);
//# sourceMappingURL=subjects.controller.js.map