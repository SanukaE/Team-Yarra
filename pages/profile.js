// Smooth scroll for any internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Header scroll effect
let lastScrollY = window.pageYOffset;
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const scrolled = window.pageYOffset;

  header.style.backgroundColor = `rgba(10, 22, 40, ${Math.min(
    0.98,
    0.85 + scrolled / 300
  )})`;

  if (scrolled > 100) {
    header.style.boxShadow = "0 5px 20px rgba(79, 195, 247, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".experience-card, .skill-category, .contact-card")
  .forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });
