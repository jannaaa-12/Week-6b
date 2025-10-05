// subtle scroll fade-in animation
const captions = document.querySelectorAll(".caption");

window.addEventListener("scroll", () => {
  captions.forEach(caption => {
    const rect = caption.getBoundingClientRect();
    const visible = rect.top < window.innerHeight - 100;
    caption.style.opacity = visible ? "1" : "0";
    caption.style.transition = "opacity 1s ease";
  });
});