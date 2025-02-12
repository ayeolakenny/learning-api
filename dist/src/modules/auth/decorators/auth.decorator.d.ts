import { type Request } from 'express';
import { Role } from '@prisma/client';
export declare const Auth: (roles?: Role[]) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare function getAuthToken(req: Request): string;
export declare const AuthUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
