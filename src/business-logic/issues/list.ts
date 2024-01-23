import { Admin, AdminSchemaMongo, Issue, IssueSchemaMongo, Result, StatusType} from '../../entities';
import { Collection, getModel } from '../../constant-definitions'

interface Query {
    status: StatusType;
    name?: { $regex: string; $options: string };
    project?: string;
}

interface Params {
    page?: number;
    limit?: number;
    search?: string;
    uuid?:string;
}
  
/**
* Returns a paginated list of issues.
* @param page Page number (default: 1).
* @param limit Number of elements per page (default: 14).
* @param search Search string for issue name (optional).
* @returns A promise that resolves with a `Result<Issues>` object containing paginated issue list.
*/
export const getAllIssues = async ( {uuid, page = 1, limit = 14, search= ''}: Params): Promise<Result<Issue>> => {
 const model = getModel<Issue>(Collection.ISSUES, IssueSchemaMongo);
 getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);

 const query:Query = { status: StatusType.ACTIVE }

 if(search){
   query.name = { $regex: search, $options: 'i' };
 }

 if(uuid){
  query.project = uuid;
}
 
 const pageSize = limit;
 const skip = (page - 1) * pageSize;

 const total = await model.countDocuments({status: StatusType.ACTIVE});

 const issues = await model
   .find(query)
   .skip(skip)
   .limit(pageSize)
   .sort({createdAt: -1 }).populate('reporter').populate('assignees').populate('project')

 
 const pages = Math.ceil(total / pageSize);

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

 
};
