const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Mở cổng web để Render không tắt ứng dụng
app.get('/', (req, res) => res.send('Bot AFK 26.3 đang chạy ngon lành!'));
app.listen(process.env.PORT || 3000, () => console.log('Cổng Web đã mở.'));

function startBot() {
    const bot = mineflayer.createBot({
        host: 'IP_SERVER_CỦA_BẠN.aternos.me', // <-- Thay bằng IP server Aternos của bạn
        port: 12345,                           // <-- Thay bằng số Port của server
        username: 'BotAFK_Render',             
        version: '1.21'                        // Giữ giao thức tương thích cho 26.3
    });

    bot.on('login', () => console.log(`[BOT] Đã kết nối: ${bot.username}`));

    bot.on('spawn', () => {
        // Hành động nhỏ để chống cơ chế đá người chơi AFK
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('end', () => {
        console.log('[BOT] Mất kết nối, đang thử lại sau 15 giây...');
        setTimeout(startBot, 15000);
    });

    bot.on('error', (err) => console.log('[LỖI]: ', err));
}

startBot();
