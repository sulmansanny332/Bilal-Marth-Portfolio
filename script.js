document.documentElement.classList.add("js");
document.querySelectorAll(".world-card img").forEach((img) => {
  const hideUnavailableImage = () => {
    img.style.display = "none";
  };
  img.addEventListener("error", hideUnavailableImage);
  if (img.complete && img.naturalWidth === 0) hideUnavailableImage();
});
// Animate content in small groups so the biography remains easy to scan.
document.querySelector('.contact')?.classList.remove('reveal');
document.querySelectorAll('.section-heading, .bio-intro, .subheading, .bio-story, .source-note, .contact > *, footer > *').forEach(el => el.classList.add('reveal'));
document.querySelectorAll('.profile-grid, .biography-articles, .world-grid').forEach(group => {
  Array.from(group.children).forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--reveal-delay', `${(index % 3) * 85}ms`);
  });
});
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  navigation.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
}
menu.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
const progress = document.querySelector(".page-progress");
let ticking = false;
function updateScroll() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${total > 0 ? (scrollY / total) * 100 : 0}%`;
  navigation.querySelectorAll("a").forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    const rect = section.getBoundingClientRect();
    link.classList.toggle("active", rect.top <= 180 && rect.bottom > 180);
  });
  ticking = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(updateScroll);
      ticking = true;
    }
  },
  { passive: true },
);
updateScroll();
document.querySelector("#year").textContent = new Date().getFullYear();

const stories = {
  everyday: {
    label: "01 / LIFESTYLE",
    title: "Life, unfiltered.",
    text: "A beautiful view. An unexpected laugh. A moment shared with people who matter. This chapter is about finding something meaningful in ordinary days — and sharing that feeling through personal, engaging content.",
  },
  culture: {
    label: "02 / CULTURE",
    title: "Always, Pakistan.",
    text: "Home is more than a place. It is the warmth of our people, the richness of our traditions, and the celebrations that bring us together. Pakistan is at the heart of Bilal’s story, shaping the perspective he brings to his creative journey.",
  },
  creation: {
    label: "03 / TRAVEL",
    title: "A world to explore.",
    text: "A change of scenery brings a fresh perspective. This visual chapter brings together travel, curiosity, and moments away from the everyday — another side of the portfolio.",
  },
};
const storyDialog = document.querySelector("#story-dialog");
document.querySelectorAll("[data-story]").forEach((card) =>
  card.addEventListener("click", () => {
    const story = stories[card.dataset.story];
    document.querySelector("#story-label").textContent = story.label;
    document.querySelector("#story-title").textContent = story.title;
    document.querySelector("#story-text").textContent = story.text;
    storyDialog.setAttribute("aria-labelledby", "story-title");
    storyDialog.showModal();
  }),
);
document
  .querySelector("#story-contact")
  .addEventListener("click", () => storyDialog.close());
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector(".close-dialog")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
});
const motionToggle = document.querySelector('.motion-toggle');
function setMotionPaused(paused) {
  document.body.classList.toggle('motion-paused', paused);
  motionToggle?.setAttribute('aria-pressed', String(paused));
  if (motionToggle) motionToggle.textContent = paused ? '▶ Play animations' : 'Ⅱ Pause animations';
  if (paused) reveals.forEach(el => el.classList.add('visible'));
  try { localStorage.setItem('bilal-motion-paused', String(paused)); } catch { /* Storage is optional. */ }
}
try { setMotionPaused(localStorage.getItem('bilal-motion-paused') === 'true'); } catch { setMotionPaused(false); }
motionToggle?.addEventListener('click', () => {
  setMotionPaused(!document.body.classList.contains('motion-paused'));
});

// A fixed decorative layer keeps gold sparkles visible across every section.
const starField = document.createElement('div');
starField.className = 'gold-star-field';
starField.setAttribute('aria-hidden', 'true');
starField.setAttribute('inert', '');
const stars = document.createDocumentFragment();
for (let index = 0; index < 24; index++) {
  const star = document.createElement('span');
  star.className = 'gold-star';
  // Spread stars deterministically, with the larger accents along page edges.
  const edgeStar = index % 3 !== 0;
  const x = edgeStar ? (index % 2 ? 2 + (index * 7 % 13) : 85 + (index * 3 % 13)) : 18 + (index * 17 % 64);
  star.style.setProperty('--star-x', `${x}%`);
  star.style.setProperty('--star-y', `${(index * 29 + 7) % 100}%`);
  star.style.setProperty('--star-size', `${edgeStar ? 9 + index % 10 : 5 + index % 5}px`);
  star.style.setProperty('--star-duration', `${14 + index % 11}s`);
  star.style.setProperty('--star-delay', `${-index * 1.7}s`);
  star.style.setProperty('--twinkle-duration', `${2.8 + index % 5 * .6}s`);
  star.style.setProperty('--star-drift', `${index % 2 ? 20 : -20}px`);
  const sparkle = document.createElement('span');
  sparkle.className = 'gold-star-sparkle';
  star.appendChild(sparkle);
  stars.appendChild(star);
}
starField.appendChild(stars);
document.body.appendChild(starField);
document.addEventListener('visibilitychange', () => {
  starField.classList.toggle('stars-idle', document.hidden);
});

// Upright logos and their accompanying gold sparkles float as one motif.
const logoField = document.createElement('div');
logoField.className = 'background-logo-field';
logoField.setAttribute('aria-hidden', 'true');
logoField.setAttribute('inert', '');
const logoFragment = document.createDocumentFragment();
for (let index = 0; index < 6; index++) {
  const logo = document.createElement('span');
  logo.className = 'background-logo';
  // Separate slots and bounded travel keep logos apart throughout the animation.
  logo.style.setProperty('--logo-x', `${8 + (index % 3) * 36}%`);
  logo.style.setProperty('--logo-y', `${18 + Math.floor(index / 3) * 48}%`);
  logo.style.setProperty('--logo-size', `${64 + Math.random() * 18}px`);
  logo.style.setProperty('--logo-opacity', `${.18 + Math.random() * .06}`);
  logo.style.setProperty('--logo-duration', `${28 + Math.random() * 22}s`);
  logo.style.setProperty('--logo-delay', `${-Math.random() * 60}s`);
  logo.style.setProperty('--logo-dx', `${index % 2 ? 10 : -10}px`);
  logo.style.setProperty('--logo-dy', '-16px');
  const mark = document.createElement('img');
  mark.className = 'background-logo-mark';
  mark.src = 'assets/bilal-marth-logo-hd.png';
  mark.alt = '';
  mark.decoding = 'async';
  logo.appendChild(mark);
  for (let sparkleIndex = 0; sparkleIndex < 3; sparkleIndex++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'gold-star-sparkle logo-companion-star';
    sparkle.style.setProperty('--twinkle-duration', `${3 + sparkleIndex * .8}s`);
    sparkle.style.setProperty('--star-delay', `${-index - sparkleIndex * 1.4}s`);
    logo.appendChild(sparkle);
  }
  logoFragment.appendChild(logo);
}
logoField.appendChild(logoFragment);
document.body.appendChild(logoField);
function updateLogoVisibility() {
  logoField.classList.toggle('logos-idle', document.hidden);
}
document.addEventListener('visibilitychange', updateLogoVisibility);
updateLogoVisibility();
