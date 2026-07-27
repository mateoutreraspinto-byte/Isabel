const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");

const hero = document.querySelector(".hero");
function updateHeader() {
  const heroEnd = hero.offsetTop + hero.offsetHeight - header.offsetHeight;
  header.classList.toggle("scrolled", scrollY > heroEnd);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", updateHeader);
menuButton.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", open);
});
mobileNav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }),
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -45px" },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const moments = [
  [
    "Morning",
    "Welcome & free play",
    "A personal hello, a quick family check-in and time to settle in with familiar toys and friends.",
    "assets/isabel-comfort.jpg",
    "A warm welcome and a familiar moment with Isabel",
  ],
  [
    "Morning",
    "A nourishing breakfast",
    "A balanced breakfast around the table, with simple Spanish words woven into conversation.",
    "assets/isabel-smiles.jpg",
    "Isabel sharing a caring moment during the daily routine",
  ],
  [
    "Mid-morning",
    "Learn through play",
    "Songs, stories, sensory activities, art and hands-on discovery in both English and Spanish.",
    "assets/nature-circle.jpg",
    "Children learning, observing and exploring together outdoors",
  ],
  [
    "Late morning",
    "Fresh air & movement",
    "A walk, a park visit or outdoor play whenever weather and conditions allow.",
    "assets/forest-friends.jpg",
    "Children enjoying fresh air, movement and friendship outdoors",
  ],
  [
    "Midday",
    "Lunch & peaceful rest",
    "A fresh, age-appropriate meal followed by a calm transition to naps or quiet activities.",
    "assets/isabel-baby.jpg",
    "A calm, attentive moment of care with Isabel and a baby",
  ],
  [
    "Afternoon",
    "Snack, connection & pick-up",
    "A nutritious snack, social play and a personal update for each family at the end of the day.",
    "assets/isabel-boy.jpg",
    "Isabel smiling with a child before saying see you tomorrow",
  ],
];
moments.forEach(([, , , source]) => {
  const image = new Image();
  image.src = source;
});
let dayIndex = 0;
const dayImage = document.querySelector(".day-image");
const dayCount = document.querySelector(".day-count");
const dayTime = document.querySelector(".day-time");
const dayTitle = document.querySelector(".day-card h3");
const dayDescription = document.querySelector(".day-description");
const dayTabs = [...document.querySelectorAll(".day-tabs button")];
function showMoment(index) {
  dayIndex = (index + moments.length) % moments.length;
  const [time, title, description, image, imageAlt] = moments[dayIndex];
  dayImage.classList.add("changing");
  const incomingImage = new Image();
  incomingImage.onload = () => {
    dayCount.textContent = `${String(dayIndex + 1).padStart(2, "0")} / 06`;
    dayTime.textContent = time;
    dayTitle.textContent = title;
    dayDescription.textContent = description;
    dayImage.src = incomingImage.src;
    dayImage.alt = imageAlt;
    requestAnimationFrame(() => dayImage.classList.remove("changing"));
  };
  incomingImage.src = image;
  dayTabs.forEach((tab, i) => tab.classList.toggle("active", i === dayIndex));
}
document
  .querySelector(".day-prev")
  .addEventListener("click", () => showMoment(dayIndex - 1));
document
  .querySelector(".day-next")
  .addEventListener("click", () => showMoment(dayIndex + 1));
dayTabs.forEach((tab, i) => tab.addEventListener("click", () => showMoment(i)));

let reviewIndex = 0;
const reviews = [...document.querySelectorAll(".review")];
const reviewNumber = document.querySelector(".review-controls span b");
function showReview(index) {
  reviewIndex = (index + reviews.length) % reviews.length;
  reviews.forEach((review, i) =>
    review.classList.toggle("active", i === reviewIndex),
  );
  reviewNumber.textContent = reviewIndex + 1;
}
document
  .querySelector(".review-prev")
  .addEventListener("click", () => showReview(reviewIndex - 1));
document
  .querySelector(".review-next")
  .addEventListener("click", () => showReview(reviewIndex + 1));

const parallaxSections = [...document.querySelectorAll(".parallax-section")];
let parallaxQueued = false;
function updateParallax() {
  const viewportCenter = innerHeight / 2;
  parallaxSections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const sectionCenter = rect.top + rect.height / 2;
    const offset = Math.max(
      -90,
      Math.min(90, (viewportCenter - sectionCenter) * 0.12),
    );
    section.style.setProperty("--parallax-y", `${offset}px`);
  });
  parallaxQueued = false;
}
window.addEventListener(
  "scroll",
  () => {
    if (!parallaxQueued) {
      requestAnimationFrame(updateParallax);
      parallaxQueued = true;
    }
  },
  { passive: true },
);
window.addEventListener("resize", updateParallax);
updateParallax();
