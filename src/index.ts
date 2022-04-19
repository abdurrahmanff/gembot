import fs from "fs";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { Client, GuildMember, Intents } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
} from "@discordjs/voice";
import commands from "./commands/commands";
import config from "./config";
import ytdl from "ytdl-core";
// import ytSearch from "yt-search";

ytdl("http://www.youtube.com/watch?v=aqz-KE-bpKQ").pipe(
  fs.createWriteStream("video.mp4")
);

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES],
});
const rest = new REST({ version: "9" }).setToken(config.token);

// console.log(generateDependencyReport())

client.once("ready", () => {
  console.log("Jalan");
});

// console.log(commands)

try {
  console.log("Started refreshing application (/) commands.");

  rest.put(Routes.applicationCommands(config.clientId), { body: commands });

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  // const songLink = interaction.options.getString("input");
  if (interaction.commandName == "play") {
    if (
      interaction.guildId == null ||
      interaction.guild?.voiceAdapterCreator == null ||
      !(interaction.member instanceof GuildMember) ||
      interaction.member.voice.channelId == null
    )
      return;

    const audioPlayer = createAudioPlayer();

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guildId,
      // @ts-ignore
      adapterCreator: interaction.guild?.voiceAdapterCreator,
    });

    const song = createAudioResource("video.mp4");
    audioPlayer.play(song);
    connection.subscribe(audioPlayer);
    audioPlayer.on(AudioPlayerStatus.Playing, () => {
      console.log("Bernyanyi");
    });

    audioPlayer.on("error", (error) => {
      console.log(error);
    });
    // console.log(interaction.member.voice);

    // interaction.reply(songLink);
  }
  // else if (interaction.command == 'kirim') {

  // }
});
// for (const file of commandFiles) {
//   const command = require(`./commands/${file}`);
//   client.commands.set(command.data.name, command);
// }

client.login(config.token);
