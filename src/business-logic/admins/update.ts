import { Collection, getModel } from "../../constant-definitions";
import { Admin, AdminSchemaMongo, UpdateAdminDto } from '../../entities';

export const updateAdmin = async (data: UpdateAdminDto) => {
    const model = getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);
    const admin = await model.findById(data.uuid);
    
    if (!admin) throw new Error(`Admin doesn't exist`);

    const updatedAdmin = await model.findByIdAndUpdate(data.uuid, data, {
        new: true,
    });
    if (!updatedAdmin) throw new Error(`Admin not found`);
    return updatedAdmin;
};