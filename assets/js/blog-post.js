// ========================================
// Blog Post Page Scripts
// ========================================

// تشخیص اینکه این پست از بلاگ اصلی است یا بلاگ مشاور
function detectBlogType() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const psychologistId = urlParams.get('psychologist');

    console.log('Post ID:', postId);
    console.log('Psychologist ID:', psychologistId);

    if (psychologistId) {
        // این پست از بلاگ شخصی مشاور است
        loadPsychologistPost(postId, psychologistId);
    } else {
        // این پست از بلاگ اصلی است
        loadMainBlogPost(postId);
    }
}

// بارگذاری پست از بلاگ اصلی
function loadMainBlogPost(postId) {
    console.log('Loading main blog post:', postId);
    // در اینجا در آینده API call می‌زنیم
    // فعلاً محتوا به صورت استاتیک نمایش داده می‌شود
}

// بارگذاری پست از بلاگ مشاور
function loadPsychologistPost(postId, psychologistId) {
    console.log('Loading psychologist post:', postId, 'by psychologist:', psychologistId);
    
    // تغییر سایدبار به اطلاعات مشاور
    updateSidebarForPsychologist(psychologistId);
}

// به‌روزرسانی سایدبار برای بلاگ مشاور
function updateSidebarForPsychologist(psychologistId) {
    const authorCard = document.querySelector('.author-card');
    
    // داده‌های نمونه مشاوران
    const psychologists = {
        '1': {
            name: 'دکتر مریم احمدی',
            specialty: 'روانشناس بالینی',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            bio: 'روانشناس بالینی با بیش از ۱۰ سال تجربه در درمان اضطراب، افسردگی و اختلالات خلقی.',
            profileUrl: 'psychologist-profile.html?id=1',
            bookingUrl: 'booking.html?psychologist=1'
        },
        '2': {
            name: 'دکتر علی رضایی',
            specialty: 'روانشناس کودک',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
            bio: 'روانشناس کودک با تخصص در اختلالات رفتاری و یادگیری کودکان.',
            profileUrl: 'psychologist-profile.html?id=2',
            bookingUrl: 'booking.html?psychologist=2'
        }
    };

    const psychologist = psychologists[psychologistId];

    if (psychologist) {
        // به‌روزرسانی کارت نویسنده
        authorCard.innerHTML = `
            <img src="${psychologist.avatar}" 
                 class="author-avatar-large mx-auto" alt="${psychologist.name}">
            <h5>${psychologist.name}</h5>
            <p class="text-muted small">${psychologist.specialty}</p>
            <p class="text-muted small">${psychologist.bio}</p>
            <a href="${psychologist.profileUrl}" class="btn btn-outline-primary w-100 mb-2">
                <i class="bi bi-person me-1"></i>مشاهده پروفایل
            </a>
            <a href="${psychologist.bookingUrl}" class="btn btn-primary w-100">
                <i class="bi bi-calendar-check me-1"></i>رزرو وقت
            </a>
        `;

        // به‌روزرسانی Breadcrumb
        const breadcrumb = document.querySelector('.breadcrumb');
        breadcrumb.innerHTML = `
            <li class="breadcrumb-item">
                <a href="index.html"><i class="bi bi-house-door me-1"></i>خانه</a>
            </li>
            <li class="breadcrumb-item">
                <a href="psychologists.html">مشاوران</a>
            </li>
            <li class="breadcrumb-item">
                <a href="${psychologist.profileUrl}">${psychologist.name}</a>
            </li>
            <li class="breadcrumb-item">
                <a href="blog.html?psychologist=${psychologistId}">وبلاگ</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">چگونه با اضطراب کنار بیاییم؟</li>
        `;

        // به‌روزرسانی اطلاعات نویسنده در Hero
        const authorInfo = document.querySelector('.post-author-info');
        authorInfo.innerHTML = `
            <img src="${psychologist.avatar}" class="post-author-avatar">
            <div>
                <strong><a href="${psychologist.profileUrl}" class="text-dark">${psychologist.name}</a></strong>
                <div class="small text-muted">${psychologist.specialty}</div>
            </div>
        `;
    }
}

// Like functionality
let isLiked = false;
function toggleLike() {
    const icon = document.getElementById('likeIcon');
    const text = document.getElementById('likeText');
    const count = document.getElementById('likeCount');
    
    if (isLiked) {
        icon.className = 'bi bi-heart';
        text.textContent = 'لایک';
        count.textContent = '۸۹';
        isLiked = false;
    } else {
        icon.className = 'bi bi-heart-fill text-danger';
        text.textContent = 'لایک شده';
        count.textContent = '۹۰';
        isLiked = true;
    }
}

// Save functionality
let isSaved = false;
function toggleSave() {
    const icon = document.getElementById('saveIcon');
    const text = document.getElementById('saveText');
    
    if (isSaved) {
        icon.className = 'bi bi-bookmark';
        text.textContent = 'ذخیره';
        isSaved = false;
    } else {
        icon.className = 'bi bi-bookmark-fill text-primary';
        text.textContent = 'ذخیره شده';
        isSaved = true;
    }
}

// Share functionality
function share(platform) {
    const url = window.location.href;
    const title = 'چگونه با اضطراب کنار بیاییم؟';
    const text = 'مقاله مفیدی در مورد کاهش اضطراب';

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
                alert('لینک کپی شد!');
            });
            break;
    }
}

// اجرای تابع هنگام بارگذاری صفحه
document.addEventListener('DOMContentLoaded', function() {
    detectBlogType();
});