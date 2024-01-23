import crypto from 'crypto';
import { Schema } from 'mongoose';
import { StatusType } from '../../../common';
import { Project } from './project';

export const ProjectSchemaMongo = new Schema<Project>({
 _id: { type: String, unique: true, default: () => crypto.randomUUID() },
 name: { type: String },
 client: { type: String },
 category: { type: String },
 description: { type: String },
 resources: [{ type: String }],
 progress: { type: Number, default: 0},
 start_date: { type: Date, default: Date.now() },
 target_date: { type: Date, default: Date.now() },
 status: { type: String, default: StatusType.ACTIVE },
 lead: { type: String, ref: 'admins' },
 members: [{ type: String, ref: 'admins' }]
},
{
 versionKey: false,
 timestamps: true,
});

ProjectSchemaMongo.index({ _id: 1 });

ProjectSchemaMongo.methods.toJSON = function () {
 const { _id, ...project } = this.toObject();
 project.uuid = _id;
 return project;
};
