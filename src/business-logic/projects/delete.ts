import { Collection, getModel } from "../../constant-definitions";
import { CreateProjectDto, Project, ProjectSchemaMongo, StatusType } from "../../entities";

export const deleteProject = async (
  uuid: string
): Promise<Boolean | Error> => {
  const model = getModel<Project>(Collection.PROJECTS, ProjectSchemaMongo);
  const result = await model.updateOne({ _id: uuid }, {status: StatusType.DELETED});

  if (!result) throw new Error('Could not delete project');

  return true;
};
