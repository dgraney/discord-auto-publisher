import { Events } from 'discord.js';
import client from '#client';
import Event from '#structures/Event';
import logger from '#util/logger';
import { guildToString } from '#util/stringFormatters';

export default new Event(Events.GuildDelete, async (guild) => {
  if (await client.blacklist.has(guild.id)) return;

  const members = guild.memberCount || 'unknown';
  logger.debug(`Left ${guildToString(guild)} with ${members} members.`);
});
