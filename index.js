const TelegramBot = require('node-telegram-bot-api');
const http = require('http');

// Token bot kamu yang sudah dimasukkan langsung
const token = '8378541521:AAH1oMRp6qtoMwRAu90i3l3Ouq1KaXJaup0';

// Inisialisasi Bot
const bot = new TelegramBot(token, {polling: true});

// Server kecil agar Render tetap mendeteksi aplikasi berjalan
http.createServer((req, res) => {
  res.write('Bot Kuda Api Ecosystem sedang berjalan!');
  res.end();
}).listen(process.env.PORT || 3000);

// Respon saat user pertama kali chat /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  bot.sendMessage(chatId, `Halo ${firstName}! 🐎\n\nSelamat datang di Kuda Api Ecosystem.\n\nKlik tombol di pojok kiri bawah untuk masuk ke Mini App dan klaim token gratis kamu!`);
});

// Respon jika ada data yang dikirim dari Mini App
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = msg.web_app_data.data;

  // Jika data yang dikirim adalah klaim
  if (data === 'klaim_dari_app') {
    bot.sendMessage(chatId, "✅ Selamat! Klaim kamu berhasil. 1.000 Token Kuda Api telah ditambahkan ke antrean saldo kamu!");
  }
});

console.log("Bot Kuda Api sudah aktif...");