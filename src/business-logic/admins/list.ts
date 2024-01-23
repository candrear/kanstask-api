import { Admin, AdminSchemaMongo, Result, StatusType} from '../../entities';
import { Collection, getModel } from "../../constant-definitions";

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
* Returns a paginated list of admins.
* @param page Page number (default: 1).
* @param limit Number of elements per page (default: 14).
* @param search Search string for admin name (optional).
* @returns A promise that resolves with a `Result<Admin>` object containing paginated admin list.
*/
export const getAllAdmins = async ( {page = 1, limit = 14, search= ''}: Parmas): Promise<Result<Admin>> => {
 const model = getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);

 const query:Query = { status: StatusType.ACTIVE }

 if(search){
   query.name = { $regex: search, $options: 'i' };
 }
 
 const pageSize = limit;
 const skip = (page - 1) * pageSize;

 const total = await model.countDocuments({status: StatusType.ACTIVE});

 const admins = await model
   .find(query)
   .skip(skip)
   .limit(pageSize)
   .sort({createdAt: -1 })

 
 const pages = Math.ceil(total / pageSize);

 const hasPreviousPage = page > 1;
 const previousPage = hasPreviousPage ? page - 1 : page;
 const hasNextPage = page < pages;
 const nextPage = hasNextPage ? page + 1 : page;

 return {
   count: total,
   items: admins,
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
