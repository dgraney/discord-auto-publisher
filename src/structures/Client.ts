import { ActivityType, Client, type ClientEvents, Collection, RESTEvents } from 'discord.js';
import crypto from 'node:crypto';
import type { Level as LoggerLevel } from 'pino';
import config from '#config';
import AutoPublisherCluster from '#structures/Cluster';
import type Event from '#structures/Event';
import type { CommandsCollection } from '#types/AdminCommandTypes';
import { getFilePaths, importFile } from '#util/fileUtils';
import { is429, parseRestSublimit } from '#util/parseRestSublimit';
import { minToMs } from '#util/timeConverters';

class AutoPublisherClient extends Client {
  public cluster = new AutoPublisherCluster(this);
  public commands: CommandsCollection = new Collection();

  public logger = this.cluster.logger;
  public antiSpam = this.cluster.antiSpam;
  public crosspostQueue = this.cluster.crosspostQueue;
  public cache = this.cluster.cache;

  public async start() {
    return Promise.all([
      this.antiSpam.connect(),
      this.cache.requestLimits.connect(),
      this.cache.crossposts.connect(),
      this._registerEvents(),
      this._registerCommands(),
      this.login(config.botToken),
    ]).catch((error) => {
      this.logger.error(error);
      process.exit(1);
    });
  }

  private async _registerEvents() {
    this.rest.on(RESTEvents.Debug, (data) => {
      const rateLimited = is429(data);
      if (rateLimited) this.cache.requestLimits.add(crypto.randomUUID(), 429);

      const parsedParams = parseRestSublimit(data);
      if (parsedParams) this.antiSpam.add(parsedParams);
    });

    const filePaths = getFilePaths('listeners/**/*.js');
    return filePaths.map(async (filePath) => {
      const event: Event<keyof ClientEvents> = await importFile(filePath);
      this.on(event.name, event.run);
    });
  }

  private async _registerCommands() {
    const filePaths = getFilePaths('util/admin-commands/*.js');
    return filePaths.map(async (filePath) => {
      const command = await importFile(filePath);
      this.commands.set(command.name, command.run);
    });
  }

  public startPresenceInterval() {
    setInterval(() => this.updatePresence(), minToMs(config.presenceInterval));
  }

  public async updatePresence() {
    const guilds = (await this.cluster.fetchClientValues('guilds.cache.size')) //
      .reduce((p: number, n: number) => p + n);
    this.logger.debug(`Updating presence. Guilds: ${guilds}`);

    this.user?.setPresence({
      activities: [
        {
          name: `${guilds} server${guilds > 1 ? 's' : ''}`,
          type: ActivityType.Watching,
        },
      ],
    });
  }

  public setLoggerLevel(level: LoggerLevel) {
    this.logger.level = level;
  }
}

export default AutoPublisherClient;
