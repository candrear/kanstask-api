import { Base } from "../../../common";

export interface Project extends Base{
    name: string;
    client: string;
    category: string;
    start_date: Date;
    target_date: Date;
    progress: number;
    resources: string[];
    description: string;
    lead: string;
    members: string[];
}