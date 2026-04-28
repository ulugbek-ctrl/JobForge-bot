const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 8241575055; //
const ADMIN_USERNAME = 'Karimov_ppp'; //
const CHANNEL_LINK = 'https://t.me/your_channel_link'; // Бу ерга канал ҳаволасини қўй

const bot = new Telegraf(token);

// Асосий меню (Пастки тугмалар)
bot.start((ctx) => {
  return ctx.reply(`Assalomu Aleykum Job_Forge-ga xush kelibsiz!`, 
    Markup.keyboard([
      ['🔍 Ish qidirish', '👥 Ishchi kerak'],
      ['📢 E’lon berish', 'ℹ️ Biz haqimizda'],
      ['👨‍💻 Admin', '📢 Telegram Kanal']
    ]).resize()
  );
});

// 1. Иш қидириш
bot.hears('🔍 Ish qidirish', (ctx) => {
  return ctx.reply(`Agarda siz o'zingizga mos ishlarni qidirayotgan bo'lsangiz, bizni kanalimizga qo'shiling:\n\n${CHANNEL_LINK}`);
});

// 2. Ишчи керак
bot.hears('👥 Ishchi kerak', (ctx) => {
  return ctx.reply(`Agarda siz ishchi qidirmoqchi bo'lsangiz, biz sizni kanalimizga taklif qilamiz:\n\n${CHANNEL_LINK}`);
});

// 3. Биз ҳақимизда
bot.hears('ℹ️ Biz haqimizda', (ctx) => {
  return ctx.reply(`Job-Forge sizga ko'p sohalarda yordam bera oladi. Misol uchun, siz ish qidirmoqchi bo'lsangiz, o'zingizni ma'lumotlaringizni yozishingiz kerak. Biz bilan esa faqat turar joyingiz yoki kerakli maosh va smenalarga mos tanlab olishingiz mumkin.`);
});

// 4. Эълон бериш (Тарифлар)
bot.hears('📢 E’lon berish', (ctx) => {
  return ctx.reply('Vakansiya joylashtirish uchun tarifni tanlang:', 
    Markup.inlineKeyboard([
      [Markup.button.callback('Oddiy - Bepul', 't_oddiy')],
      [Markup.button.callback('Pro (1 hafta TOP) - 150k', 't_pro')],
      [Markup.button.callback('Extra (1 oy) - 349k', 't_extra')],
      [Markup.button.callback('24 soat REK - 50k', 't_24h')]
    ]));
});

// Тариф танланганда админга хабар бериш
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  let tariffName = '';

  if (data === 't_oddiy') tariffName = 'Oddiy - Bepul';
  if (data === 't_pro') tariffName = 'Pro (1 hafta TOP)';
  if (data === 't_extra') tariffName = 'Extra (1 oy)';
  if (data === 't_24h') tariffName = '24 soat REK';

  await ctx.answerCbQuery();

  await ctx.reply(`Rahmat! Siz "${tariffName}" tarifini tanladingiz.\n\nTez orada admin siz bilan bog'lanadi yoki o'zingiz yozishingiz mumkin:`,
    Markup.inlineKeyboard([
      [Markup.button.url('Adminga yozish ✍️', `https://t.me/${ADMIN_USERNAME}`)]
    ])
  );

  // Фақат сенга (админга) хабар боради
  return ctx.telegram.sendMessage(ADMIN_ID, 
    `🚀 **Yangi mijoz keldi!**\n\n👤 **Kim:** @${ctx.from.username || 'Username yo\'q'}\n📦 **Tarif:** ${tariffName}\n🆔 **ID:** ${ctx.from.id}`
  );
});

// 5. Админ ва Канал тугмалари
bot.hears('👨‍💻 Admin', (ctx) => {
  return ctx.reply(`Savollar bo'lsa adminga murojaat qiling: @${ADMIN_USERNAME}`);
});

bot.hears('📢 Telegram Kanal', (ctx) => {
  return ctx.reply(`Bizning rasmiy kanalimiz: ${CHANNEL_LINK}`);
});

bot.telegram.deleteWebhook().then(() => {
    bot.launch().then(() => console.log('🚀 Бот тўлиқ меню билан ишга тушди!'));
});

http.createServer((req, res) => { res.write('OK'); res.end(); }).listen(process.env.PORT || 10000);