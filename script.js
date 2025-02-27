console.log("Portfolio loaded - Welcome to the Matrix.");

// Matrix animation
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to use (Matrix-style)
const matrixChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

// Animation loop
function draw() {
    // Semi-transparent black fill to fade old characters
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Green text
    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px 'Courier New'`;

    // Draw falling characters
    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Randomly reset drop to top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Run animation
let frameCount = 0;
function animate() {
    draw();
    frameCount++;
    // Fade canvas opacity after 5 seconds (300 frames at 60fps)
    if (frameCount === 300) {
        canvas.style.transition = "opacity 2s";
        canvas.style.opacity = "0.2"; // Subtle loop after initial wow
    }
    requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
});