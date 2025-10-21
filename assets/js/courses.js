// assets/js/courses.js
(function(){
"use strict";

// داده نمونه (در فاز بعدی از API واکشی می‌شود)
const coursesData = [
{id:1, title:'مدیریت اضطراب برای مبتدیان', category:'اضطراب', level:'مقدماتی', hours:8, lessons:12, price:199000, discountPrice:299000, isFree:false, isDiscount:true, isNew:true, rating:4.8, reviews:156, instructor:{id:1,name:'دکتر مریم احمدی',avatar:'https://picsum.photos/seed/i1/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c1/600/380' },
{id:2, title:'تکنیک‌های تنفس برای آرامش', category:'استرس', level:'مقدماتی', hours:5, lessons:8, price:149000, discountPrice:null, isFree:false, isDiscount:false, isNew:false, rating:4.4, reviews:98, instructor:{id:2,name:'دکتر علی رضایی',avatar:'https://picsum.photos/seed/i2/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c2/600/380' },
{id:3, title:'سلامت روان در محیط کار', category:'محیط کار', level:'متوسط', hours:10, lessons:14, price:249000, discountPrice:null, isFree:false, isDiscount:false, isNew:false, rating:4.7, reviews:76, instructor:{id:3,name:'دکتر فاطمه حسینی',avatar:'https://picsum.photos/seed/i3/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c3/600/380' },
{id:4, title:'ذهن‌آگاهی (Mindfulness) کاربردی', category:'استرس', level:'متوسط', hours:7, lessons:10, price:0, discountPrice:null, isFree:true, isDiscount:false, isNew:true, rating:4.6, reviews:65, instructor:{id:1,name:'دکتر مریم احمدی',avatar:'https://picsum.photos/seed/i1/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c4/600/380' },
{id:5, title:'روانشناسی کودک: ارتباط موثر', category:'کودک', level:'مقدماتی', hours:6, lessons:9, price:189000, discountPrice:229000, isFree:false, isDiscount:true, isNew:false, rating:4.5, reviews:54, instructor:{id:2,name:'دکتر علی رضایی',avatar:'https://picsum.photos/seed/i2/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c5/600/380' },
{id:6, title:'زوج‌درمانی مقدماتی', category:'زوج درمانی', level:'مقدماتی', hours:9, lessons:13, price:279000, discountPrice:null, isFree:false, isDiscount:false, isNew:false, rating:4.3, reviews:40, instructor:{id:3,name:'دکتر فاطمه حسینی',avatar:'https://picsum.photos/seed/i3/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c6/600/380' },
{id:7, title:'تاب‌آوری پیشرفته', category:'اضطراب', level:'پیشرفته', hours:11, lessons:15, price:329000, discountPrice:null, isFree:false, isDiscount:false, isNew:true, rating:4.9, reviews:88, instructor:{id:1,name:'دکتر مریم احمدی',avatar:'https://picsum.photos/seed/i1/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c7/600/380' },
{id:8, title:'مدیریت استرس شغلی', category:'محیط کار', level:'متوسط', hours:8, lessons:12, price:249000, discountPrice:null, isFree:false, isDiscount:false, isNew:false, rating:4.6, reviews:120, instructor:{id:3,name:'دکتر فاطمه حسینی',avatar:'https://picsum.photos/seed/i3/60/60'}, preview:'https://www.youtube.com/embed/dQw4w9WgXcQ', thumb:'https://picsum.photos/seed/c8/600/380' }
];

// حالت‌ها
let state = {
search: '',
category: '',
level: '',
price: { free:false, paid:false, discount:false },
instructor: '',
sort: 'latest',
pageSize: 6, // تعداد نمایش اولیه
compare: [] // لیست مقایسه (تا 3 مورد)
};

// المان‌ها
const gridEl = document.getElementById('coursesGrid');
const shownCountEl = document.getElementById('shownCount');
const totalCountEl = document.getElementById('totalCount');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const compareBar = document.getElementById('compareBar');
const compareItemsEl = document.getElementById('compareItems');
const previewFrame = document.getElementById('previewFrame');

// فیلترها
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const filterCategory = document.getElementById('filterCategory');
const filterLevel = document.getElementById('filterLevel');
const priceFree = document.getElementById('priceFree');
const pricePaid = document.getElementById('pricePaid');
const priceDiscount = document.getElementById('priceDiscount');
const filterInstructor = document.getElementById('filterInstructor');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');

// رویدادها
searchInput.addEventListener('input', debounce(()=>{ state.search = searchInput.value.trim(); render(); }, 250));
searchBtn.addEventListener('click', ()=>{ state.search = searchInput.value.trim(); render(); });
sortSelect.addEventListener('change', ()=>{ state.sort = sortSelect.value; render(true); });

filterCategory.addEventListener('change', ()=>{ state.category = filterCategory.value; render(true); });
filterLevel.addEventListener('change', ()=>{ state.level = filterLevel.value; render(true); });
priceFree.addEventListener('change', ()=>{ state.price.free = priceFree.checked; render(true); });
pricePaid.addEventListener('change', ()=>{ state.price.paid = pricePaid.checked; render(true); });
priceDiscount.addEventListener('change', ()=>{ state.price.discount = priceDiscount.checked; render(true); });
filterInstructor.addEventListener('change',()=>{ state.instructor = filterInstructor.value; render(true); });
applyFiltersBtn.addEventListener('click', ()=> render(true));

loadMoreBtn.addEventListener('click', ()=>{
state.pageSize += 6;
render();
});

// رندر
function render(resetPage=false){
const filtered = filterData([...coursesData]);
totalCountEl.textContent = filtered.length.toString();

text

const sorted = sortData(filtered);
const sliced = sorted.slice(0, state.pageSize);

gridEl.innerHTML = '';
sliced.forEach((c,i)=> gridEl.insertAdjacentHTML('beforeend', courseCardHTML(c, i*80)));

shownCountEl.textContent = sliced.length.toString();
loadMoreBtn.style.display = filtered.length > state.pageSize ? 'inline-block' : 'none';

// آپدیت JSON-LD (ItemList برای سئو)
updateItemListSchema(sliced);

// بستن مودال پیش‌نمایش هنگام تغییر لیست
if (previewFrame) previewFrame.src = '';
updateCompareBar();
}

function filterData(list){
return list.filter(c=>{
// جستجو
if (state.search) {
const s = state.search;
if (!c.title.includes(s) && !c.category.includes(s)) return false;
}
// دسته
if (state.category && c.category !== state.category) return false;
// سطح
if (state.level && c.level !== state.level) return false;
// مدرس
if (state.instructor && String(c.instructor.id) !== state.instructor) return false;
// قیمت
const priceOk =
(!state.price.free || c.isFree) &&
(!state.price.paid || (!c.isFree)) &&
(!state.price.discount || c.isDiscount);
if (!priceOk) return false;

text

  return true;
});
}

function sortData(list){
switch(state.sort){
case 'popular': return list.sort((a,b)=> (b.ratingb.reviews) - (a.ratinga.reviews));
case 'cheap': return list.sort((a,b)=> (a.isFree?0:a.price) - (b.isFree?0:b.price));
case 'expensive': return list.sort((a,b)=> (b.isFree?0:b.price) - (a.isFree?0:a.price));
case 'latest':
default: return list; // نمونه استاتیک (در API می‌توانید createdAt را لحاظ کنید)
}
}

function courseCardHTML(c, delay=0){
const nf = new Intl.NumberFormat('fa-IR');
const priceHtml = c.isFree
? <span class="text-success fw-bold">رایگان</span>
: <span class="fw-bold">${nf.format(c.price)} تومان</span>${c.discountPrice?<span class="old">${nf.format(c.discountPrice)} تومان</span>:''};
const stars = renderStars(c.rating);

text

return `
  <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="${delay}">
    <div class="course-card h-100">
      <div class="position-relative">
        <img loading="lazy" src="${c.thumb}" class="w-100 course-image" alt="${c.title}">
        <div class="course-badges">
          ${c.isNew?`<span class="badge bg-info text-white badge-pill">جدید</span>`:''}
          ${c.isFree?`<span class="badge bg-success text-white badge-pill">رایگان</span>`:''}
          ${c.isDiscount?`<span class="badge bg-danger text-white badge-pill">تخفیف</span>`:''}
        </div>
        ${c.preview ? `<button class="btn btn-light btn-sm preview-btn" data-preview="${c.preview}"><i class="bi bi-play-circle me-1"></i>پیش‌نمایش</button>`:''}
      </div>
      <div class="p-3">
        <div class="instructor-mini mb-2">
          <img src="${c.instructor.avatar}" alt="${c.instructor.name}">
          <div>
            <div class="small text-muted">مدرس</div>
            <a href="psychologist-profile.html?id=${c.instructor.id}" class="text-decoration-none">${c.instructor.name}</a>
          </div>
        </div>
        <h6 class="mb-2">${c.title}</h6>
        <div class="d-flex justify-content-between small text-muted mb-2">
          <span>🧩 ${c.lessons} درس</span>
          <span>⏱ ${c.hours} ساعت</span>
          <span>🎚 ${c.level}</span>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="rating">${stars}<span class="small text-muted ms-1">(${c.reviews})</span></div>
          <div class="price">${priceHtml}</div>
        </div>
        <div class="d-flex justify-content-between">
          <a href="course-detail.html?id=${c.id}" class="btn btn-primary btn-sm">مشاهده دوره</a>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-secondary btn-sm wishlist-btn" data-id="${c.id}"><i class="bi bi-heart"></i></button>
            <button class="btn btn-outline-secondary btn-sm compare-btn" data-id="${c.id}"><i class="bi bi-sliders"></i> مقایسه</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderStars(rating){
const full = Math.floor(rating);
const half = rating - full >= 0.5;
let html = '';
for(let i=0;i<full;i++) html += '<i class="bi bi-star-fill"></i>';
if(half) html += '<i class="bi bi-star-half"></i>';
for(let i=full + (half?1:0); i<5; i++) html += '<i class="bi bi-star"></i>';
return html;
}

// پیش‌نمایش
document.addEventListener('click', (e)=>{
const btn = e.target.closest('.preview-btn');
if(btn){
const url = btn.getAttribute('data-preview');
const frame = document.getElementById('previewFrame');
if(frame){
frame.src = url;
new bootstrap.Modal(document.getElementById('previewModal')).show();
}
}

text

// علاقه‌مندی
const wish = e.target.closest('.wishlist-btn');
if(wish){
  wish.classList.toggle('active');
  const icon = wish.querySelector('i');
  if (wish.classList.contains('active')){
    icon.className='bi bi-heart-fill text-danger';
    toast('به علاقه‌مندی‌ها اضافه شد');
  } else {
    icon.className='bi bi-heart';
    toast('از علاقه‌مندی‌ها حذف شد');
  }
}

// مقایسه
const cmp = e.target.closest('.compare-btn');
if(cmp){
  const id = Number(cmp.getAttribute('data-id'));
  toggleCompare(id);
}
});

// مقایسه
function toggleCompare(id){
const index = state.compare.indexOf(id);
if(index>-1) state.compare.splice(index,1);
else{
if(state.compare.length>=3){ toast('حداکثر ۳ دوره قابل مقایسه است'); return; }
state.compare.push(id);
}
updateCompareBar();
}

function updateCompareBar(){
compareItemsEl.innerHTML='';
if(state.compare.length<2){ compareBar.style.display='none'; return; }
compareBar.style.display='block';
state.compare.forEach(id=>{
const c = coursesData.find(x=>x.id===id);
if(!c) return;
compareItemsEl.insertAdjacentHTML('beforeend', <div class="compare-item"> <img src="${c.thumb}" alt=""> <span class="small">${c.title}</span> <button class="btn btn-sm btn-link text-danger" onclick="removeFromCompare(${id})"><i class="bi bi-x-lg"></i></button> </div>);
});
}

// دسترسی سراسری برای حذف از مقایسه
window.removeFromCompare = function(id){
const i = state.compare.indexOf(id);
if(i>-1) state.compare.splice(i,1);
updateCompareBar();
};

document.getElementById('clearCompareBtn').addEventListener('click', ()=>{
state.compare = []; updateCompareBar();
});

document.getElementById('openCompareBtn').addEventListener('click', ()=>{
const ids = state.compare.slice(0,3);
const cols = [ '1','2','3' ];
// پاکسازی
cols.forEach(n=>{
document.getElementById(cmpTitle${n}).textContent='—';
document.getElementById(cmpInstructor${n}).textContent='—';
document.getElementById(cmpPrice${n}).textContent='—';
document.getElementById(cmpLevel${n}).textContent='—';
document.getElementById(cmpHours${n}).textContent='—';
document.getElementById(cmpRating${n}).textContent='—';
});
// پرکردن
const nf = new Intl.NumberFormat('fa-IR');
ids.forEach((id, idx)=>{
const c = coursesData.find(x=>x.id===id);
const n = idx+1;
document.getElementById(cmpTitle${n}).textContent = c.title;
document.getElementById(cmpInstructor${n}).textContent = c.instructor.name;
document.getElementById(cmpPrice${n}).textContent = c.isFree ? 'رایگان' : ${nf.format(c.price)} تومان;
document.getElementById(cmpLevel${n}).textContent = c.level;
document.getElementById(cmpHours${n}).textContent = ${c.hours} ساعت;
document.getElementById(cmpRating${n}).textContent = ${c.rating} (${c.reviews});
});
new bootstrap.Modal(document.getElementById('compareModal')).show();
});

// JSON-LD ItemList
function updateItemListSchema(list){
const json = {
"@context":"https://schema.org",
"@type":"ItemList",
"itemListElement": list.map((c,idx)=>({
"@type":"ListItem",
"position": idx+1,
"url": ${location.origin}${location.pathname.replace('courses.html','') }course-detail.html?id=${c.id},
"name": c.title
}))
};
let el = document.getElementById('coursesSchema');
if(!el){
el = document.createElement('script');
el.type='application/ld+json';
el.id='coursesSchema';
document.head.appendChild(el);
}
el.textContent = JSON.stringify(json);
}

// ابزارک‌ها
function toast(msg){
const t = document.createElement('div');
t.className='position-fixed bottom-0 end-0 m-3 p-3 rounded bg-dark text-white';
t.style.zIndex='9999';
t.textContent=msg;
document.body.appendChild(t);
setTimeout(()=> t.remove(), 2000);
}

function debounce(fn, wait){
let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,args), wait); };
}

// رندر اولیه
render(true);

// بستن مودال پیش‌نمایش و پاک کردن iframe
const previewModal = document.getElementById('previewModal');
previewModal?.addEventListener('hidden.bs.modal', ()=>{
if(previewFrame) previewFrame.src='';
});

})();