const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 8241575055; 
const ADMIN_USERNAME = 'Karimov_ppp'; 
const CHANNEL_LINK = 't.me/Job_Forge';
const WEBSITE_URL = 'https://job-forge.uz'; // Ўзингни келажакдаги доменингни ёзасан

const bot = new Telegraf(token);

// Асосий меню - Тўлиқ ва қулай версия
bot.start((ctx) => {
  return ctx.reply(`🚀 Job_Forge Professional platformasiga xush kelibsiz!\n\nBiz bilan ish topish va ishchi olish endi ancha oson va zamonaviy.`, 
    Markup.keyboard([
      ['🌐 Saytni ochish (Full Version)'], // Энг асосий тугма
      ['🔍 Ish qidirish', '👥 Ishchi kerak'],
      ['📢 E’lon berish', 'ℹ️ Biz haqimizda'],
      ['👨‍💻 Admin', '📢 Telegram Kanal']
    ]).resize()
  );
});

// Сайт тугмаси босилганда
bot.hears('🌐 Saytni ochish (Full Version)', (ctx) => {
  return ctx.reply(`Bizning professional saytimiz orqali barcha vakansiyalarni filtrlash va boshqarish imkoniyatiga egasiz:`, 
    Markup.inlineKeyboard([
      [Markup.button.webApp('Ilovani ishga tushirish 📱', WEBSITE_URL)],
      [Markup.button.url('Saytga o\'tish (Brauzerda) 🌍', WEBSITE_URL)]
    ])
  );
});

// Қолган тугмалар матни
bot.hears('🔍 Ish qidirish', (ctx) => {
  return ctx.reply(`O'zingizga mos ishlarni kanalda kuzatib boring yoki saytimizdagi qidiruv tizimidan foydalaning:\n\n${CHANNEL_LINK}\n\nSayt: ${WEBSITE_URL}`);
});

bot.hears('👥 Ishchi kerak', (ctx) => {
  return ctx.reply(`Agarda siz professional xodim qidirayotgan bo'lsangiz, bizning kanal va saytimiz orqali minglab nomzodlarga e'loningizni yetkazamiz:\n\nKanal: ${CHANNEL_LINK}\nSayt: ${WEBSITE_URL}`);
});

bot.hears('ℹ️ Biz haqimizda', (ctx) => {
  return ctx.reply(`Job-Forge — bu shunchaki e'lonlar doskasi emas, bu zamonaviy HR ekotizimi. Biz sizga turar joyingiz, maosh kutishingiz va ish smenalaringizga mos keladigan eng yaxshi variantlarni topishda yordam beramiz.`);
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

// Callback-лар ва Админ хабарлари
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  let tariffName = data.replace('t_', '').toUpperCase();

  await ctx.answerCbQuery();
  await ctx.reply(`Rahmat! Siz "${tariffName}" tarifini tanladingiz.\n\n✅ 24 soat ichida admin siz bilan aloqaga chiqadi yoki o'zingiz yozishingiz mumkin:`,
    Markup.inlineKeyboard([[Markup.button.url('Adminga yozish ✍️', `https://t.me/${ADMIN_USERNAME}`)]])
  );

  return ctx.telegram.sendMessage(ADMIN_ID, `🚀 **Yangi mijoz!**\n👤 @${ctx.from.username || 'User'}\n📦 Tarif: ${tariffName}\n🆔 ID: ${ctx.from.id}`);
});

bot.hears('👨‍💻 Admin', (ctx) => ctx.reply(`Savollar bo'lsa: @${ADMIN_USERNAME}`));
bot.hears('📢 Telegram Kanal', (ctx) => ctx.reply(`Kanalimiz: ${CHANNEL_LINK}`));

bot.launch().then(() => console.log('🚀 Бот профессионал режимда!'));

http.createServer((req, res) => { res.end('OK'); }).listen(process.env.PORT || 10000);