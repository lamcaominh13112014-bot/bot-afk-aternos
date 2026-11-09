const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Bot AFK 26.3 Wilderness Bound đang chạy ổn định!'));
app.listen(process.env.PORT || 3000, () => console.log('Cổng Web đã mở.'));

function startBot() {
    const bot = mineflayer.createBot({
        host: 'IP_SERVER_CỦA_BẠN.aternos.me', // <-- Hãy thay bằng IP Aternos của bạn
        port: 12345,                           // <-- Hãy thay bằng số Port của server
        username: 'BotAFK_Render',             
        version: '1.21',
        hideErrors: true                      // Ẩn các cảnh báo đọc lỗi gói tin không cần thiết
    });

    bot.on('login', () => console.log(`[BOT] Đã kết nối thành công: ${bot.username}`));

    bot.on('spawn', () => {
        // Tự động nhảy để chống bị kick do AFK
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('[BOT] Mất kết nối, đang kết nối lại sau 15 giây...');
        setTimeout(startBot, 15000);
    });

    bot.on('error', (err) => {
        // Bỏ qua lỗi PartialRead do không ảnh hưởng đến việc giữ server online
        if (!err.message.includes('PartialReadError')) {
            console.log('[LỖI]: ', err);
        }
    });
}

startBot();
