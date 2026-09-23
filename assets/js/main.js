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
  init3DEngine();
  initScrollToTop();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1050) {
    closeMenu();
  }
});

/* =========================================================
HIGH PERFORMANCE 3D ANIMATION ENGINE (BUTTER-SMOOTH SCROLLING)
========================================================= */

// Global Scroll State Throttler
let isScrollingTimer = null;
let isScrolling = false;

window.addEventListener("scroll", () => {
  isScrolling = true;
  clearTimeout(isScrollingTimer);
  isScrollingTimer = setTimeout(() => {
    isScrolling = false;
  }, 120);
}, { passive: true });

// Universal 3D Tilt Engine with rAF & Passive Event Listeners
function init3DTilt() {
  const tiltSelectors = [
    ".btn",
    ".theme-btn",
    ".menu-btn",
    ".nav-control",
    ".mobile-control",
    ".amount",
    ".filter-btn",
    ".hero-image",
    ".hero-card",
    ".feature-card",
    ".stat-card",
    ".impact-card",
    ".volunteer-card",
    ".event-card",
    ".work-card",
    ".testimonial-card",
    ".pricing-card",
    ".auth-card",
    ".image-frame",
    ".img-card",
    ".gallery-item",
    ".dashboard-card",
    "[data-tilt]"
  ];

  const elements = document.querySelectorAll(tiltSelectors.join(","));

  elements.forEach((el) => {
    if (el.dataset.tiltBound) return;
    el.dataset.tiltBound = "true";

    let glare = el.querySelector(".glare-3d");
    if (!glare && !el.classList.contains("btn") && !el.classList.contains("nav-control")) {
      glare = document.createElement("div");
      glare.className = "glare-3d";
      el.appendChild(glare);
    }

    const isButton = el.classList.contains("btn") || el.tagName === "BUTTON";
    const maxTilt = isButton ? 8 : 12;
    let rafId = null;

    el.addEventListener("mousemove", (e) => {
      if (isScrolling) return;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        const rotateX = (-y * maxTilt).toFixed(1);
        const rotateY = (x * maxTilt).toFixed(1);

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -3px, 8px)`;

        if (glare) {
          glare.style.opacity = "1";
          glare.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 75%)`;
        }
      });
    }, { passive: true });

    el.addEventListener("mouseleave", () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
      if (glare) {
        glare.style.opacity = "0";
      }
    });

    el.addEventListener("mousedown", () => {
      el.style.transform = `perspective(1000px) scale3d(0.98, 0.98, 0.98) translate3d(0, 1px, 2px)`;
    }, { passive: true });

    el.addEventListener("mouseup", () => {
      el.style.transform = `perspective(1000px) translate3d(0, -3px, 8px)`;
    }, { passive: true });
  });
}

// Optimized Three.js Ambient Particle Background
function initThreeBG() {
  if (document.getElementById("webgl-3d-bg")) return;

  const canvas = document.createElement("canvas");
  canvas.id = "webgl-3d-bg";
  document.body.prepend(canvas);

  function startScene() {
    if (typeof THREE === "undefined") return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle Leaf Geometry
    const particlesCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x7ebc27,
      size: 0.9,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Floating Low-Poly Shapes
    const shapesGroup = new THREE.Group();
    const shapeGeo = new THREE.IcosahedronGeometry(2.5, 0);

    for (let i = 0; i < 4; i++) {
      const shapeMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x1d5945 : 0xc9e66b,
        wireframe: true,
        transparent: true,
        opacity: 0.2
      });
      const mesh = new THREE.Mesh(shapeGeo, shapeMat);
      mesh.position.set((Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 15);
      shapesGroup.add(mesh);
    }
    scene.add(shapesGroup);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {
      if (isScrolling) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    }, { passive: true });

    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      // Skip GPU render tick during heavy scrolling for 60fps smoothness
      if (isScrolling) return;

      const elapsedTime = clock.getElapsedTime();

      particlesMesh.rotation.y = elapsedTime * 0.04 + mouseX * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.02 + mouseY * 0.05;

      shapesGroup.children.forEach((mesh, idx) => {
        mesh.rotation.x += 0.003 * (idx + 1);
        mesh.rotation.y += 0.004 * (idx + 1);
      });

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 200);
    }, { passive: true });
  }

  if (typeof THREE === "undefined") {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = startScene;
    document.head.appendChild(script);
  } else {
    startScene();
  }
}

// Master 3D Engine Initialization
function init3DEngine() {
  init3DTilt();
  initThreeBG();
}


