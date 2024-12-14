const canvas = document.getElementById('cryptoCanvas');
const ctx = canvas.getContext('2d');

// Configuration
const config = {
    topMargin: 50, // Увеличиваем верхний отступ
    bottomMargin: 70, // Увеличиваем нижний отступ
    scaleSteps: 10,
    maxScaleValue: 1.0,
    tokens: [
        { name: "New York", image: "./NYKEYS.png", link: "https://nykeys.example.com", capitalization: "$0", value: 0.0 },
        { name: "Dubai", image: "./DKYS.png", link: "https://dubaikeys.example.com", capitalization: "$0", value: 0.0 },
        { name: "Moscow", image: "./MOSCOWKEYS.png", link: "https://moscowkeys.example.com", capitalization: "$0", value: 0.0 }
    ]
};

const getDeviceScale = () => {
    const width = window.innerWidth;
    if (width <= 480) return 1.2; // Mobile
    if (width <= 768) return 1.6; // Tablet
    return 2.2; // Desktop
};

const resizeCanvas = () => {
    const maxWidth = 1200;
    const deviceWidth = window.innerWidth * 0.9;
    const deviceHeight = window.innerHeight * 0.6;

    canvas.width = Math.min(maxWidth, deviceWidth); // Limit canvas width
    canvas.height = deviceHeight;
    render();
};

// Draw the scale on the left
const drawScale = () => {
    const lineHeight = canvas.height - config.topMargin - config.bottomMargin;
    const stepHeight = lineHeight / config.scaleSteps;

    ctx.strokeStyle = "rgba(160, 174, 192, 0.25)";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([4, 4]);

    // Horizontal dashed lines and scale labels
    for (let i = 0; i <= config.scaleSteps; i++) {
        const y = config.topMargin + i * stepHeight;
        const value = (config.maxScaleValue - i * (config.maxScaleValue / config.scaleSteps)).toFixed(1);

        // Draw dashed line
        ctx.beginPath();
        ctx.moveTo(50, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();

        // Draw scale label
        ctx.setLineDash([]);
        ctx.font = "12px Arial";
        ctx.fillStyle = "#f2ddcc";
        ctx.textAlign = "right";
        ctx.fillText(`$${value}`, 40, y + 4);
        ctx.setLineDash([4, 4]); // Restore dashed style
    }
};

// Draw tokens
const drawTokens = () => {
    const spacing = (canvas.width - 100) / (config.tokens.length + 1);
    const baseTokenSize = Math.min(canvas.width, canvas.height) * 0.1;
    const deviceScale = getDeviceScale();
    const tokenSize = baseTokenSize * deviceScale;

    config.tokens.forEach((token, index) => {
        const img = new Image();
        img.src = token.image;

        img.onload = () => {
            const x = 50 + spacing * (index + 1); // Start after the scale
            const y = config.topMargin + (1 - token.value) * (canvas.height - config.topMargin - config.bottomMargin) - tokenSize / 2;

            // Draw token as a circle
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y + tokenSize / 2, tokenSize / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, x - tokenSize / 2, y, tokenSize, tokenSize);
            ctx.restore();

            // Draw token name and capitalization in one line
            ctx.font = "14px Arial";
            ctx.fillStyle = "#f2ddcc";
            ctx.textAlign = "center";
            ctx.fillText(`${token.name} - ${token.capitalization}`, x, y + tokenSize + 20);
        };
    });
};

// Handle canvas click events
const handleCanvasClick = (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    config.tokens.forEach((token, index) => {
        const spacing = (canvas.width - 100) / (config.tokens.length + 1);
        const baseTokenSize = Math.min(canvas.width, canvas.height) * 0.1;
        const deviceScale = getDeviceScale();
        const tokenSize = baseTokenSize * deviceScale;
        const x = 50 + spacing * (index + 1);
        const y = config.topMargin + (1 - token.value) * (canvas.height - config.topMargin - config.bottomMargin) - tokenSize / 2;
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - (y + tokenSize / 2)) ** 2);

        if (distance <= tokenSize / 2) {
            window.open(token.link, "_blank");
        }
    });
};

canvas.addEventListener("click", handleCanvasClick);

// Render everything
const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScale();
    drawTokens();
};

window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initial resize and render

// Function to create stars in the background
const createStars = () => {
    const background = document.getElementById('background');
    const currentStars = background.querySelectorAll('.star').length;
    const maxStars = 15;
    const minStars = 5;
    const newStars = Math.floor(Math.random() * (maxStars - minStars + 1)) + minStars;
    const numberOfStars = Math.min(newStars, maxStars - currentStars);

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const side = Math.floor(Math.random() * 4);
        if (side === 0) {
            star.style.top = '0';
            star.style.left = `${Math.random() * 100}%`;
        } else if (side === 1) {
            star.style.top = '100%';
            star.style.left = `${Math.random() * 100}%`;
        } else if (side === 2) {
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = '0';
        } else {
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = '100%';
        }

        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = `${1 + Math.random() * 2}px`;
        star.style.boxShadow = `0 0 ${5 + Math.random() * 10}px rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;

        background.appendChild(star);

        anime({
            targets: star,
            translateX: () => `${(Math.random() * 2 - 1) * 100}vw`,
            translateY: () => `${(Math.random() * 2 - 1) * 100}vh`,
            opacity: [1, 0],
            duration: 5000 + Math.random() * 10000,
            easing: 'linear',
            complete: function() {
                star.remove();
            }
        });
    }
};

setInterval(createStars, 1000);
