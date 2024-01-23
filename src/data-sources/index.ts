import { initApi, InitApiOptions } from "./api";
import { initMongoose, InitMongooseOptions } from "./mongoose";
import { InitRedisOptions } from "./redis";

export interface InitDataSourcesOptions {
  api?: InitApiOptions[];
  mongoose?: InitMongooseOptions;
  redisdb?: InitRedisOptions;
}

export const initDataSources = async ({
  api,
  mongoose,
  redisdb,
}: InitDataSourcesOptions) => {
  if (api) {
    for (let apiOptions of api) {
      await initApi(apiOptions);
    }
  }

  if (mongoose) {
    await initMongoose(mongoose);
  }

  if (redisdb) {
    console.log("Redis database");
  }
};
