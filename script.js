// Enhanced Navigation System
class NavigationManager {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-link");
    this.indicator = document.querySelector(".nav-indicator");
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.nav = document.querySelector(".nav");

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupIndicator();
  }

  setupNavigation() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveLink(link);

        // Close mobile menu if open
        if (this.nav.classList.contains("active")) {
          this.toggleMobileMenu();
        }
      });

      // Enhanced hover effects
      link.addEventListener("mouseenter", () => {
        link.style.transform = "translateY(-2px) scale(1.05)";
      });

      link.addEventListener("mouseleave", () => {
        if (!link.classList.contains("active")) {
          link.style.transform = "translateY(0) scale(1)";
        }
      });
    });
  }

  setupMobileMenu() {
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuBtn.classList.toggle("active");
    this.nav.classList.toggle("active");

    // Add stagger animation to mobile menu items
    if (this.nav.classList.contains("active")) {
      this.navLinks.forEach((link, index) => {
        link.style.animationDelay = `${0.1 + index * 0.1}s`;
      });
    }
  }

  setupIndicator() {
    // Set initial indicator position
    const activeLink =
      document.querySelector(".nav-link.active") || this.navLinks[0];
    this.updateIndicator(activeLink);
  }

  setActiveLink(activeLink) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      link.style.transform = "translateY(0) scale(1)";
    });

    activeLink.classList.add("active");
    activeLink.style.transform = "translateY(-2px) scale(1.05)";
    this.updateIndicator(activeLink);
  }

  updateIndicator(activeLink) {
    if (this.indicator && activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const navRect = activeLink.closest(".nav").getBoundingClientRect();

      this.indicator.style.left = linkRect.left - navRect.left + "px";
      this.indicator.style.width = linkRect.width + "px";
    }
  }
}

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

// Enhanced Header Effects
class HeaderEffects {
  constructor() {
    this.header = document.querySelector(".header");
    this.logo = document.querySelector(".logo");
    this.logoImg = document.querySelector(".logo-img");

    this.setupScrollEffects();
    this.setupLogoAnimations();
  }

  setupScrollEffects() {
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateHeader = () => {
      const scrolled = window.pageYOffset;
      const opacity = Math.min(0.98, 0.85 + scrolled / 300);

      this.header.style.backgroundColor = `rgba(10, 22, 40, ${opacity})`;

      // Add/remove shadow and blur based on scroll
      if (scrolled > 100) {
        this.header.style.boxShadow = "0 5px 20px rgba(79, 195, 247, 0.1)";
        this.header.style.backdropFilter = "blur(25px)";
      } else {
        this.header.style.boxShadow = "none";
        this.header.style.backdropFilter = "blur(20px)";
      }

      // Header hide/show on scroll direction
      if (scrolled > 200) {
        if (scrolled > lastScrollY && scrolled > 500) {
          this.header.style.transform = "translateY(-100%)";
        } else {
          this.header.style.transform = "translateY(0)";
        }
      }

      lastScrollY = scrolled;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);
  }

