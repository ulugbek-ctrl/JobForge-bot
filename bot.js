const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const ADMIN_ID = 8241575055;
// Энг охирги олинган токен (image_edb89b.png дан)
const bot = new Telegraf('8731348653:AAEprXOmBlRhuLOplH8vZfBqa3KZH5OD4bk');

bot.start((ctx) => {
  return ctx.reply(`Assalomu Aleykum Job_Forge-ga xush kelibsiz!`, 
    Markup.keyboard([
      ['🔍 Ish qidirish', '📢 E’lon berish'],
      ['👨‍💻 Admin', '📢 Telegram Kanal']
    ]).resize()
  );
});

bot.hears('📢 E’lon berish', (ctx) => {
  return ctx.reply('Vakansiya joylashtirish uchun tarifni tanlang:', 
    Markup.inlineKeyboard([
      [Markup.button.callback('Oddiy (2 hafta) - Bepul', 'tariff_oddiy')],
      [Markup.button.callback('Pro (1 hafta TOP) - 150k', 'tariff_pro')]
    ]));
});

bot.on('callback_query', async (ctx) => {
  await ctx.answerCbQuery();
  await ctx.reply('Rahmat! Admin tez orada bog‘lanadi.');
  return ctx.telegram.sendMessage(ADMIN_ID, `🚀 Yangi mijoz: @${ctx.from.username || 'user'}`);
});

bot.telegram.deleteWebhook().then(() => {
    bot.launch().then(() => console.log('🚀 Bot muvaffaqiyatli ulandi!'));
});

http.createServer((req, res) => { res.write('Bot is running'); res.end(); }).listen(process.env.PORT || 10000);