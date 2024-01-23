import { Issue } from "./schemas";

export interface CreateIssueDto extends Omit<Issue, '_id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateIssueDto extends Partial<Issue> {}
