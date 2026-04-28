const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// Токенни Render-даги Environment бўлимидан олади
const token = process.env.BOT_TOKEN;
const ADMIN_ID = 8241575055;

if (!token) {
  console.error("ХАТО: BOT_TOKEN топилмади! Render-даги Environment бўлимини текширинг.");
  process.exit(1);
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  return ctx.reply(`Assalomu Aleykum Job_Forge-ga xush kelibsiz!`, 
    Markup.keyboard([['🔍 Ish qidirish', '📢 E’lon berish']]).resize()
  );
});

bot.hears('📢 E’lon berish', (ctx) => {
  return ctx.reply('Тарифни танланг:', 
    Markup.inlineKeyboard([[Markup.button.callback('Oddiy - Bepul', 'tariff_oddiy')]]));
});

bot.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Раҳмат! Админ сиз билан боғланади.');
  return ctx.telegram.sendMessage(ADMIN_ID, `🚀 Янги мижоз: @${ctx.from.username || 'user'}`);
});

bot.telegram.deleteWebhook().then(() => {
    bot.launch().then(() => console.log('🚀 Бот муваффақиятли уланди!'));
});

http.createServer((req, res) => { res.write('OK'); res.end(); }).listen(process.env.PORT || 10000);