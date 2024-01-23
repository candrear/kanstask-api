import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { Collection, getModel } from '../../../constant-definitions';
import { Admin, AdminSchemaMongo } from '../../../entities';

const { JWT_SECRET } = process.env;

export const login = async ({username, password, code}: {username: string, password: string, code?: number}) => {
     
    const model = getModel<Admin>(Collection.ADMINS, AdminSchemaMongo);
     if(!username) throw new Error("Username is required"); 
     const admin = await model.findOne({username: username.toLowerCase()});
     if(!admin) throw new Error("Invalid credentials");
     if(admin.locked) throw new Error("Admin is already locked");
     const isValidPassword = await compare(password, admin.password);
    
     if(!isValidPassword) {
        admin.login_attempts += 1;
         await admin.save();
         if(admin.login_attempts >= 3){
            admin.locked = true;
             await admin.save();
             throw new Error('Too many login attempts, your account is already locked');
         }
         throw new Error("Invalid credentials");
     }
    
     if(admin.two_factor_auth){
         if(!code){
             throw new Error('Authentication code must be provided for login');
         }
         const verified = false;
     }
     
     admin.last_login = new Date().toString();
     admin.login_attempts = 0;
     await admin.save();
    
     const token = jwt.sign({uuid: admin._id}, JWT_SECRET!, {expiresIn: '24h'});
     return {token};
}