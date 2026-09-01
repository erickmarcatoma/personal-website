const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

const initialTheme = savedTheme || (systemPrefersLight ? "light" : "dark");
setTheme(initialTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = document.body.getAttribute("data-theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

function setTheme(theme) {
  if (theme === "light") {
    document.body.setAttribute("data-theme", "light");
    themeIcon.textContent = "DARK";
    localStorage.setItem("portfolio-theme", "light");
  } else {
    document.body.removeAttribute("data-theme");
    themeIcon.textContent = "LIGHT";
    localStorage.setItem("portfolio-theme", "dark");
  }
}

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
revealEls.forEach((el) => revealObserver.observe(el));

const timelineBtns = document.querySelectorAll(".timeline-btn");
const timelineContents = document.querySelectorAll(".timeline-content");

timelineBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.target;
    timelineBtns.forEach((b) => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });
    timelineContents.forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");
    const panelElement = document.getElementById(target);
    if(panelElement) panelElement.classList.add("active");
  });
});

const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  },
  { threshold: 0.1, rootMargin: "-72px 0px -40% 0px" }
);
sections.forEach((s) => navObserver.observe(s));

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("formSuccess").classList.add("show");
  e.target.reset();
  setTimeout(() => document.getElementById("formSuccess").classList.remove("show"), 4000);
});

document.getElementById("year").textContent = new Date().getFullYear();

const typingText = "Becoming a software engineer, one project at a time.";
const typingElement = document.querySelector(".hero-tagline");
const staticPart = document.querySelector(".hero-tagline strong");

const strongHTML = `<strong>Discipline, curiosity, and zero excuses.</strong>`;

let i = 0;
typingElement.innerHTML = '<span id="typed"></span><span class="cursor">|</span><br>' + strongHTML;

function typeWriter() {
  if (i < typingText.length) {
    document.getElementById("typed").textContent += typingText.charAt(i);
    i++;
    setTimeout(typeWriter, 55);
  } else {
    document.querySelector(".cursor").style.display = "none";
  }
}

typeWriter();

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  const trail = [];
  const trailLength = 6;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div");
    dot.style.cssText = `
      position: fixed;
      width: ${8 - i * 0.5}px;
      height: ${8 - i * 0.5}px;
      border-radius: 50%;
      background: var(--accent-light);
      pointer-events: none;
      z-index: 9998;
      opacity: ${1 - i / trailLength};
      transition: transform 0.1s ease;
    `;
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrail() {
    let x = mouseX, y = mouseY;
    trail.forEach((dot, i) => {
      const prev = trail[i - 1] || { x: mouseX, y: mouseY };
      dot.x += (prev.x - dot.x) * 0.35;
      dot.y += (prev.y - dot.y) * 0.35;
      dot.el.style.left = dot.x - 4 + "px";
      dot.el.style.top = dot.y - 4 + "px";
    });
    requestAnimationFrame(animateTrail);
  }

  animateTrail();
}