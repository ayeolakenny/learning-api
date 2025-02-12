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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const argon2_1 = require("argon2");
const error_utils_1 = require("../../utils/error.utils");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async login(dto) {
        const { email, password } = dto;
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        (0, error_utils_1.mustHave)(user, 'Invalid Credentials', 401);
        const passHash = user.passHash;
        if (!passHash)
            (0, error_utils_1.bad)('Invalid Credentials', 401);
        const matched = await (0, argon2_1.verify)(passHash, password);
        if (!matched)
            (0, error_utils_1.bad)('Invalid Credentials', 401);
        if (!user.role)
            (0, error_utils_1.bad)('No roles assigned', 401);
        const payload = {
            sub: user.id,
        };
        const token = await this.jwt.signAsync(payload);
        return { token };
    }
    async authUser(user) {
        const authUser = await this.prisma.user.findUnique({
            where: { id: user.sub },
        });
        const { passHash, ...rest } = authUser;
        return rest;
    }
    async signup(dto) {
        const { email, password, name } = dto;
        const userExist = await this.prisma.user.findUnique({ where: { email } });
        if (userExist)
            (0, error_utils_1.bad)('Email already exist');
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                passHash: await (0, argon2_1.hash)(password),
            },
        });
        const { passHash, ...rest } = user;
        return rest;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map