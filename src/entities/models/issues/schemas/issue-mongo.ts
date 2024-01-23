import crypto from 'crypto';
import { Schema } from 'mongoose';
import { StatusType } from '../../../common';
import { Issue } from './issue';

export const IssueSchemaMongo = new Schema<Issue>({
 _id: { type: String, unique: true, default: () => crypto.randomUUID() },
 type: { type: String },
 code: { type: Number },
 summary: { type: String },
 description: { type: String },
 priority: { type: String },
 status_issue: { type: String },
 status: { type: String, default: StatusType.ACTIVE },
 assignees: [
    { type: String, ref: 'admins' }
 ],
 reporter: { type: String, ref: 'admins' },
 estimate: { type: Number },
 project: { type: String, ref: 'projects' },
 attachments: [{ type: String }],
 list_position: { type: Number, default: 1 },
 comments: [{ type: {
  uuid: { type: String, default: () => crypto.randomUUID()},
  text: { type: String },
  author: { type: String, ref: 'admins'},
  createdAt: { type: String },
  updatedAt: { type: String }
 }}],
 subtasks: [{     code:{ type: Number},
   description: {type: String}, 
   assignees: { type: String, ref: 'admins'},
   status: {type: Boolean}
}],
 labels: [{ type: String }],
 dueDate: { type: String },
},
{
 versionKey: false,
 timestamps: true,
});

IssueSchemaMongo.methods.toJSON = function () {
 const { _id, ...issue } = this.toObject();
 issue.uuid = _id;
 return issue;
};