/* =========================================================
URBAN FOREST - MAIN JAVASCRIPT
========================================================= */

// Theme Toggle & Persistence
function toggleTheme() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("urbanForestTheme", isDark ? "dark" : "light");
}

// RTL Toggle & Persistence
function toggleRTL() {
  const isRtl = !document.body.classList.contains("rtl");
  document.body.classList.toggle("rtl", isRtl);
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
  localStorage.setItem("urbanForestRTL", isRtl ? "true" : "false");
}

// Load Persisted Settings
function loadSettings() {
  if (localStorage.getItem("urbanForestTheme") === "dark") {
    document.body.classList.add("dark");
  }
  if (localStorage.getItem("urbanForestRTL") === "true") {
    document.body.classList.add("rtl");
    document.documentElement.dir = "rtl";
  }
}

// Mobile Navigation Menu
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.toggle("open");
  }
}

function closeMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) {
    menu.classList.remove("open");
  }
}

// Toast Notifications
let toastTimer;
function toast(message) {
  let el = document.getElementById("toast");
  if (!el) {
    el = document.createElement("div");
    el.id = "toast";
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove("show");
  }, 2800);
}

// Scroll Reveal Animations
let revealObserver;
function revealInit() {
  if (revealObserver) {
    revealObserver.disconnect();
  }
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
}

// Image Fallback Handler
function setupImages() {
  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", function () {
      if (this.dataset.failed) return;
      this.dataset.failed = "true";
      this.src =
        "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">
            <rect width="1600" height="1000" fill="#123a2d"/>
            <path d="M800 120C475 370 325 680 325 950C800 950 1275 950 1275 950C1275 680 1125 370 800 120Z" fill="#c9e66b" opacity="0.9"/>
            <path d="M800 300V950M800 550L520 380M800 720L500 520M800 580L1080 410M800 740L1100 550" stroke="#123a2d" stroke-width="45" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        `);
    });
  });
}

// Donation Interactivity
let selectedAmount = 25;
let donationFreq = "one-time";

function setFrequency(btn, freq) {
  donationFreq = freq;
  document.querySelectorAll(".freq-btn").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  updateImpactNote();
}

function chooseAmount(button, amount) {
  selectedAmount = amount;
  document.querySelectorAll(".amount").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (button) {
    button.classList.add("active");
  }
  const customInput = document.getElementById("customAmount");
  if (customInput) {
    customInput.value = "";
  }
  updateImpactNote();
}

function updateImpactNote() {
  const customInput = document.getElementById("customAmount");
  const custom = customInput ? Number(customInput.value) : 0;
  const amount = custom > 0 ? custom : selectedAmount;
  const trees = Math.max(1, Math.floor(amount / 25));
  const noteEl = document.getElementById("impactNoteText");
  if (noteEl) {
    const freqText = donationFreq === "monthly" ? "monthly contribution" : "one-time contribution";
    noteEl.innerHTML = `A <strong>$${amount} ${freqText}</strong> will plant <strong>${trees} native tree sapling${trees > 1 ? "s" : ""}</strong> and provide ${trees * 3} years of care & monitoring.`;
  }
}

function donate() {
  const customInput = document.getElementById("customAmount");
  const custom = customInput ? Number(customInput.value) : 0;
  const amount = custom > 0 ? custom : selectedAmount;
  const freqLabel = donationFreq === 'monthly' ? 'Monthly' : 'One-time';
  toast(freqLabel + " donation of $" + amount + " selected. Payment gateway can be connected here.");
}

// Volunteer Event Registration
function registerEvent(name) {
  localStorage.setItem("urbanForestEvent", name);
  toast("Registration recorded for " + name + ".");
}

// Contact Form Handler
function contactSubmit(event) {
  event.preventDefault();
  toast("Your message has been submitted successfully.");
  event.target.reset();
}

// Newsletter Subscription Handler
function newsletter(event) {
  event.preventDefault();
  toast("Thank you. You are subscribed to restoration updates.");
  event.target.reset();
}

// Authentication Forms
function loginSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const email = emailInput ? emailInput.value : "";
  let name = email
    .split("@")[0]
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  if (!name) name = "Supporter";
  localStorage.setItem("urbanForestName", name);
  localStorage.setItem("urbanForestLoggedIn", "true");
  toast("Login successful.");
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 400);
}

function signupSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById("signupName");
  const name = nameInput ? nameInput.value.trim() : "Supporter";
  const termsCheckbox = document.getElementById("terms");
  if (termsCheckbox && !termsCheckbox.checked) {
    toast("Please agree to the terms.");
    return;
  }
  localStorage.setItem("urbanForestName", name || "Supporter");
  localStorage.setItem("urbanForestLoggedIn", "true");
  toast("Account created successfully.");
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 400);
}

function socialLogin(provider) {
  localStorage.setItem("urbanForestName", "Supporter");
  localStorage.setItem("urbanForestLoggedIn", "true");
  toast(provider + " sign-in demo completed.");
  setTimeout(() => {
    window.location.href = "dashboard.html";
  }, 400);
}

function forgotPassword() {
  const emailInput = document.getElementById("loginEmail");
  const email = emailInput ? emailInput.value : "";
  if (email) {
    toast("Password reset instructions would be sent to " + email + ".");
  } else {
    toast("Please enter your email address first.");
  }
}

// Highlight Current Navigation Link
function highlightActiveNav() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === page || (page === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });
}

// Scroll to Top Button Handler
function initScrollToTop() {
  let btn = document.getElementById("scrollTopBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "scrollTopBtn";
    btn.className = "scroll-top-btn";
    btn.setAttribute("aria-label", "Scroll to top");
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>`;
    document.body.appendChild(btn);
  }

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  const handleScroll = () => {
    if (window.scrollY > 280) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// Initialization on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  setupImages();
  revealInit();
  highlightActiveNav();
  initOrganicInteractions();
  initScrollToTop();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) {
    closeMenu();
  }
});

/* =========================================================
REFINED ORGANIC CARD & BUTTON MICRO-INTERACTIONS
========================================================= */

function initOrganicInteractions() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const interactiveCards = document.querySelectorAll(
    ".program-card, .experience-card, .donor-perk-card, .impact-point, .counter, .three-column, .volunteer-card, .stat-card, .feature-card, .dashboard-card, .model-pillar, .process-card, .project-card"
  );

  interactiveCards.forEach((card) => {
    if (card.dataset.interactionBound) return;
    card.dataset.interactionBound = "true";

    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.boxShadow = "";
    });
  });
}

// Interactive Project Locations Filter
function filterProjects(category, btnElement) {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  filterBtns.forEach((btn) => btn.classList.remove("active"));
  if (btnElement) {
    btnElement.classList.add("active");
  }

  const cards = document.querySelectorAll(".project-card[data-category]");
  cards.forEach((card) => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });
}



