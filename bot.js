const { Telegraf, Markup } = require('telegraf');
const http = require('http');

const bot = new Telegraf('8731348653:AAGLP2LoZfp-mpdI_W9fqScSggRFmgcXHFY');
const ADMIN_ID = "415145209";

// Асосий меню
bot.start((ctx) => {
  ctx.reply(`Assalomu Aleykum Job_Forge-га хуш келибсиз! \n\nАгарда сиз иш қидирмоқчи бўлсангиз ёки ишчи қидираётган бўлсангиз биз билан бемалол боғланинг.`, 
    Markup.keyboard([
      ['🔍 Ish qidirish', '📢 E’lon berish'],
      ['👨‍💻 Admin', '📢 Telegram Kanal']
    ]).resize()
  );
});

bot.hears('🔍 Ish qidirish', (ctx) => {
    ctx.reply('Ҳурматли фойдаланувчи! Иш қидириш бўлими ҳозирда янгиланмоқда. Илтимос, админ билан боғланинг ёки телеграм каналимизга қўшилинг:', 
    Markup.inlineKeyboard([
        [Markup.button.url('👨‍💻 Админ', 'https://t.me/Karimov_ppp')],
        [Markup.button.url('📢 Телеграм канал', 'https://t.me/Job_Forge')]
    ])
    );
});

bot.hears('📢 E’lon berish', (ctx) => {
  ctx.reply('Вакансия жойлаштириш учун тарифни танланг:', 
    Markup.inlineKeyboard([
      [Markup.button.callback('Oddiy (2 hafta) - Bepul', 'tariff_oddiy')],
      [Markup.button.callback('Pro (1 hafta TOP) - 150k', 'tariff_pro')],
      [Markup.button.callback('Extra (1 oy) - 349k', 'tariff_extra')],
      [Markup.button.callback('24 soat REK - 50k', 'tariff_rek')]
    ])
  );
});

bot.hears('👨‍💻 Admin', (ctx) => ctx.reply('Админ билан боғланиш: @Karimov_ppp'));
bot.hears('📢 Telegram Kanal', (ctx) => ctx.reply('Бизнинг канал: https://t.me/Job_Forge'));

bot.action(/tariff_/, (ctx) => {
  ctx.answerCbQuery();
  ctx.reply('Раҳмат! Тез орада админ сиз билан боғланиб, эълонингизни жойлайди.');
  bot.telegram.sendMessage(ADMIN_ID, `Янги мижоз! \nUsername: @${ctx.from.username} \nТанлаган тарифи: ${ctx.match.input}`);
});

// Ботни ёқиш
bot.launch().then(() => {
    console.log('Бот Telegram-га уланди!');
});

// Render "Timed Out" бермаслиги учун сервер
http.createServer((req, res) => {
  res.write('Бот ишлаяпти!');
  res.end();
}).listen(process.env.PORT || 10000);