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
function animateCanvas() {
    draw();
    frameCount++;
    if (frameCount === 300) {
        canvas.style.transition = "opacity 2s";
        canvas.style.opacity = "0.2";
    }
    requestAnimationFrame(animateCanvas);
}

animateCanvas();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(1);
});

// GSAP Header Animation
gsap.from("#name-header", { opacity: 0, y: -50, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.from("#tagline", { opacity: 0, y: 20, duration: 1, delay: 1, ease: "power2.out" });
gsap.from(".contact", { opacity: 0, y: 20, duration: 1, delay: 1.5, ease: "power2.out" });

// Anime.js Tile Animation
document.querySelectorAll(".tile").forEach((tile, index) => {
    anime({
        targets: tile,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: index * 500,
        easing: "easeOutQuad"
    });
});

// GSAP for Project Card Hover Effects (Framer Motion-inspired)
document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, rotateX: 5, duration: 0.3, ease: "power1.out" });
    });
    card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, rotateX: 0, duration: 0.3, ease: "power1.out" });
    });
});

// ScrollTrigger for Sections
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".scroll-section").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 80%"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out"
    });
});

// Solana Wallet Balance
const connection = new solanaWeb3.Connection('https://api.mainnet-beta.solana.com');
const walletAddress = 'DZJSB7H95nBf3294LdZsSaECuW2jFUQKD9jngMAk1f3W';
const pubKey = new solanaWeb3.PublicKey(walletAddress);
connection.getBalance(pubKey).then((balance) => {
    const balanceInSol = balance / 1000000000;
    document.getElementById("wallet-balance").innerHTML = `Balance: ${balanceInSol} SOL`;
}).catch(error => {
    console.error("Solana fetch error:", error);
    document.getElementById("wallet-balance").innerHTML = "Error fetching balance";
});

function toggleDetails(button) {
    const details = button.previousElementSibling;
    details.classList.toggle("hidden");
    button.textContent = details.classList.contains("hidden") ? "Access Data" : "Close Data";
}