  setupLogoAnimations() {
    if (this.logoImg) {
      this.logoImg.addEventListener("click", () => {
        this.logoImg.style.animation = "none";
        this.logoImg.offsetHeight; // Trigger reflow
        this.logoImg.style.animation = "spin 0.8s ease-in-out";
      });
    }
  }
}

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";

      // Add extra animations for team member items
      if (entry.target.classList.contains("member-card")) {
        const items = entry.target.querySelectorAll(
          ".experience-item, .skill-item"
        );
        items.forEach((item, index) => {
          setTimeout(() => {
            item.style.animation = `slideInLeft 0.6s ease forwards`;
            item.style.transform = "translateX(-30px)";
            item.style.opacity = "0";
            setTimeout(() => {
              item.style.transform = "translateX(0)";
              item.style.opacity = "1";
            }, 50);
          }, index * 100);
        });
      }

      // Enhanced timeline animations
      if (entry.target.classList.contains("timeline-item")) {
        const content = entry.target.querySelector(".timeline-content");
        const icon = entry.target.querySelector(".timeline-icon");

        setTimeout(() => {
          content.style.animation = "slideInFromSide 0.8s ease forwards";
          icon.style.animation = "bounceIn 0.6s ease forwards";
        }, 200);
      }

      // Impact metrics animation
      if (entry.target.classList.contains("metric-card")) {
        const value = entry.target.querySelector(".metric-value");
        if (value) {
          animateNumber(value);
        }
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document
  .querySelectorAll(
    ".member-card, .stat-card, .solution-card, .timeline-item, .metric-card, .contact-card"
  )
  .forEach((card) => {
    observer.observe(card);
  });

// Enhanced card hover effects for solution and stat cards
document
  .querySelectorAll(".solution-card, .stat-card, .contact-card")
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

      // Dynamic lighting effect
      const lightIntensity = Math.min(
        100,
        Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / 3
      );
      card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(79, 195, 247, ${0.2 + lightIntensity / 500}) 0%,
        rgba(129, 199, 132, 0.1) 70%,
        rgba(79, 195, 247, 0.08) 100%
      )
    `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
      card.style.background = "";
    });
  });

// Enhanced team member card hover effects
document.querySelectorAll(".member-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-20px) scale(1.02)`;

    // Dynamic gradient based on mouse position
    const intensity = Math.min(
      100,
      Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) / 2
    );
    card.style.background = `
      radial-gradient(
        circle at ${x}px ${y}px,
        rgba(79, 195, 247, ${0.15 + intensity / 1000}) 0%,
        rgba(129, 199, 132, 0.08) 50%,
        rgba(79, 195, 247, 0.05) 100%
      )
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";
    card.style.background =
      "linear-gradient(145deg, rgba(79, 195, 247, 0.12), rgba(129, 199, 132, 0.08))";
  });
});

// Counter animation for stats and metrics
function animateCounter(element, target, duration = 2500, suffix = "") {
  let start = 0;
  const increment = target / (duration / 16);
  const isPercentage = element.textContent.includes("%");
  const isMillions = element.textContent.includes("M");
  const isDollars = element.textContent.includes("$");

  function updateCounter() {
    start += increment;
    if (start < target) {
      if (isDollars && target >= 1000000) {
        element.textContent = "$" + (start / 1000000).toFixed(1) + "M";
      } else if (isMillions) {
        element.textContent = (start / 1000000).toFixed(1) + "M+";
      } else if (target > 1000 && !isPercentage && !suffix) {
        element.textContent = Math.floor(start / 1000) + "k+";
      } else if (isPercentage) {
        element.textContent = Math.floor(start) + "%";
      } else {
        element.textContent = Math.floor(start) + suffix;
      }
      requestAnimationFrame(updateCounter);
    } else {
      if (isDollars && target >= 1000000) {
        element.textContent = "$" + (target / 1000000).toFixed(0) + "M";
      } else if (isMillions) {
        element.textContent = (target / 1000000).toFixed(0) + "M+";
      } else if (isPercentage) {
        element.textContent = target + "%";
      } else {
        element.textContent = target + suffix;
      }
    }
  }
  updateCounter();
}

// Generic number animation function
function animateNumber(element) {
  const text = element.textContent;
  const isPercentage = text.includes("%");
  const isDollars = text.includes("$");
  const isMillions = text.includes("M");
  const hasPlus = text.includes("+");

  let targetValue;

  if (isDollars) {
    targetValue = parseFloat(text.replace(/[$M]/g, "")) * 1000000;
  } else if (isMillions) {
    targetValue = parseFloat(text.replace(/[M+]/g, "")) * 1000000;
  } else {
    targetValue = parseInt(text.replace(/[%+]/g, ""));
  }

  animateCounter(element, targetValue);
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

// Enhanced parallax effects
class ParallaxManager {
  constructor() {
    this.elements = [
      {
        selector: ".hero-bg",
        speed: 0.3,
      },
      {
        selector: ".floating-element",
        speed: 0.5,
      },
    ];

    this.init();
  }

  init() {
    this.setupParallax();
  }

  setupParallax() {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;

      this.elements.forEach(({ selector, speed }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          const elementTop = element.offsetTop;
          const elementHeight = element.offsetHeight;
          const windowHeight = window.innerHeight;

          // Only apply parallax if element is in viewport
          if (
            scrolled + windowHeight > elementTop &&
            scrolled < elementTop + elementHeight
          ) {
            const yPos = scrolled * speed;
            element.style.transform = `translateY(${yPos}px)`;
          }
        });
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);
  }
}

// Team section title animation
function animateTeamTitle() {
  const teamTitle = document.querySelector(".team-section .section-title");
  if (teamTitle) {
    teamTitle.style.opacity = "0";
    teamTitle.style.animation = "titleSlideIn 1.2s ease-out 0.3s forwards";

    // Animate the underline
    setTimeout(() => {
      const afterElement = window.getComputedStyle(teamTitle, "::after");
      teamTitle.style.setProperty(
        "--line-animation",
        "lineExpand 1s ease-out forwards"
      );
    }, 1500);
  }
}

// Team intro animation
function animateTeamIntro() {
  const teamIntro = document.querySelector(".team-intro");
  if (teamIntro) {
    teamIntro.style.opacity = "0";
    teamIntro.style.animation = "fadeIn 1s ease-out 0.8s forwards";
  }
}

// Stagger team card animations
function animateTeamCards() {
  const cards = document.querySelectorAll(".member-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(60px) rotateX(15deg)";
    setTimeout(() => {
      card.style.animation = `cardEntrance 1s ease-out forwards`;
    }, index * 200 + 200);
  });
}

// Add ripple effect on team card click
document.querySelectorAll(".member-card").forEach((card) => {
  card.addEventListener("click", function (e) {
    const ripple = document.createElement("div");
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.position = "absolute";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.width = "20px";
    ripple.style.height = "20px";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(79, 195, 247, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "rippleEffect 0.6s ease-out";
    ripple.style.pointerEvents = "none";
    ripple.style.zIndex = "10";

    this.style.position = "relative";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Team section scroll observer
const teamObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("team-section")
      ) {
        // Trigger team-specific animations when section comes into view
        animateTeamTitle();
        animateTeamIntro();

        // Re-animate cards with stagger effect
        const cards = document.querySelectorAll(".member-card");
        cards.forEach((card, index) => {
          setTimeout(() => {
            if (card.style.animationPlayState !== "running") {
              card.style.animation = `cardEntrance 1s ease-out forwards`;
            }
          }, index * 150);
        });

        teamObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

// Observe team section
const teamSection = document.querySelector(".team-section");
if (teamSection) {
  teamObserver.observe(teamSection);
}

// Enhanced floating particles system
function createAdvancedParticles() {
  const particleCount = 20;
  const teamSection = document.querySelector(".team-section");

  if (!teamSection) return;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-element";
    particle.style.position = "absolute";
    particle.style.width = "6px";
    particle.style.height = "6px";
    particle.style.borderRadius = "50%";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "1";

    // Random colors from the theme
    const colors = ["#4fc3f7", "#81c784", "#29b6f6"];
    particle.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // Random positioning
    particle.style.top = Math.random() * 100 + "%";
    particle.style.left = Math.random() * 100 + "%";

    // Random animation duration and delay
    particle.style.animationDuration = 20 + Math.random() * 15 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particle.style.animationName = "floatAround";
    particle.style.animationIterationCount = "infinite";
    particle.style.animationTimingFunction = "linear";

    // Random direction
    if (Math.random() > 0.5) {
      particle.style.animationDirection = "reverse";
    }

    teamSection.appendChild(particle);
  }
}

// Smooth reveal animation for member items
function revealMemberItems(memberCard) {
  const experienceItems = memberCard.querySelectorAll(".experience-item");
  const skillItems = memberCard.querySelectorAll(".skill-item");
  const allItems = [...experienceItems, ...skillItems];

  allItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-20px)";

    setTimeout(() => {
      item.style.transition = "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)";
      item.style.opacity = "1";
      item.style.transform = "translateX(0)";
    }, index * 100 + 300);
  });
}

// Enhanced intersection observer for member cards
const memberCardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (
        entry.isIntersecting &&
        entry.target.classList.contains("member-card")
      ) {
        // Trigger the reveal animation
        setTimeout(() => {
          revealMemberItems(entry.target);
        }, 500);

        memberCardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Observe all member cards
document.querySelectorAll(".member-card").forEach((card) => {
  memberCardObserver.observe(card);
});

// Add dynamic glow effect on scroll
const throttledGlowEffect = throttle(() => {
  const scrolled = window.pageYOffset;
  const teamCards = document.querySelectorAll(".member-card");

  teamCards.forEach((card, index) => {
    const rect = card.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      const visibility = Math.min(
        1,
        Math.max(
          0,
          1 -
            Math.abs(rect.top - window.innerHeight / 2) /
              (window.innerHeight / 2)
        )
      );
      const glowIntensity = visibility * 0.3;
      card.style.boxShadow = `0 15px 40px rgba(0, 0, 0, 0.3), 0 0 ${
        20 + glowIntensity * 30
      }px rgba(79, 195, 247, ${glowIntensity})`;
    }
  });
}, 16);

window.addEventListener("scroll", throttledGlowEffect);

// Timeline animation enhancements
function setupTimelineAnimations() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item, index) => {
    const content = item.querySelector(".timeline-content");
    const marker = item.querySelector(".timeline-marker");

    // Add initial states
    content.style.opacity = "0";
    content.style.transform =
      index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
    marker.style.opacity = "0";
    marker.style.transform = "translateX(-50%) scale(0.5)";

    // Animate on scroll
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              marker.style.transition =
                "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
              marker.style.opacity = "1";
              marker.style.transform = "translateX(-50%) scale(1)";

              setTimeout(() => {
                content.style.transition =
                  "all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)";
                content.style.opacity = "1";
                content.style.transform = "translateX(0)";
              }, 200);
            }, index * 200);

            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    itemObserver.observe(item);
  });
}

// Contact section animations
function setupContactAnimations() {
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.style.transition =
                "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, index * 150);

            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cardObserver.observe(card);
  });
}

// Add CSS for ripple effect and additional animations
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translateX(-50%) scale(0.3);
    }
    50% {
      opacity: 1;
      transform: translateX(-50%) scale(1.05);
    }
    70% {
      transform: translateX(-50%) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }
  
  @keyframes slideInFromSide {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .header {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`;
