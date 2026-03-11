const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Ganti 'TOKEN_BOT_KAMU' dengan token asli dari BotFather
const token = 'TOKEN_BOT_KAMU';
const bot = new TelegramBot(token, {polling: true});

// Agar Render tidak menganggap bot mati, kita buat server kecil
http.createServer((req, res) => {
  res.write('Bot Kuda Api sedang berjalan!');
  res.end();
}).listen(process.env.PORT || 3000);

// Respon saat user mengetik /start
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `Halo ${msg.from.first_name}! 🐎\n\nSelamat datang di Kuda Api Ecosystem. Klik tombol di pojok kiri bawah untuk klaim token gratis kamu!`);
});

// Respon saat user klaim dari Mini App
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = msg.web_app_data.data;

  if (data === 'klaim_dari_app') {
    bot.sendMessage(chatId, "✅ Selamat! 1.000 Token Kuda Api berhasil diklaim ke saldo kamu!");
  }
});

console.log("Bot sedang berjalan...");