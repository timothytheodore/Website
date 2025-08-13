// Slideshow Logic
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}


setInterval(nextSlide, 5000);


showSlide(currentSlide);


window.addEventListener("load", function() {
  document.getElementById("loading").classList.add("hide");
  setTimeout(function() {
    document.getElementById("loading").style.display = "none";
  }, 500);
});


const timelineTrack = document.getElementById('timelineTrack');
const timelineNext = document.getElementById('timelineNext');

let currentIndex = 0;
const eventNodes = Array.from(timelineTrack.children);
const eventCount = eventNodes.length;

// Duplicate all events to the end for seamless loop
eventNodes.forEach(node => {
  const clone = node.cloneNode(true);
  timelineTrack.appendChild(clone);
});

function getEventWidth() {
  if (eventNodes.length === 0) return 0;
  const style = getComputedStyle(timelineTrack);
  const gap = parseInt(style.gap) || 48;
  return eventNodes[0].offsetWidth + gap;
}

timelineNext.addEventListener('click', () => {
  currentIndex++;
  const eventWidth = getEventWidth();

  // Animate to next slide
  timelineTrack.style.transition = "transform 0.7s cubic-bezier(.68,-0.55,.27,1.55)";
  timelineTrack.style.transform = `translateX(-${eventWidth * currentIndex}px)`;

  // Instantly reset to start after transition completes, for seamless loop
  if (currentIndex === eventCount) {
    timelineTrack.addEventListener('transitionend', onTransitionEnd);
  }
});

function onTransitionEnd() {
  timelineTrack.style.transition = "none";
  timelineTrack.style.transform = `translateX(0px)`;
  currentIndex = 0;
  // Remove the event listener so it doesn't trigger on every transition
  timelineTrack.removeEventListener('transitionend', onTransitionEnd);
}

// Responsive fix
window.addEventListener('resize', () => {
  const eventWidth = getEventWidth();
  timelineTrack.style.transition = "none";
  timelineTrack.style.transform = `translateX(-${eventWidth * currentIndex}px)`;
});