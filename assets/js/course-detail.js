<script>
    // Wishlist toggle for course
    let courseWish = false;
    function addToWishlistCourse(){
      courseWish = !courseWish;
      const el = document.getElementById('courseWishlistIcon');
      if(courseWish){
        el.className = 'bi bi-heart-fill text-danger';
        showToast('دوره به علاقه‌مندی‌ها اضافه شد');
      } else {
        el.className = 'bi bi-heart';
        showToast('دوره از علاقه‌مندی‌ها حذف شد');
      }
    }

    // Toggle wishlist icon (header)
    function toggleWishlist(){
      const w = document.getElementById('wishlistIcon');
      if(w.classList.contains('bi-heart')){
        w.className = 'bi bi-heart-fill text-danger';
        showToast('به علاقه‌مندی‌ها اضافه شد');
      } else {
        w.className = 'bi bi-heart';
        showToast('از علاقه‌مندی‌ها حذف شد');
      }
    }

    // Preview lesson
    function previewLesson(url){
      document.getElementById('previewFrame').src = url;
      var modal = new bootstrap.Modal(document.getElementById('previewModal'));
      modal.show();
    }

    // Simulate enroll (payment)
    function simulateEnroll(){
      // Close enroll modal
      var enrollModalEl = document.getElementById('enrollModal');
      var enrollModal = bootstrap.Modal.getInstance(enrollModalEl);
      enrollModal.hide();

      // Simulate processing...
      setTimeout(()=>{
        // Show success modal
        var successModal = new bootstrap.Modal(document.getElementById('enrollSuccessModal'));
        successModal.show();
      },800);
    }

    // Share handlers
    function share(platform){
      const url = window.location.href;
      const title = encodeURIComponent(document.querySelector('.course-title').textContent);
      switch(platform){
        case 'telegram':
          window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${title}`);
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${title}%20${encodeURIComponent(url)}`);
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
          break;
        case 'copy':
          navigator.clipboard.writeText(url).then(()=> showToast('لینک کپی شد'));
          break;
      }
      // hide share modal if visible
      document.querySelectorAll('.modal').forEach(m=>{
        try{ bootstrap.Modal.getInstance(m)?.hide(); }catch(e){}
      });
    }

    // Reviews: simple client-side append (in real app send to API)
    function submitReview(e){
      e.preventDefault();
      const rating = document.getElementById('reviewRating').value;
      const text = document.getElementById('reviewText').value.trim();
      if(!text){ alert('نظر نمی‌تواند خالی باشد'); return; }
      const container = document.getElementById('reviewsList');
      const now = new Date().toLocaleDateString('fa-IR');
      const html = `<div class="mb-3"><strong>کاربر جدید</strong> <span class="text-warning ms-2">${'⭐'.repeat(rating)}</span><div class="small text-muted">${now}</div><p class="mb-0">${text}</p></div>`;
      container.insertAdjacentHTML('afterbegin', html);
      document.getElementById('reviewForm').reset();
      showToast('نظر شما ارسال شد (پس از تأیید نمایش داده می‌شود)');
    }

    // Simple toast (alert)
    function showToast(msg){
      const toast = document.createElement('div');
      toast.className = 'position-fixed bottom-0 end-0 m-3 p-3 rounded bg-dark text-white';
      toast.style.zIndex = 9999;
      toast.textContent = msg;
      document.body.appendChild(toast);
      setTimeout(()=> toast.remove(),2000);
    }

    // Clear preview iframe on modal hide
    document.getElementById('previewModal')?.addEventListener('hidden.bs.modal', function(){
      document.getElementById('previewFrame').src = '';
    });

    // Accessibility: close modals with Escape etc handled by Bootstrap
  </script>