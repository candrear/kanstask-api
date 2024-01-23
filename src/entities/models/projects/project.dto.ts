import { Project } from "./schemas";

export interface CreateProjectDto extends Omit<Project, '_id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateProjectDto extends Partial<Project> {}
