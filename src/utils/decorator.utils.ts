import { Param, ParseUUIDPipe } from '@nestjs/common';

export const IdParam = (paramName: string = 'id') =>
  Param(paramName, ParseUUIDPipe);
