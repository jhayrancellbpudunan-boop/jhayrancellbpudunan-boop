
"use strict";

document.addEventListener("DOMContentLoaded", function () {
    loadPortfolio();
    setupLiveTime();
    setupTheme();
    setupPhotoUpload();
    setupPDF();
});

async function loadPortfolio() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error("Unable to load projects.json");
        }

        const data = await response.json();

        document.getElementById("studentName").textContent = data.name;
        document.getElementById("course").textContent = "🎓 " + data.course;
        document.getElementById("location").textContent =
            "📍 " + data.location;
        document.getElementById("email").textContent = "✉️ " + data.email;
        document.getElementById("phone").textContent = "☎️ " + data.phone;
        document.getElementById("aboutText").textContent = data.about;
        document.getElementById("footerName").textContent = data.name;

        const contactLink = document.getElementById("contactLink");
        contactLink.href = "mailto:" + data.email;

        const educationList = document.getElementById("educationList");
        educationList.replaceChildren();

        data.education.forEach(function (item) {
            const article = document.createElement("article");
            article.className = "education-item";

            const title = document.createElement("h3");
            title.textContent = item.level;

            const school = document.createElement("p");
            school.textContent = item.school;

            article.append(title, school);

            if (item.course) {
                const course = document.createElement("p");
                course.textContent = item.course;
                article.appendChild(course);
            }

            educationList.appendChild(article);
        });

        const projectsList = document.getElementById("projectsList");
        projectsList.replaceChildren();

        data.projects.forEach(function (item) {
            const article = document.createElement("article");
            article.className = "project-card";

            const title = document.createElement("h3");
            title.textContent = "✦ " + item.title;

            const description = document.createElement("p");
            description.textContent = item.description;

            article.append(title, description);
            projectsList.appendChild(article);
        });

        const skillsList = document.getElementById("skillsList");
        skillsList.replaceChildren();

        data.skills.forEach(function (skill) {
            const span = document.createElement("span");
            span.className = "skill";
            span.textContent = skill;
            skillsList.appendChild(span);
        });

    } catch (error) {
        console.error(error);

        document.getElementById("studentName").textContent =
            "Portfolio data could not be loaded.";

        document.getElementById("aboutText").textContent =
            "Please run this website using a local development server.";
    }
}

function setupLiveTime() {
    function updateClock() {
        const now = new Date();

        document.getElementById("liveTime").textContent =
            new Intl.DateTimeFormat("en-PH", {
                timeZone: "Asia/Manila",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }).format(now);

        document.getElementById("liveDate").textContent =
            new Intl.DateTimeFormat("en-PH", {
                timeZone: "Asia/Manila",
                month: "long",
                day: "numeric",
                year: "numeric"
            }).format(now);

        document.getElementById("weekday").textContent =
            new Intl.DateTimeFormat("en-PH", {
                timeZone: "Asia/Manila",
                weekday: "long"
            }).format(now).toUpperCase();
    }

    updateClock();
    setInterval(updateClock, 1000);
}

function setupTheme() {
    const themeBtn = document.getElementById("themeBtn");

    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark");

        const isDark = document.body.classList.contains("dark");

        themeBtn.textContent = isDark ? "☀ Light Mode" : "☾ Dark Mode";
    });
}

function setupPhotoUpload() {
    const photoInput = document.getElementById("photoInput");

    photoInput.addEventListener("change", function () {
        const file = photoInput.files[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select a valid image.");
            photoInput.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            document.getElementById("profilePhoto").src =
                event.target.result;

            document.getElementById("aboutPhoto").src =
                event.target.result;
        };

        reader.readAsDataURL(file);
    });
}

function setupPDF() {
    document.getElementById("pdfBtn").addEventListener("click", function () {
        window.print();
    });
}
