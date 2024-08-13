const options = [
    { color: "blue", description: "one large Option 1, if is infinite how react?" },
    { color: "yellow", description: "Option 2" },
    { color: "orange", description: "Option 3" },
    { color: "red", description: "Option 4" },
    { color: "green", description: "Option 5" },
    { color: "purple", description: "Option 6" }
];

// Declare variables in the global context
let canvas, ctx, x, y, radius, angle_section, angle, acceleration, acceleration_factor;
const padding_left_text = 20;

function spinRoulette() {
    canvas.running = true;
}

function stopRoulette() {
    canvas.running = false;
}

function drawRoulette() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let counterOption = 0;
    for (let option of options) {
        // Draw the option
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, radius, angle + counterOption * angle_section, angle + (counterOption + 1) * angle_section);
        ctx.closePath();
        ctx.fillStyle = option.color;
        ctx.fill();

        // Save the current state of the context
        ctx.save();

        // Rotate the context according to the angle
        ctx.translate(x, y);
        ctx.rotate(counterOption * angle_section + angle_section / 2 + angle);

        // Write the text
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "left";
        ctx.fillText(option.description, padding_left_text, 0);

        // Restore the state of the context
        ctx.restore();
        counterOption++;
    }

    // Increase the angle for the next position
    if (canvas.running) {
        if (acceleration < 0.8) {
            acceleration += acceleration_factor;
        }
        angle += 0.005 + acceleration;
    } else if (acceleration > 0) {
        acceleration -= acceleration_factor;
        angle += 0.005 + acceleration;
    }

    // Request the next animation frame
    requestAnimationFrame(drawRoulette);
}

// Initialize variables when DOM elements are loaded
window.onload = function() {
    // Get the canvas element and its context
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    // Coordinates of the center of the circle
    x = canvas.width / 2;
    y = canvas.height / 2;

    // Radius of the circle
    radius = canvas.width / 2;

    // Initial state of the canvas animation
    canvas.running = false;

    // Initial rotation angle
    angle_section = (2 * Math.PI) / options.length;
    angle = -angle_section / 2;
    acceleration = 0;
    acceleration_factor = 0.01;

    // Trim long descriptions
    for (let option of options) {
        let text = option.description;
        let width_text = ctx.measureText(text).width;
        if (width_text > (radius - padding_left_text)) {
            let split_text = Math.floor(text.length * ((radius - padding_left_text) / width_text));
            option.description = text.substring(0, split_text - 10) + "...";
        }
    }

    drawRoulette();
};
