import { Admin, AdminSchemaMongo, Project, ProjectSchemaMongo, Result, StatusType} from '../../entities';
import { Collection, getModel } from '../../constant-definitions'

interface Query {
    status: StatusType;
    name?: { $regex: string; $options: string };
}

interface Parmas {
    page?: number;
    limit?: number;
    search?: string;
}
  
/**
* Returns a paginated list of projects.
* @param page Page number (default: 1).
* @param limit Number of elements per page (default: 14).
* @param search Search string for project name (optional).
* @returns A promise that resolves with a `Result<Project>` object containing paginated project list.
*/
export const getAllProjects = async ( {page = 1, limit = 14, search= ''}: Parmas): Promise<Result<Project>> => {
 const model = getModel<Project>(Collection.PROJECTS, ProjectSchemaMongo);
 getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);

 const query:Query = { status: StatusType.ACTIVE }

 if(search){
   query.name = { $regex: search, $options: 'i' };
 }
 
 const pageSize = limit;
 const skip = (page - 1) * pageSize;

 const total = await model.countDocuments({status: StatusType.ACTIVE});

 const projects = await model
   .find(query)
   .skip(skip)
   .limit(pageSize)
   .sort({createdAt: -1 }).populate('members').populate('lead')

 
 const pages = Math.ceil(total / pageSize);

 const hasPreviousPage = page > 1;
 const previousPage = hasPreviousPage ? page - 1 : page;
 const hasNextPage = page < pages;
 const nextPage = hasNextPage ? page + 1 : page;

 return {
   count: total,
   items: projects,
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
