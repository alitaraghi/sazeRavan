// ========================================
// Main JavaScript - مشترک بین تمام صفحات
// ========================================

// تابع کمکی برای گرفتن پارامترهای URL
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// تابع اشتراک‌گذاری عمومی
function shareContent(platform, url, title) {
    switch(platform) {
        case 'telegram':
            window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`);
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`);
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
            break;
        case 'copy':
            navigator.clipboard.writeText(url).then(() => {
                showNotification('لینک کپی شد!', 'success');
            });
            break;
    }
}

// تابع نمایش اعلان
function showNotification(message, type = 'info') {
    // می‌توانید از Toast یا Alert استفاده کنید
    alert(message);
}

// تابع اعتبارسنجی ایمیل
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

console.log('Main.js loaded successfully');