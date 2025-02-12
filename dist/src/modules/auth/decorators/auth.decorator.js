"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUser = exports.Auth = void 0;
exports.getAuthToken = getAuthToken;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("../guards/auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
const roles_decorator_1 = require("./roles.decorator");
const Auth = (roles) => {
    if (!roles?.length)
        return (0, common_1.applyDecorators)((0, common_1.UseGuards)(auth_guard_1.AuthGuard));
    return (0, common_1.applyDecorators)((0, roles_decorator_1.Roles)(...roles), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard));
};
exports.Auth = Auth;
function getAuthToken(req) {
    const auth = req.headers.authorization;
    const bearer = auth && /^Bearer (.+)$/.exec(auth);
    if (bearer)
        return bearer[1];
    const header = req.get('X-Auth-Token');
    if (header)
        return header;
    return null;
}
exports.AuthUser = (0, common_1.createParamDecorator)(async (_, ctx) => {
    const jwtService = new jwt_1.JwtService();
    const token = getAuthToken(ctx.switchToHttp().getRequest());
    if (!token)
        throw new common_1.UnauthorizedException();
    try {
        const payload = await jwtService.verifyAsync(token, {
            secret: process.env.JWT_SECRET,
        });
        return payload;
    }
    catch {
        throw new common_1.UnauthorizedException();
    }
});
//# sourceMappingURL=auth.decorator.js.map