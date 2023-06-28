import z from 'zod';
import LoggerLevel from '#schemas/config/LoggerLevel';
import Snowflake from '#schemas/config/Snowflake';

export const BotConfigSchema = z
  .object({
    presenceInterval: z.number().min(1).max(60),
    urlDetection: z.object({
      enabled: z.boolean(),
      deferTimeout: z.number().min(1).max(60),
    }),
    antiSpam: z.object({
      enabled: z.boolean(),
      autoLeave: z.boolean(),
      messagesThreshold: z.number().min(0),
    }),
  })
  .strict();

export const EnvSchema = z
  .object({
    botToken: z.string(),
    redisUri: z.string().url(),

    botAdmins: z.array(Snowflake),
    shards: z.number().min(1),
    shardsPerCluster: z.number().min(1),
    requestsPerSecond: z.number().min(1).max(50),
    loggerLevel: LoggerLevel,
  })
  .strict();

export const ConfigSchema = BotConfigSchema.merge(EnvSchema);
