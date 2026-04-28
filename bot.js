const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 8241575055; // Сенинг ID рақаминг
const ADMIN_USERNAME = 'Karimov_ppp'; // Сенинг юзернейминг

const bot = new Telegraf(token);

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
      [Markup.button.callback('Oddiy - Bepul', 't_oddiy')],
      [Markup.button.callback('Pro (1 hafta TOP) - 150k', 't_pro')],
      [Markup.button.callback('Extra (1 oy) - 349k', 't_extra')],
      [Markup.button.callback('24 soat REK - 50k', 't_24h')]
    ]));
});

bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  let tariffName = '';

  if (data === 't_oddiy') tariffName = 'Oddiy - Bepul';
  if (data === 't_pro') tariffName = 'Pro (1 hafta TOP)';
  if (data === 't_extra') tariffName = 'Extra (1 oy)';
  if (data === 't_24h') tariffName = '24 soat REK';

  await ctx.answerCbQuery();

  // 1. МИЖОЗГА ЖАВОБ: У фақат шуни кўради
  await ctx.reply(`Rahmat! Siz "${tariffName}" tarifini tanladingiz.\n\nTez orada admin siz bilan bog'lanadi ёки ўзингиз ёзишингиз мумкин:`,
    Markup.inlineKeyboard([
      [Markup.button.url('Adminga yozish ✍️', `https://t.me/${ADMIN_USERNAME}`)]
    ])
  );

  // 2. АДМИНГА (СЕНГА) ХАБАР: Бу фақат сенинг личкангга боради
  return ctx.telegram.sendMessage(ADMIN_ID, 
    `🚀 **Yangi mijoz keldi!**\n\n👤 **Kim:** @${ctx.from.username || 'Юзернейм йўқ'}\n📦 **Tarif:** ${tariffName}\n🆔 **ID:** ${ctx.from.id}`
  );
});

bot.hears('👨‍💻 Admin', (ctx) => {
  return ctx.reply(`Savollar bo'lsa adminga murojaat qiling: @${ADMIN_USERNAME}`);
});

bot.telegram.deleteWebhook().then(() => {
    bot.launch().then(() => console.log('🚀 Бот янгиланган тизимда ишга тушди!'));
});

http.createServer((req, res) => { res.write('OK'); res.end(); }).listen(process.env.PORT || 10000);