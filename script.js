console.log("Portfolio loaded - Welcome to the Future.");

// Particle Background
const particleContainer = document.getElementById("particle-container");
const particles = [];
const particleCount = 50;

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
    particleContainer.appendChild(particle);
    particles.push(particle);
}

for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// GSAP Header Animation
gsap.from("#name-header", { opacity: 0, y: -50, duration: 1, delay: 0.5, ease: "power2.out" });
gsap.from("#tagline", { opacity: 0, y: 20, duration: 1, delay: 1, ease: "power2.out" });

// Anime.js Datafeed Animation
document.querySelectorAll(".datafeed-section").forEach((section, index) => {
    anime({
        targets: section,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1000,
        delay: index * 300,
        easing: "easeOutQuad"
    });
});

// GSAP for Project Card Hover Effects
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
        scrollTrigger: { trigger: section, start: "top 80%" },
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
