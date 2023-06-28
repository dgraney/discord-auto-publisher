import { Document, Schema, model } from 'mongoose';

export interface IGuild extends Document {
  guildId: string;
}

const GuildSchema = new Schema(
  {
    guildId: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    autoCreate: true,
    timestamps: true,
  }
);

export const Guild = model<IGuild>('Guild', GuildSchema);
