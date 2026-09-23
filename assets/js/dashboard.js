/* =========================================================
URBAN FOREST - DASHBOARD JAVASCRIPT
========================================================= */

function updateDashboard() {
  const name = localStorage.getItem("urbanForestName") || "Supporter";
  const nameEl = document.getElementById("dashboardName");
  if (nameEl) {
    nameEl.textContent = name;
  }
}

function dashTab(name, button) {
  // Hide all tabs
  document.querySelectorAll(".dashboard-tab").forEach((tab) => {
    tab.classList.remove("active");
  });

  // Activate selected tab
  const target = document.getElementById("dash-" + name);
  if (target) {
    target.classList.add("active");
  }

  // Update sidebar active buttons
  document.querySelectorAll(".dashboard-nav button").forEach((btn) => {
    btn.classList.remove("active");
  });
  if (button) {
    button.classList.add("active");
  } else {
    // If called without button reference (e.g. from mobile)
    const matchingBtn = document.querySelector(`.dashboard-nav button[data-tab="${name}"]`);
    if (matchingBtn) matchingBtn.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function toggleDashboardMenu() {
  const mobileMenu = document.getElementById("dashboardMobile");
  if (mobileMenu) {
    mobileMenu.classList.toggle("open");
  }
}

function mobileDash(name) {
  dashTab(name);
  const mobileMenu = document.getElementById("dashboardMobile");
  if (mobileMenu) {
    mobileMenu.classList.remove("open");
  }
}

function logout() {
  localStorage.removeItem("urbanForestLoggedIn");
  if (typeof toast === "function") {
    toast("You have been logged out.");
  }
  setTimeout(() => {
    window.location.href = "index.html";
  }, 400);
}

document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
});
