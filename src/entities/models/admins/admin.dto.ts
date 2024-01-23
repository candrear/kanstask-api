import { Admin } from "./schemas";

export interface CreateAdminDto extends Omit<Admin, '_id' | 'createdAt' | 'updatedAt'> {}
export interface UpdateAdminDto extends Partial<Admin> {}
