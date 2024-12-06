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
