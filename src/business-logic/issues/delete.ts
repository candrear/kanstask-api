import { Collection, getModel } from "../../constant-definitions";
import {  Issue, IssueSchemaMongo, StatusType } from "../../entities";

export const deleteIssue = async (
  uuid: string
): Promise<Boolean | Error> => {
  const model = getModel<Issue>(Collection.ISSUES, IssueSchemaMongo);
  const result = await model.updateOne({ _id: uuid }, {status: StatusType.DELETED});

  if (!result) throw new Error('Could not delete issue');

  return true;
};
