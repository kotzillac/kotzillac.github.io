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
    leafTypes.forEach()
}

function init_leaves() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    leaves = []
    
    for (let i = 0; i < 250; i++) {
        leaves.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: randint(20, 40),
            speed: Math.random() * 1,
            wind: Math.random() * 1 - 0.5
        })
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    for (let leaf of leaves) {
        ctx.moveTo(leaf.x, leaf.y);
        ctx.font = `${leaf.radius}px system-ui`
        ctx.fillText("🍁", leaf.x, leaf.y)
    }
    ctx.fill();
    update();
}

function update() {
    mouse.vx *= 0.95
    mouse.vy *= 0.95
    
    for (let leaf of leaves) {
        leaf.y += Math.cos(leaf.speed) + 1 + leaf.radius / 2;
        leaf.x += leaf.wind;

        let dx = leaf.x - mouse.x;
        let dy = leaf.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
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
init_leaves();
setInterval(draw, 20);