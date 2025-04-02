// Get all the blocks
const blocks = document.querySelectorAll('.block');

// Set up animation parameters
const fps = 60;
const interval = 1000 / fps;

const windowData = [
    {
        id: "dragonSticker",
        title: "Dragon Sticker",
        content: `
            <img style="width:100%" src="img/art/dragonSticker.jpg" alt="image of dragon sticker" loading="lazy">
            <p class="portfolio-text">I made this sticker as a gift for friends. I still have a few around if anyone is interested!</p>
            <img style="width:100%" src="img/art/dragonGreen.jpg" alt="image of dragon sticker" loading="lazy">
        `
    },
    {
        id: "floating",
        title: "Floating",
        content: `
            <img style="width:100%" src="img/art/floating.png" alt="Floating Art" loading="lazy">
            <p class="portfolio-text">I started this. Maybe one day I'll finish it.</p>
        `
    },
    {
        id: "monk",
        title: "Monk",
        content: `
            <img style="width:100%" src="img/art/monk.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">A silly little sketch but I liked this one in particular</p>
        `
    },
    {
        id: "opposites",
        title: "Opposites",
        content: `
            <img style="width:100%" src="img/art/opposites.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">I spent a lot of time on this. The cuts and anatomy came out well.</p>
        `
    },
    {
        id: "statue1",
        title: "Statue 1",
        content: `
            <img style="width:100%" src="img/art/statue1.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">I made this for a class in 2018</p>
        `
    },
    {
        id: "statue2",
        title: "Statue 2",
        content: `
            <img style="width:100%" src="img/art/statue2.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">I drew this for a class in 2018</p>
        `
    },
    {
        id: "mask",
        title: "Mask",
        content: `
            <img style="width:100%" src="img/art/mask.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">I made this for a masquerade. It functioned quite well!</p>
        `
    },
    {
        id: "eyes",
        title: "Eyes",
        content: `
            <img style="width:100%" src="img/art/eyes.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">Matches my custom eyeball shirt, made with leftover parts from the antler mask.</p>
        `
    },
    {
        id: "cake",
        title: "Cake",
        content: `
            <img style="width:100%" src="img/art/cake.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">Sometimes cakes are made</p>
        `
    },
    {
        id: "cloak",
        title: "Cloak",
        content: `
            <img style="width:100%" src="img/art/cloak.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">I sewed this</p>
        `
    },
    {
        id: "reflectivecoat",
        title: "Reflective Coat",
        content: `
            <img style="width:100%" src="img/art/reflectivecoat.jpg" alt="image of canvas" loading="lazy">
            <p class="portfolio-text">Sometimes cakes are made</p>
        `
    }
];

