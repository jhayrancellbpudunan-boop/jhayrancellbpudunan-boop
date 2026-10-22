
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(updateClock, 1000);

  setupThemeToggle();
  setupPhotoUpload();
  loadPortfolioData();

  document.getElementById("pdfButton").addEventListener("click", () => {
    window.print();
  });
});

// Display the current time and date in the Philippines.
function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString("en-PH", {
    timeZone: "Asia/Manila",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const date = now.toLocaleDateString("en-PH", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  document.getElementById("liveTime").textContent = time;
  document.getElementById("liveDate").textContent = date;
}

// Switch between dark and light themes.
function setupThemeToggle() {
  const button = document.getElementById("themeToggle");

  button.addEventListener("click", () => {
    const lightMode = document.body.classList.toggle("light");

    button.textContent = lightMode ? "☾" : "☼";

    button.setAttribute(
      "aria-label",
      lightMode ? "Switch to dark theme" : "Switch to light theme"
    );
  });
}

// Allow the user to select a profile picture.
function setupPhotoUpload() {
  const input = document.getElementById("photoInput");
  const image = document.getElementById("profileImage");

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      input.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

// Load personal information from data.json.
async function loadPortfolioData() {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error("Could not load data.json");
    }

    const data = await response.json();

    document.title = `${data.name} | Portfolio`;

    document.getElementById("fullName").textContent = data.name;

    const contactLinks = document.querySelectorAll(
      ".contact-list a"
    );

    if (data.phone) {
      contactLinks[0].href =
        `tel:${data.phone.replace(/[^\d+]/g, "")}`;

      contactLinks[0]
        .querySelector("span:nth-child(2)")
        .lastChild.textContent = data.phone;
    }

    if (data.email) {
      contactLinks[1].href = `mailto:${data.email}`;

      contactLinks[1]
        .querySelector("span:nth-child(2)")
        .lastChild.textContent = data.email;

      document.querySelectorAll('a[href^="mailto:"]')
        .forEach(link => {
          link.href = `mailto:${data.email}`;
        });
    }

    if (data.profileImage) {
      document.getElementById("profileImage").src =
        data.profileImage;
    }

  } catch (error) {
    console.warn(
      "Using the default portfolio content.",
      error
    );
  }
}
