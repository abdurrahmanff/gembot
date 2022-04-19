import { SlashCommandBuilder } from '@discordjs/builders';

const data = [
  new SlashCommandBuilder()
    .setName('kirim')
    .setDescription('Kirim pesan!')
  // .addStringOption(option =>
  //   option.setName('input')
  //     .setDescription('The input to echo back')
  //     .setRequired(true)
  //     .addChoices(...[{ name: 'Funny', value: 'gif_funny' }])
  //     .addChoices(...[{ name: 'Meme', value: 'gif_meme' }])
  //     .addChoices(...[{ name: 'Movie', value: 'gif_movie' }]))
]

export default data