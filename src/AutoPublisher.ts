import Cluster from 'discord-hybrid-sharding';
import DJS from 'discord.js-light';
import gatewayQueueFilter from '#crosspost/gatewayQueueFilter';
import AutoPublisherClient from '#structures/Client';

const {
  Intents: { FLAGS },
  Options,
} = DJS;
const shardData = Cluster.Client.getInfo();
const client = new AutoPublisherClient({
  makeCache: Options.cacheWithLimits({
    ApplicationCommandManager: 0,
    BaseGuildEmojiManager: 0,
    GuildChannelManager: Infinity,
    GuildBanManager: 0,
    GuildInviteManager: 0,
    GuildManager: Infinity,
    GuildMemberManager: 0,
    GuildStickerManager: 0,
    GuildScheduledEventManager: 0,
    MessageManager: 0,
    PermissionOverwriteManager: 0,
    PresenceManager: 0,
    ReactionManager: 0,
    ReactionUserManager: 0,
    RoleManager: 0,
    StageInstanceManager: 0,
    ThreadManager: 0,
    ThreadMemberManager: 0,
    UserManager: 0,
    VoiceStateManager: 0,
  }),
  intents: [FLAGS.GUILDS, FLAGS.GUILD_MESSAGES, FLAGS.DIRECT_MESSAGES],
  partials: ['CHANNEL'],
  shards: shardData.SHARD_LIST,
  shardCount: shardData.TOTAL_SHARDS,
  restGlobalRateLimit: 50,
  rejectOnRateLimit: gatewayQueueFilter,
});

client.start();

export default client;
