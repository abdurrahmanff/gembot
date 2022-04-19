import { SlashCommandBuilder } from "@discordjs/builders";
// import send from './send'

const data = [
  new SlashCommandBuilder().setName("play").setDescription("Play song!"),
  // .addStringOption(option =>
  //   option.setName('input')
  //     .setDescription('Spotify\'s URL')
  //     .setRequired(true))
];

// data.push(...send);

export default data;
