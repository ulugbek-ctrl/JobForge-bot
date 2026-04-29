const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const token = process.env.BOT_TOKEN;
const ADMIN_ID = 8241575055; 
const ADMIN_USERNAME = 'Karimov_ppp'; 
const CHANNEL_LINK = 't.me/Job_Forge'; 
const WEBSITE_URL = 'https://jobforge-uz.vercel.app/'; 

const bot = new Telegraf(token);

// 1. Асосий меню
bot.start((ctx) => {
  return ctx.reply(`🚀 JobForge-UZ Professional platformasiga xush kelibsiz!\n\nBiz bilan ish topish va ishchi olish endi ancha oson va zamonaviy.`, 
    Markup.keyboard([
      ['🌐 Saytni ochish (Full Version)'],
      ['🔍 Ish qidirish', '👥 Ishchi kerak'],
      ['📢 E’lon berish', 'ℹ️ Biz haqimizda'],
      ['👨‍💻 Admin', '📢 Telegram Kanal']
    ]).resize()
  );
});

// 2. ЯНГИ: Help буйруғи (Сен сўраган жойи)
bot.help((ctx) => {
  return ctx.reply(`❓ Ботдан қандай foydalanish mumkin?\n\n1️⃣ **Ish qidirish** — bo'sh ish o'rinlarini ko'rish.\n2️⃣ **Ishchi kerak** — xodim izlash haqida e'lon berish.\n3️⃣ **Saytni ochish** — to'liq veb-versiyaga o'tish.\n\nAgar muammo yuzaga kelsa, /start ni bosing yoki adminga yozing.`);
});

// 3. Сайт ва WebApp тугмаси
bot.hears('🌐 Saytni ochish (Full Version)', (ctx) => {
  return ctx.reply(`Professional saytimiz orqali barcha vakansiyalarni filtrlash va AI rezyume yaratish imkoniyatiga egasiz:`, 
    Markup.inlineKeyboard([
      [Markup.button.webApp('Ilovani ochish 📱', WEBSITE_URL)],
      [Markup.button.url('Saytga o\'tish (Brauzerda) 🌍', WEBSITE_URL)]
    ])
  );
});

// 4. Иш қидириш ва Канал
bot.hears('🔍 Ish qidirish', (ctx) => {
  return ctx.reply(`O'zingizga mos ishlarni qidirayotgan bo'lsangiz, bizning kanalga qo'shiling yoki saytdan foydalaning:\n\nKanal: ${CHANNEL_LINK}\nSayt: ${WEBSITE_URL}`);
});

bot.hears('👥 Ishchi kerak', (ctx) => {
  return ctx.reply(`Ishchi qidirayotgan bo'lsangiz, biz sizni kanalimizga taklif qilamiz:\n\n${CHANNEL_LINK}`);
});

bot.hears('ℹ️ Biz haqimizda', (ctx) => {
  return ctx.reply(`JobForge-UZ — bu zamonaviy ish qidirish ekotizimi. Biz sizga turar joy, maosh va smenalarga mos ish topishda yordam beramiz.`);
});

// 5. Эълон бериш ва Тарифлар
bot.hears('📢 E’lon berish', (ctx) => {
  return ctx.reply('Vakansiya joylashtirish uchun tarifni tanlang:', 
    Markup.inlineKeyboard([
      [Markup.button.callback('Oddiy - Bepul', 't_oddiy')],
      [Markup.button.callback('Pro (1 hafta TOP) - 150k', 't_pro')],
      [Markup.button.callback('Extra (1 oy) - 349k', 't_extra')],
      [Markup.button.callback('24 soat REK - 50k', 't_24h')]
    ]));
});

// 6. Callback ва Админга хабар
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  if (!data.startsWith('t_')) return; // Фақат тарифлар учун

  let tariffName = data.replace('t_', '').toUpperCase();

  await ctx.answerCbQuery();
  await ctx.reply(`Rahmat! Siz "${tariffName}" tarifini tanladingiz.\n\n✅ 24 soat ichida admin siz bilan aloqaga chiqadi:`,
    Markup.inlineKeyboard([[Markup.button.url('Adminga yozish ✍️', `https://t.me/${ADMIN_USERNAME}`)]])
  );

  return ctx.telegram.sendMessage(ADMIN_ID, 
    `🚀 **Yangi mijoz!**\n👤 @${ctx.from.username || 'User'}\n📦 Tarif: ${tariffName}\n🆔 ID: ${ctx.from.id}`
  );
});

bot.hears('👨‍💻 Admin', (ctx) => ctx.reply(`Savollar bo'lsa: @${ADMIN_USERNAME}`));
bot.hears('📢 Telegram Kanal', (ctx) => ctx.reply(`Kanalimiz: ${CHANNEL_LINK}`));

// 7. Хатоликларни ушлаш (Бот ўчиб қолмаслиги учун)
bot.catch((err, ctx) => {
  console.log(`Ooops, error for ${ctx.updateType}`, err);
});

bot.launch().then(() => console.log('🚀 Бот муваффақиятли ишга тушди!'));

// 8. Render учун сервер (Порт 10000)
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.write('<h1>JobForge-UZ Bot Server is Running!</h1>');
    res.end();
}).listen(process.env.PORT || 10000);

// Жараённи тўғри тўхтатиш
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));