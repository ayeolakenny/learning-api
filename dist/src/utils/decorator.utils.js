"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdParam = void 0;
const common_1 = require("@nestjs/common");
const IdParam = (paramName = 'id') => (0, common_1.Param)(paramName, common_1.ParseUUIDPipe);
exports.IdParam = IdParam;
//# sourceMappingURL=decorator.utils.js.map