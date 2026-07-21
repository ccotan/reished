// Часы МСК
function updateClock() {
    const now = new Date();
    const msk = new Date(now.getTime() + (now.getTimezoneOffset() + 180) * 60000);
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.textContent = msk.toLocaleTimeString('ru-RU') + ' МСК';
    }
}
setInterval(updateClock, 1000);
updateClock();

// Загрузка статистики
async function loadStats() {
    const onlineEl = document.getElementById('statOnline');
    const totalEl = document.getElementById('statTotal');
    if (!onlineEl || !totalEl) return;

    try {
        // Демо-данные (позже заменится на API)
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

// Копирование IP
function copyIP() {
    navigator.clipboard.writeText('reished.my-craft.cc').then(() => {
        showToast('success', 'IP скопирован', 'reished.my-craft.cc');
    });
}

// Toast уведомления
function showToast(type, title, msg) {
    const container = document.getElementById('toastContainer') || createToastContainer();
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    
    const icon = type === 'success'
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    
    el.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-body">
            <div class="toast-title">${title}</div>
            ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
        </div>
    `;
    
    container.appendChild(el);
    setTimeout(() => {
        el.classList.add('out');
        setTimeout(() => el.remove(), 400);
    }, 4000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
    return container;
}

// Проверка авторизации
const user = JSON.parse(localStorage.getItem('reished_user') || 'null');
const authBtn = document.getElementById('authBtn');
if (user && authBtn) {
    authBtn.textContent = user.username;
    authBtn.href = 'profile.html';
}