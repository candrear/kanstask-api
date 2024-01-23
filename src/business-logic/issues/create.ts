import { Collection, getModel } from "../../constant-definitions";
import { CreateIssueDto, Issue, IssueSchemaMongo } from "../../entities";

export const createIssue = async (
  data: CreateIssueDto
): Promise<Issue | Error> => {
  const model = getModel<Issue>(Collection.ISSUES, IssueSchemaMongo);
  
  const issues = await model.find({});

  const code = issues.length > 0? issues[issues.length - 1]!.code + 1 : 1100
  const issue = new model({...data, code});

  if (!issue) throw new Error('Could not create Issue');
  await issue.save();
  return issue;
};
