
import { Collection, getModel } from "../../constant-definitions";
import { Admin, AdminSchemaMongo } from '../../entities';

export const getAdminById = async (uuid: string): Promise<Admin> => {
    const model = getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);
    const brands = await model.findById(uuid) as Admin;
    return brands;
}