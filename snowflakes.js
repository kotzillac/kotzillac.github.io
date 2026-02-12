const canvas = document.getElementById("seasonal_canvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let snowflakes = [];
let mouse = {x: 0, y: 0, vx: 0, vy: 0}

window.addEventListener('mousemove', (e) => {
    mouse.vx = e.clientX - mouse.x;
    mouse.vy = e.clientY - mouse.y;

    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function init_snowflakes() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    snowflakes = []
    for (let i = 0; i < 250; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 4 + 1,
            speed: Math.random() * 1,
            wind: Math.random() * 1 - 0.5
        })
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    for (let snowflake of snowflakes) {
        ctx.moveTo(snowflake.x, snowflake.y);
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    }
    ctx.fill();
    update();
}

function update() {
    mouse.vx *= 0.95
    mouse.vy *= 0.95
    
    for (let snowflake of snowflakes) {
        snowflake.y += Math.cos(snowflake.speed) + 1 + snowflake.radius / 2;
        snowflake.x += snowflake.wind;

        let dx = snowflake.x - mouse.x;
        let dy = snowflake.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
            snowflake.x += mouse.vx * 0.2
            snowflake.y += mouse.vy * 0.2
        }


        if (snowflake.y > height) {
            snowflake.y = -10;
            snowflake.x = Math.random() * width;
        }
        if (snowflake.x > width) snowflake.x = 0;
        if (snowflake.x < 0) snowflake.x = width;
    }
}

window.addEventListener('resize', init_snowflakes);
init_snowflakes();
setInterval(draw, 20);