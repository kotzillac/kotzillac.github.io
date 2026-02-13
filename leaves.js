const canvas = document.getElementById("seasonal_canvas");
const ctx = canvas.getContext("2d");

let leafCache = [];
const leafTypes = ["🍁", "🍂"];
const sizes = [20, 25, 30, 35, 40];

let width = 0;
let height = 0;
let leaves = [];
let mouse = {x: 0, y: 0, vx: 0, vy: 0}

window.addEventListener('mousemove', (e) => {
    mouse.vx = e.clientX - mouse.x;
    mouse.vy = e.clientY - mouse.y;

    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function cacheLeaves() {
    leafTypes.forEach(emoji => {
        sizes.forEach(size => {
            const offCanvas = document.createElement("canvas");

            const padding = size * 1.5;
            offCanvas.width = padding;
            offCanvas.height = padding;

            const offCtx = offCanvas.getContext("2d");
            offCtx.textAlign = 'center';
            offCtx.textBaseline = 'middle';
            offCtx.font = `${size}px system-ui`
            offCtx.fillText(emoji, padding / 2, padding / 2);

            leafCache.push({
                img: offCanvas,
                size: size,
                emoji: emoji
            });
        });
    });
}

function init_leaves() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    leaves = []
    
    for (let i = 0; i < 100; i++) {
        leaves.push({
            x: Math.random() * width,
            y: Math.random() * height,
            rotation: Math.random() * Math.PI * 2,
            emoji: leafCache[Math.floor(Math.random() * leafCache.length)],
            speed: Math.random() * 1,
            spin_speed: Math.random() * 0.04 - 0.02,
            wind: Math.random() * 1.75 - 0.5
        })
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height); 
    for (let leaf of leaves) {
        ctx.save();
        ctx.translate(leaf.x, leaf.y)
        ctx.rotate(leaf.rotation);
        const offset = -leaf.emoji.size / 2;
        ctx.drawImage(leaf.emoji.img, offset, offset);
        ctx.restore();
    }
    ctx.fill();
    update();
}

function update() {
    mouse.vx *= 0.95
    mouse.vy *= 0.95
    
    for (let leaf of leaves) {
        leaf.y += Math.cos(leaf.speed) + 1 + leaf.emoji.size / 8;
        leaf.x += leaf.wind;
        leaf.rotation += leaf.spin_speed;

        let dx = leaf.x - mouse.x;
        let dy = leaf.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
            leaf.x += mouse.vx * 0.2
            leaf.y += mouse.vy * 0.2
        }

        if (leaf.y > height) {
            leaf.y = -10;
            leaf.x = Math.random() * width;
        }
        if (leaf.x > width) leaf.x = 0;
        if (leaf.x < 0) leaf.x = width;
    }
}

window.addEventListener('resize', init_leaves);
cacheLeaves();
init_leaves();
setInterval(draw, 20);