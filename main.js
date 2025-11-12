// Page navigation order
const pages = ['index.html', 'hobbies.html', 'duluth.html', 'resume.html', 'career.html', 'game.html'];

/**
 * Navigates to the next or previous page in the `pages` array.
 * @param {string} direction - 'next' or 'prev'.
 */
function navigatePages(direction) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pages.indexOf(currentPage);
    let nextIndex;

    if (direction === 'next') {
        nextIndex = (currentIndex + 1) % pages.length;
    } else {
        nextIndex = (currentIndex - 1 + pages.length) % pages.length;
    }

    // Trigger the explosion effect on the button that was clicked
    if (window.event && window.event.target) {
        createExplosionEffect(window.event);
    }

    // Delay navigation to allow the effect to play
    setTimeout(() => {
        window.location.href = pages[nextIndex];
    }, 500);
}

/**
 * Creates a "yin-yang confetti" explosion effect on a clicked element.
 * @param {Event} event - The click event.
 */
function createExplosionEffect(event) {
    const button = event.target;
    const buttonRect = button.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2 + window.scrollX;
    const centerY = buttonRect.top + buttonRect.height / 2 + window.scrollY;

    // Create explosion animation on the button
    button.style.animation = 'explode 0.5s ease-out';

    // Create yin-yang symbols as confetti
    for (let i = 0; i < 20; i++) {
        const yinyang = document.createElement('div');
        yinyang.className = 'yinyang';
        document.body.appendChild(yinyang);

        // Position at center of the button
        yinyang.style.left = centerX + 'px';
        yinyang.style.top = centerY + 'px';

        // Random direction for each yin-yang
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const rotation = Math.random() * 720 - 360;

        yinyang.style.setProperty('--x', `${x}px`);
        yinyang.style.setProperty('--y', `${y}px`);
        yinyang.style.setProperty('--r', `${rotation}deg`);

        yinyang.style.animation = 'yinyang-confetti 0.5s ease-out forwards';

        // Clean up
        setTimeout(() => {
            document.body.removeChild(yinyang);
        }, 500);
    }

    // Reset button animation
    setTimeout(() => {
        button.style.animation = '';
    }, 500);
}

/**
 * Creates a falling petal effect originating from the click position.
 * @param {MouseEvent} event - The mouse click event.
 */
function createPetalFall(event, coords) {
    let startX, startY;

    if (coords) {
        startX = coords.x;
        startY = coords.y;
    } else if (event) {
        // Don't trigger petal fall on general clicks if a button or link was clicked
        if (event.target.closest('a, button')) {
            return;
        }
        startX = event.pageX;
        startY = event.pageY;
    }

    for (let i = 0; i < 20; i++) { // Create 20 petals per click
        const petal = document.createElement('div');
        petal.className = 'petal';
        document.body.appendChild(petal);

        const duration = Math.random() * 3 + 4; // Duration between 4s and 7s
        petal.style.animationDuration = `${duration}s`;

        petal.style.left = `${startX}px`;
        petal.style.top = `${startY}px`;

        // Animation properties
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * 80 + 30;
        petal.style.setProperty('--poof-x', `${Math.cos(angle) * radius}px`);
        petal.style.setProperty('--poof-y', `${Math.sin(angle) * radius}px`);
        petal.style.setProperty('--initial-rotation', `${Math.random() * 360}deg`);
        petal.style.setProperty('--flutter-x1', `${(Math.random() - 0.5) * 100}px`);
        petal.style.setProperty('--flutter-x2', `${(Math.random() - 0.5) * 150}px`);
        petal.style.setProperty('--flutter-x3', `${(Math.random() - 0.5) * 200}px`);
        petal.style.setProperty('--flutter-rot1', `${Math.random() * 720}deg`);
        petal.style.setProperty('--flutter-rot2', `${Math.random() * 720}deg`);
        petal.style.setProperty('--end-rotation', `${Math.random() * 1080}deg`);

        // Clean up the petal element after the animation finishes
        setTimeout(() => {
            if (petal.parentNode) petal.parentNode.removeChild(petal);
        }, duration * 1000);
    }
}

// Add click listener to the whole document for the petal effect
document.addEventListener('click', createPetalFall);