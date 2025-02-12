export declare class CreateTopicDto {
    title: string;
    description: string;
    videoUrl: string;
}
export declare class CreateSubjectDto {
    name: string;
    topics: CreateTopicDto[];
}
