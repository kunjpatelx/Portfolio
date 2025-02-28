console.log("Portfolio loaded - Welcome to the Matrix.");

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px 'Courier New'`;

    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let frameCount = 0;
function animate() {
    draw();
    frameCount++;
    if (frameCount === 300) {
        canvas.style.transition = "opacity 2s";
        canvas.style.opacity = "0.2";
    }
    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
});

// Typing Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    const tagline = document.getElementById("tagline");
    const resumeLine1 = document.getElementById("resume-line1");
    const resumeLine2 = document.getElementById("resume-line2");
    const resumeLine3 = document.getElementById("resume-line3");

    const texts = [
        { element: tagline, content: "IT Support Specialist | Code Weaver" },
        { element: resumeLine1, content: "Kunj Patel - IT Support Specialist" },
        { element: resumeLine2, content: "Experience: 3+ years deploying and troubleshooting IT systems" },
        { element: resumeLine3, content: "Skills: Hardware/Software Support, Network Diagnostics, Windows/Linux, TeamSync" }
    ];

    let delay = 0;
    texts.forEach(({ element, content }, index) => {
        setTimeout(() => {
            element.textContent = content;
            element.classList.add("typing");
            // Remove blinking cursor after animation ends
            element.addEventListener("animationend", () => {
                element.style.borderRight = "none";
            }, { once: true });
        }, delay);
        delay += 2500; // stagger each line by 2.5 seconds
    });
});
