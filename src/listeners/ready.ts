import { Events } from 'discord.js';
import client from '#client';
import Event from '#structures/Event';
import { minToMs } from '#util/timeConverters';

export default new Event(Events.ClientReady, async () => {
  client.blacklist.startOrphansCleanupInterval();
  await client.blacklist.orphansCleanup();

  client.startPresenceInterval();
  setTimeout(() => client.updatePresence(), minToMs(1));
});
