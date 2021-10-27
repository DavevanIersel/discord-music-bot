const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'vaporwave',
            description: 'Toggle vaporwave filter',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        await queue.setFilters({
            Vaporwave: !queue.getFiltersEnabled().includes('vaporwave'),
        });

        setTimeout(() => {
            return void ctx.sendFollowUp({ content: `🎵 | Vaporwave ${queue.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);
    }
};