function createWindows() {
    windowData.forEach(win => {
        const windowHtml = `
            <div class="window" id="${win.id}-window">
                <div class="title-bar">
                    <div class="title-bar-text">${win.title}</div>
                    <div class="title-bar-controls">
                        <button aria-label="Close" class="close"></button>
                    </div>
                </div>
                <div class="window-body">
                    ${win.content}
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', windowHtml);
    });
}

// Initialize block properties
blocks.forEach(block => {
    block.speedX = (Math.random() - 0.5) * 2; 
    block.speedY = (Math.random() - 0.5) * 2;
    block.posX = Math.random() * (window.innerWidth - block.offsetWidth);
    block.posY = Math.random() * (window.innerHeight - block.offsetHeight);
});

// Function to update block positions
function updateBlocks() {
    console.log("Updating blocks");
    blocks.forEach(block => moveBlock(block));
}

function checkCollision(block1, block2) {
    const left1 = block1.posX;
    const right1 = block1.posX + block1.offsetWidth;
    const top1 = block1.posY;
    const bottom1 = block1.posY + block1.offsetHeight;

    const left2 = block2.posX;
    const right2 = block2.posX + block2.offsetWidth;
    const top2 = block2.posY;
    const bottom2 = block2.posY + block2.offsetHeight;

    return !(left1 > right2 || right1 < left2 || top1 > bottom2 || bottom1 < top2);
}

const MIN_SPEED = 0.1;

function applyMinimumSpeed(block) {
    const speed = Math.sqrt(block.speedX * block.speedX + block.speedY * block.speedY);
    if (speed > 0 && speed < MIN_SPEED) {
        const factor = MIN_SPEED / speed;
        block.speedX *= factor;
        block.speedY *= factor;
    }
}

function separateBlocks(block1, block2) {
    const overlapX = (block1.offsetWidth + block2.offsetWidth) / 2 - Math.abs(block1.posX - block2.posX);
    const overlapY = (block1.offsetHeight + block2.offsetHeight) / 2 - Math.abs(block1.posY - block2.posY);

    if (overlapX > 0 && overlapY > 0) {
        if (overlapX < overlapY) {
            if (block1.posX < block2.posX) {
                block1.posX -= overlapX / 2;
                block2.posX += overlapX / 2;
            } else {
                block1.posX += overlapX / 2;
                block2.posX -= overlapX / 2;
            }
        } else {
            if (block1.posY < block2.posY) {
                block1.posY -= overlapY / 2;
                block2.posY += overlapY / 2;
            } else {
                block1.posY += overlapY / 2;
                block2.posY -= overlapY / 2;
            }
        }
    }
}

function moveBlock(block) {
    // Update position
    const newPosX = block.posX + block.speedX;
    const newPosY = block.posY + block.speedY;


    // Check for collision with other blocks
    let collided = false;

    if (!collided) {
        block.posX = newPosX;
        block.posY = newPosY;
    }

    // Check for collision with walls
    if (block.posX <= 0 || block.posX + block.offsetWidth >= window.innerWidth) {
        block.speedX *= -1;  // Reverse horizontal direction
    }
    if (block.posY <= 0 || block.posY + block.offsetHeight >= window.innerHeight) {
        block.speedY *= -1;  // Reverse vertical direction
    }

    // Apply new position
    block.style.left = `${block.posX}px`;
    block.style.top = `${block.posY}px`;
}

window.addEventListener('resize', () => {
    blocks.forEach(block => {
        block.posX = Math.min(block.posX, window.innerWidth - block.offsetWidth);
        block.posY = Math.min(block.posY, window.innerHeight - block.offsetHeight);
    });

    // Update clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        document.getElementById('clock').textContent = timeString;
    }

    setInterval(updateClock, 1000);
    updateClock();  // Initial call to display time immediately

    // Add window buttons to taskbar
    function addWindowButton(window) {
        const button = document.createElement('button');
        button.className = 'taskbar-button';
        button.textContent = window.querySelector('.title-bar-text').textContent;
        button.style.cssText = `
            height: 22px;
            margin-right: 3px;
            padding: 2px 5px;
            background-color: #c0c0c0;
            border: 1px solid;
            border-top-color: #dfdfdf;
            border-left-color: #dfdfdf;
            border-right-color: #000;
            border-bottom-color: #000;
            text-align: left;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        `;

        button.addEventListener('click', () => {
            window.style.display = window.style.display === 'none' ? 'block' : 'none';
        });

        document.getElementById('taskbar-programs').appendChild(button);
    }


    // Start button functionality
    document.getElementById('start-button').addEventListener('click', () => {
        console.log('Start menu clicked!');
        // Here you could implement a more complex start menu if desired
    });
});

document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', function() {
        console.log(`Opening ${this.querySelector('span').textContent}`);
        const windowId = this.getAttribute('id') + '-window';
        console.log(windowId)
        const window = document.getElementById(windowId);
        
        if (window) {
            if (activeWindow) {
                activeWindow.style.display = 'none';
            }
            window.style.display = 'block';
            activeWindow = window;
            bringToFront(window);
        }
        });
});
let activeWindow = null;

document.querySelectorAll('.window .title-bar-controls button[aria-label="Close"]').forEach(button => {
    button.addEventListener('click', function() {
        this.closest('.window').style.display = 'none';
        activeWindow = null;
    });
});

function bringToFront(window) {
    const windows = document.querySelectorAll('.window');
    let maxZIndex = 0;
    windows.forEach(w => {
        const zIndex = parseInt(w.style.zIndex || 0);
        if (zIndex > maxZIndex) maxZIndex = zIndex;
    });
    window.style.zIndex = maxZIndex + 1;
}

// Make windows draggable
document.querySelectorAll('.window').forEach(makeWindowDraggable);

function makeWindowDraggable(window) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    window.querySelector('.title-bar').onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        bringToFront(window);
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        window.style.top = (window.offsetTop - pos2) + "px";
        window.style.left = (window.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.querySelectorAll('.file-item').forEach(item => {
    item.addEventListener('click', function() {
        const contentId = this.getAttribute('data-content');
        const contentWindow = document.getElementById(contentId + '-window');
        
        if (contentWindow) {
            contentWindow.style.display = 'block';
            activeWindow = contentWindow;
            bringToFront(contentWindow);
        }
    });
});

createWindows();

// This may have to come last?
function animate() {
    updateBlocks();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);