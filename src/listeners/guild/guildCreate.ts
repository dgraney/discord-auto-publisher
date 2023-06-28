import { Events } from 'discord.js';
import client from '#client';
import config from '#config';
import { isDev } from '#constants/isDev';
import Event from '#structures/Event';
import { guildMembersToString, guildToString } from '#util/stringFormatters';

const { antiSpam } = config;

export default new Event(Events.GuildCreate, async (guild) => {
  const members = guildMembersToString(guild);
  client.logger.debug(`Joined ${guildToString(guild)} with ${members}.`);
});
