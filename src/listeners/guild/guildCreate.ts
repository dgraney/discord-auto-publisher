import { Events } from 'discord.js';
import client from '#client';
import config from '#config';
import Event from '#structures/Event';
import logger from '#util/logger';
import { guildToString } from '#util/stringFormatters';

const { spam } = config;

export default new Event(Events.GuildCreate, async (guild) => {
  if (await client.blacklist.has(guild.id)) {
    if (spam.autoLeave) await client.blacklist.leaveGuild(guild.id);
    return;
  }

  const members = guild.memberCount || 'unknown';
  logger.debug(`Joined ${guildToString(guild)} with ${members} members.`);
});
