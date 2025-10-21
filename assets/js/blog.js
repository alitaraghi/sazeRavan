/* -------------------------------------------------
   Blog Smart Switching (Main vs Psychologist Blog)
 ------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  // --- شبیه‌ساز دیتابیس کوچک
  const psychologists = {
    1: {
      name: 'دکتر مریم احمدی',
      specialty: 'روانشناس بالینی',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0&auto=format&fit=crop&w=120&q=80',
      bio: 'روانشناس بالینی با 10+ سال تجربه.',
      profile: 'psychologist-profile.html?id=1',
      booking: 'booking.html?psychologist=1'
    }
  };

  // --- دریافت پارامترها
  const params           = new URLSearchParams(location.search);
  const psychologistId   = params.get('psychologist');        // null یا عدد
  const isPsychBlog      = Boolean(psychologistId);

  // --- رندر هدر HERO
  const heroBox = document.getElementById('heroBox');
  heroBox.innerHTML = isPsychBlog
    ? `<img src="${psychologists[psychologistId].avatar}" class="blog-avatar mb-3" alt="">
       <h1 class="fw-bold mb-2">وبلاگ ${psychologists[psychologistId].name}</h1>
       <p class="lead text-muted">مطالب تخصصی ${psychologists[psychologistId].specialty}</p>`
    : `<img src="https://via.placeholder.com/100" class="blog-avatar mb-3" alt="">
       <h1 class="fw-bold mb-2">وبلاگ تخصصی PsyClinic</h1>
       <p class="lead text-muted">مقالات، ویدیوها و پادکست‌های سلامت روان</p>`;

  /* --------  رندر پست‌ها  (نمونه استاتیک) ---------- */
  const postsSample = [
     {id:101,title:'چگونه با اضطراب کنار بیاییم؟',type:'article',img:'https://picsum.photos/500/300?1',tags:['اضطراب','CBT'],author:'main',date:'3 روز پیش',views:124,comments:8},
     {id:102,title:'تکنیک‌های تنفس برای آرامش', type:'video',  img:'https://picsum.photos/500/300?2',tags:['آرامش'],author:'main',date:'1 هفته پیش',views:88 ,comments:5},
  ];
  const postsContainer=document.getElementById('postsContainer');
  postsSample.forEach(p=>{
     // فیلتر اگر psychBlog باشد و نویسنده≠این مشاور → skip
     if(isPsychBlog && p.author!=='main') return;
     postsContainer.insertAdjacentHTML('beforeend',`
       <div class="col-md-6" data-aos="fade-up">
          <a href="blog-post.html?id=${p.id}${isPsychBlog?`&psychologist=${psychologistId}`:''}" class="text-decoration-none text-dark">
            <div class="post-card">
              <div class="post-img">
                 <img src="${p.img}" class="w-100 h-100" alt="">
                 <div class="post-type">${p.type==='video'?'<i class="bi bi-play-fill text-white"></i>':'<i class="bi bi-file-earmark-text text-white"></i>'}</div>
              </div>
              <div class="post-body">
                 <h5 class="fw-bold">${p.title}</h5>
                 <div class="d-flex justify-content-between small text-muted mb-2"><span>${p.date}</span><span><i class="bi bi-eye"></i> ${p.views}</span></div>
                 ${p.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}
              </div>
            </div>
          </a>
       </div>`);
  });

  /* --------  سایدبار  ---------- */
  const sidebar=document.getElementById('sidebarBox');
  if(isPsychBlog){
     const p=psychologists[psychologistId];
     sidebar.innerHTML=
      `<div class="card mb-4 text-center">
         <div class="card-body">
           <img src="${p.avatar}" class="rounded-circle mb-3" width="110" height="110">
           <h5>${p.name}</h5><p class="small text-muted">${p.specialty}</p>
           <p class="small">${p.bio}</p>
           <a class="btn btn-outline-primary w-100 mb-2" href="${p.profile}">پروفایل کامل</a>
           <a class="btn btn-primary w-100" href="${p.booking}"><i class="bi bi-calendar-check me-1"></i>رزرو وقت</a>
         </div>
       </div>`;
  }else{
     sidebar.innerHTML=
      `<div class="card mb-4">
         <div class="card-body">
           <h5 class="card-title">درباره وبلاگ</h5>
           <p class="small text-muted">وبلاگ PsyClinic مرجع محتوای سلامت روان است.</p>
         </div>
       </div>`;
  }

});