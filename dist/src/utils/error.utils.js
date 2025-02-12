"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bad = bad;
exports.mustHave = mustHave;
const common_1 = require("@nestjs/common");
function bad(message, err = 400) {
    if (err === 500)
        throw new common_1.InternalServerErrorException(message);
    if (err === 401)
        throw new common_1.UnauthorizedException(message);
    else
        throw new common_1.BadRequestException(message);
}
function mustHave(value, message, err = 400) {
    if (!value)
        bad(message, err);
}
//# sourceMappingURL=error.utils.js.map