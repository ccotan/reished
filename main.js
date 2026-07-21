// 1. Управление темой
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
html.setAttribute('data-theme', savedTheme);

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// 2. Часы МСК
function updateClock() {
    const now = new Date();
    const msk = new Date(now.getTime() + (now.getTimezoneOffset() + 180) * 60000);
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = msk.toLocaleTimeString('ru-RU') + ' МСК';
}
setInterval(updateClock, 1000);
updateClock();

// 3. Загрузка статистики (Сейчас демо-данные, позже заменится на реальный fetch)
async function loadStats() {
    const onlineEl = document.getElementById('statOnline');
    const totalEl = document.getElementById('statTotal');
    if (!onlineEl || !totalEl) return;

    try {
        // ПОЗЖЕ ЗДЕСЬ БУДЕТ: const res = await fetch('/api/stats'); const data = await res.json();
        // А пока используем реалистичные демо-данные, чтобы сайт не выглядел пустым
        const data = { online: 12, total: 145 }; 
        
        animateValue(onlineEl, 0, data.online, 1000);
        animateValue(totalEl, 0, data.total, 1500);
    } catch (error) {
        console.error("Ошибка загрузки статистики:", error);
    }
}

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

if (document.getElementById('statOnline')) {
    loadStats();
}

// 4. Копирование IP
function copyIP() {
    navigator.clipboard.writeText('reished.my-craft.cc').then(() => {
        alert('IP скопирован: reished.my-craft.cc');
    });
}

// 5. Проверка авторизации
const user = JSON.parse(localStorage.getItem('reished_user'));
const authBtn = document.getElementById('authBtn');
if (user && authBtn) {
    authBtn.textContent = user.username;
    authBtn.href = '/profile.html';
}