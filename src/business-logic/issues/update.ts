import { Collection, getModel } from "../../constant-definitions";
import { Issue, IssueSchemaMongo, UpdateIssueDto } from "../../entities";

export const updateIssue = async (data: UpdateIssueDto) => {
    const model = getModel<Issue>(Collection.ISSUES, IssueSchemaMongo);
    const issue = await model.findById(data.uuid);
    
    if (!issue) throw new Error(`Issue doesn't exist`);

    const updatedIssue = await model.findByIdAndUpdate(data.uuid, data, {
        new: true,
    });
    if (!updatedIssue) throw new Error(`Product not found`);
    return updatedIssue;
};