document.head.appendChild(additionalStyles);

// Initialize everything when page loads
window.addEventListener("load", () => {
  // Initialize navigation system
  new NavigationManager();

  // Initialize header effects
  new HeaderEffects();

  // Initialize parallax manager
  new ParallaxManager();

  // Create particles
  createParticles();

  // Start typing animation after a delay
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 120);
    }, 1500);
  }

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

  // Initialize team animations
  animateTeamTitle();
  animateTeamIntro();
  animateTeamCards();

  // Initialize timeline animations
  setupTimelineAnimations();

  // Initialize contact animations
  setupContactAnimations();

  // Initialize advanced particles
  setTimeout(createAdvancedParticles, 2000);
});

// Add loading animation
document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "1";
  }, 100);
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const nav = document.querySelector(".nav");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active");
      mobileMenuBtn.classList.remove("active");
    }
  }
});

// Handle window resize for responsive navigation
window.addEventListener(
  "resize",
  throttle(() => {
    const navManager = window.navManager;
    if (navManager) {
      navManager.updateIndicator(document.querySelector(".nav-link.active"));
    }
  }, 250)
);

// Preload images for better performance
function preloadImages() {
  const imageUrls = [
    "https://i.postimg.cc/kM1bYL6f/Team-Yarra.png",
    "https://i.postimg.cc/90cLGHGH/Current-Pfp.jpg",
  ];

  imageUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

// Initialize preloading
preloadImages();

// Add smooth scroll behavior for all internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});
