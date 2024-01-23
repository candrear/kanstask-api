import { model, Model, Schema } from 'mongoose';
import { Collection } from "./constants";

export const getModel = <T>(collectionName: Collection, schema: Schema): Model<T> => {
    return model<T>(collectionName, schema);
}