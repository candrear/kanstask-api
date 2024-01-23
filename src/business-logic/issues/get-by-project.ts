import { Collection, getModel } from "../../constant-definitions";
import { Admin, AdminSchemaMongo, Issue, IssueSchemaMongo, Result, StatusType } from "../../entities";

export const getIssueByProjectId = async (uuid: string): Promise<Result<Issue>> => {
    const model = getModel<Issue>(Collection.ISSUES, IssueSchemaMongo);
    getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);
    const total = await model.countDocuments({status: StatusType.ACTIVE});

    if(uuid.length < 4) throw new Error("No Project id");

 const issues = await model
 .find({project: uuid,  status: StatusType.ACTIVE })
 .sort({createdAt: -1 }).populate('reporter').populate('assignees')
 const pageSize= 100;

 const pages = Math.ceil(total / pageSize);
const page = 1
 const hasPreviousPage = page > 1;
 const previousPage = hasPreviousPage ? page - 1 : page;
 const hasNextPage = page < pages;
 const nextPage = hasNextPage ? page + 1 : page;   
 
 return {
    count: total,
    items: issues,
    pageInfo: {
      page,
      pages,
      hasPreviousPage,
      hasNextPage,
      nextPage,
      previousPage,
    },
  };
 
}