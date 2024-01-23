import { Collection, getModel } from "../../constant-definitions";
import { Admin, ProjectSchemaMongo, AdminSchemaMongo, Issue, IssueSchemaMongo, Project } from "../../entities";

export const getIssueById = async (uuid: string): Promise<Issue> => {
    const model = getModel<Issue>(Collection.ISSUES, IssueSchemaMongo);
    getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);
    getModel<Project>(Collection.PROJECTS, ProjectSchemaMongo);

    const issue = await model.findById(uuid).populate('reporter').populate('assignees').populate('project') as Issue;
    return issue;
}