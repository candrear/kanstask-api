import { Collection, getModel } from "../../constant-definitions";
import { Project, ProjectSchemaMongo, UpdateProjectDto } from "../../entities";

export const updateProject = async (data: UpdateProjectDto) => {
    const model = getModel<Project>(Collection.PROJECTS, ProjectSchemaMongo);
    const project = await model.findById(data.uuid);
    
    if (!project) throw new Error(`Projects doesn't exist`);

    const updatedProject = await model.findByIdAndUpdate(data.uuid, data, {
        new: true,
    });

    if (!updatedProject) throw new Error(`Project not found`);
    return updatedProject;
};