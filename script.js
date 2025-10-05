// --- Robust loader: detect first existing extension for each base name
const exts = ['.png','.PNG','.jpg','.JPG','.jpeg','.JPEG','.webp','.WEBP'];

function setImageSource(imgEl){
  const base = imgEl.dataset.base;
  if(!base) return;

  let i = 0;
  function tryNext(){
    if(i >= exts.length){
      console.warn(`Image not found for base "${base}" in /media`);
      return;
    }
    const url = `media/${base}${exts[i++]}`;
    const probe = new Image();
    probe.onload = () => {
      imgEl.src = url;
      imgEl.addEventListener('load', ()=> imgEl.classList.add('loaded'), {once:true});
    };
    probe.onerror = tryNext;
    probe.src = url;
  }
  tryNext();
}

window.addEventListener('DOMContentLoaded', () => {
  // Load images
  document.querySelectorAll('.bg[data-base]').forEach(setImageSource);

  // Fade-in captions when scenes are visible
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelector('.caption')?.classList.add('fade-in');
      }
    });
  }, {threshold:0.18});
  document.querySelectorAll('.scene').forEach(sc=>io.observe(sc));
});

// Simple parallax: move each scene's image slightly on scroll
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.scene').forEach((scene, idx) => {
    const img = scene.querySelector('.bg');
    if(!img) return;
    const speed = [0.35, 0.45, 0.4, 0.35, 0.3][idx] || 0.35;
    img.style.transform = `translateY(${scrollY * speed * 0.2}px)`;
  });
});
