const { SlashCommand, CommandOptionType } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'earrape',
            description: 'Set music volume to 1000',
            options: [
                {
                    name: 'amount',
                    type: CommandOptionType.INTEGER,
                    description: 'Sets the volume to 1000',
                    required: false
                }
            ],

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run(ctx) {
        
        const { client } = require('..');
        
        await ctx.defer();
        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        const vol = parseInt(1000);
        if (!vol) return void ctx.sendFollowUp({ content: `🎧 | Current volume is **${1000}**%!` });
        if (vol < 0 || vol > 1000) return void ctx.sendFollowUp({ content: '❌ | Volume range must be 0-1000' });
        const success = queue.setVolume(vol);
        await queue.setFilters({
            "8D": !queue.getFiltersEnabled().includes('8D'),
            nightcore: !queue.getFiltersEnabled().includes('nightcore'),
            bassboost: !queue.getFiltersEnabled().includes('bassboost'),
            normalizer2: !queue.getFiltersEnabled().includes('bassboost') 
        });
        return void ctx.sendFollowUp({
            content: success ? `✅ | Volume set to **${1000}%**!` : '❌ | Something went wrong!'
        });

    }
};
