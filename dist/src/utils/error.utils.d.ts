type Err = 400 | 401 | 403 | 404 | 500;
export declare function bad(message: string, err?: Err): never;
export declare function mustHave(value: unknown, message: string, err?: Err): asserts value;
export {};
