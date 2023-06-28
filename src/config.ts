import 'dotenv/config';
import fs from 'node:fs';
import type z from 'zod';
import type { BotConfigSchema, EnvSchema } from '#schemas/config/ConfigSchema';
import validateConfig from '#util/validateConfig';

const botConfigFile = fs.readFileSync(`./bot.config.json`, 'utf8');
const botConfig = JSON.parse(botConfigFile) as z.infer<typeof BotConfigSchema>;

const envVars: z.infer<typeof EnvSchema> = {
  botToken: process.env.BOT_TOKEN,
  redisUri: process.env.REDIS_URI,

  botAdmins: process.env.BOT_ADMINS.split(/,\s*/g),
  shards: parseInt(process.env.SHARDS),
  shardsPerCluster: parseInt(process.env.SHARDS_PER_CLUSTER),
  requestsPerSecond: parseInt(process.env.REQUESTS_PER_SECOND),
  loggerLevel: process.env.LOGGER_LEVEL,
};

const config = { ...botConfig, ...envVars };
validateConfig(config);

export default config;
