import {Schema} from 'mongoose';
import { Admin, Team } from './admin';
import crypto from 'crypto';
import { StatusType } from '../../../common';

export const AdminSchemaMongo = new Schema<Admin>({
    _id: { type: String, unique: true, default: () => crypto.randomUUID() },
    name: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    middlelastname: { type: String },
    username: { type: String, required: true, unique: true },
    identification: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    status: { type: String, default: StatusType.ACTIVE },
    password: { type: String, required: true },
    photo: { type: String },
    position: { type: String, required: true },
    location: {
      icon: { type: String },
      country: { type: String },
      province: { type: String },
      city: { type: String }
    },
    team: { type: String, enum: Object.values(Team), required: true },
    birthdate: { type: String },
    payment: {
      bank: { type: String, required: true },
      account: { type: String, required: true },
      type: { type: String, required: true }
    },
    projects: [{
        type: { type: String, ref: "projects"}
    }],
    salary: { type: Number, required: true },
    age: { type: Number, required: true },
    code: { type: Number, required: false },
    points: { type: Number, required: false, default: 0 },
    login_attempts: {type: Number, default: 0},
    two_factor_auth: {type: Boolean, default: false},
    locked: {type: Boolean, default: false},
    start_date: { type: String },
    last_login: { type: String }
},{
    versionKey: false,
    timestamps: true
}) ;

AdminSchemaMongo.methods.toJSON = function () {
 const { _id, ...admin } = this.toObject();
 admin.uuid = _id;
 return admin;
};