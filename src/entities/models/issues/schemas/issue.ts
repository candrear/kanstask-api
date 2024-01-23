import { Base } from "../../../common";

export enum IssueType {
    Bug='Bug',
    Task='Task',
    Story='Story',
    Epic='Epic',
    Subtask='Subtask',
    Change='Change',
    Incident='Incident',
    NewFeature='New Feature',
    Problem='Problem',
    ServiceRequest='Service Request'
}
   
export enum IssuePriority {
    Critical = 'Critical',
    Highest = 'Highest',
    High = 'High',
    Medium = 'Medium',
    Low = 'Low',
    Lowest = 'Lowest',
}
   
   
export interface CommentIssue {
    uuid: string;
    text: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}
   
export interface Label {
    uuid: string;
    name: string;
    color: string;
}
   
export interface Subtask{
    uuid: string;
    code: number;
    description: string; 
    status: boolean;
}
   
export interface Issue extends Base {
    type: string;
    code: number;
    summary: string;
    description: string;
    priority: IssuePriority;
    assignees: string[];
    reporter: string;
    estimate: number;
    project: string;
    list_position: number;
    status_issue: string;
    progress: number;
    attachments:string[];
    comments: CommentIssue[];
    subtasks: Subtask[];
    labels: Label[];
    dueDate: string;
}