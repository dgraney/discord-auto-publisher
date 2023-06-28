import type { Collection, Snowflake } from 'discord.js';

export type CommandsCollection = Collection<CommandNames, (...args: unknown[]) => void>;

export enum CommandNames {
  CHANNEL = 'channel',
  DEBUG = 'debug',
  FLUSHRL = 'flushrl',
  PING = 'ping',
  QUEUE = 'queue',
  RESPAWN = 'respawn',
  RLSIZE = 'rlsize',
  SERVER = 'server',
  SHUTDOWN = 'shutdown',
  UPTIME = 'uptime',
}

export type Commands = {
  [CommandNames.CHANNEL]: [channelId?: Snowflake];
  [CommandNames.DEBUG]: [value: string];
  [CommandNames.FLUSHRL]: [];
  [CommandNames.PING]: [];
  [CommandNames.QUEUE]: [];
  [CommandNames.RESPAWN]: [];
  [CommandNames.RLSIZE]: [];
  [CommandNames.SERVER]: [guildId?: Snowflake];
  [CommandNames.SHUTDOWN]: [];
  [CommandNames.UPTIME]: [];
};
