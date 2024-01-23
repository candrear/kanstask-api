import { Collection, getModel } from "../../constant-definitions";
import { CreateProjectDto, Project, ProjectSchemaMongo } from "../../entities";

export const createProject = async (
  data: CreateProjectDto
): Promise<Project | Error> => {
  const model = getModel<Project>(Collection.PROJECTS, ProjectSchemaMongo);
  const project = new model(data);

  await project.save();

  return project;
};
