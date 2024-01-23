import { Collection, getModel } from "../../constant-definitions";
import { Admin, AdminSchemaMongo, Project, ProjectSchemaMongo } from "../../entities";

export const getProjectById = async (uuid: string): Promise<Project> => {
    const model = getModel<Project>(Collection.PROJECTS, ProjectSchemaMongo);
    getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);

    const project = await model.findById(uuid).populate('members').populate('lead') as Project;
    return project;
}
