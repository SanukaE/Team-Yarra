// Create floating particles
function createParticles() {
  const particleCount = 30;
  const body = document.body;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";
    body.appendChild(particle);
  }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(".member-card, .stat-card, .solution-card")
  .forEach((card) => {
    observer.observe(card);
  });

// Enhanced header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  const scrolled = window.pageYOffset;
  const opacity = Math.min(0.98, 0.85 + scrolled / 300);
  header.style.backgroundColor = `rgba(10, 22, 40, ${opacity})`;

  // Add shadow when scrolled
  if (scrolled > 100) {
    header.style.boxShadow = "0 5px 20px rgba(79, 195, 247, 0.1)";
  } else {
    header.style.boxShadow = "none";
  }
});

// Enhanced card hover effects
document
  .querySelectorAll(".member-card, .solution-card, .stat-card")
  .forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });

// Counter animation for stats
function animateCounter(element, target, duration = 2500) {
  let start = 0;
  const increment = target / (duration / 16);
  const isPercentage = element.textContent.includes("%");
  const isMillions = element.textContent.includes("M");

  function updateCounter() {
    start += increment;
    if (start < target) {
      if (isMillions) {
        element.textContent = (start / 1000000).toFixed(1) + "M+";
      } else if (target > 1000 && !isPercentage) {
        element.textContent = Math.floor(start / 1000) + "k+";
      } else if (isPercentage) {
        element.textContent = Math.floor(start) + "%";
      } else {
        element.textContent = Math.floor(start);
      }
      requestAnimationFrame(updateCounter);
    } else {
      if (isMillions) {
        element.textContent = (target / 1000000).toFixed(0) + "M+";
      } else if (isPercentage) {
        element.textContent = target + "%";
      } else {
        element.textContent = target;
      }
    }
  }
  updateCounter();
}

// Start animations when stats come into view
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const text = statNumber.textContent;

        if (text === "242") {
          animateCounter(statNumber, 242);
        } else if (text === "4M+") {
          animateCounter(statNumber, 4000000);
        } else if (text === "80%") {
          animateCounter(statNumber, 80);
        }

        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-card").forEach((card) => {
  statsObserver.observe(card);
});

// Enhanced typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  element.style.borderRight = "3px solid #4fc3f7";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.style.borderRight = "none";
      }, 1000);
    }
  }
  type();
}

// Parallax effect for hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroHeight = hero.offsetHeight;

  if (scrolled < heroHeight) {
    const speed = scrolled * 0.5;
    hero.style.transform = `translateY(${speed}px)`;
  }
});

// Initialize everything when page loads
window.addEventListener("load", () => {
  createParticles();

  // Start typing animation after a delay
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 120);
  }, 1500);

  // Add stagger animation to solution cards
  const solutionCards = document.querySelectorAll(".solution-card");
  solutionCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 200 + index * 200);
  });
});

// Add loading animation
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "1";
  }, 100);
});

document.addEventListener("keypress", (key) => {
  console.log(key);
  if (key.key === "Shift") {
    document.getElementById("footerText").textContent = "Someone hire me :)";
  }
});
