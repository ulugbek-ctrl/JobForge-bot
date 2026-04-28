const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. Созламалар
const ADMIN_ID = 8241575055;
// Охирги янги токенни қўйдик
const bot = new Telegraf('8731348653:AAEprXOmBlRhuLOplH8vZfBqa3KZH5OD4bk');

// 2. Бот буйруқлари
bot.start((ctx) => {
  return ctx.reply(`Assalomu Aleykum Job_Forge-ga xush kelibsiz! \n\nAgar siz ish qidirmoqchi bo'lsangiz yoki ishchi qidirayotgan bo'lsangiz, biz bilan bog'laning.`, 
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
      [Markup.button.callback('Pro (1 hafta TOP) - 150k', 'tariff_pro')],
      [Markup.button.callback('Extra (1 oy) - 349k', 'tariff_extra')],
      [Markup.button.callback('24 soat REK - 50k', 'tariff_rek')]
    ]));
});

// Тугмалар босилганда ишлайдиган қисм
bot.on('callback_query', async (ctx) => {
  const actionData = ctx.callbackQuery.data;
  
  if (actionData.startsWith('tariff_')) {
    await ctx.answerCbQuery();
    await ctx.reply('Rahmat! Tez orada admin siz bilan bog‘lanib, e’loningizni joylaydi.');
    
    // Админга хабар юбориш
    const user = ctx.from;
    const adminMsg = `🚀 Янги мижоз!\n👤 Исм: ${user.first_name}\n🔗 Юзер: @${user.username || 'йўқ'}\n🆔 ID: ${user.id}\n💳 Тариф: ${actionData}`;
    
    return ctx.telegram.sendMessage(ADMIN_ID, adminMsg).catch(e => console.log("Admin xabar hatosi:", e));
  }
});

bot.hears('👨+💻 Admin', (ctx) => ctx.reply('Admin bilan bog‘lanish: @Karimov_ppp'));
bot.hears('📢 Telegram Kanal', (ctx) => ctx.reply('Bizning kanal: https://t.me/Job_Forge'));

// 3. Ботни ишга тушириш (Webhook тозалаш билан)
bot.telegram.deleteWebhook().then(() => {
    bot.launch().then(() => console.log('🚀 Бот муваффақиятли уланди!'));
});

// 4. Render учун сервер
http.createServer((req, res) => {
  res.write('Bot is running...');
  res.end();
}).listen(process.env.PORT || 10000);

// Хатларни ушлаш
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));