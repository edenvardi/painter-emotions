
class AngryParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-5, 5); // Random horizontal velocity
        this.vy = random(-5, 5); // Random vertical velocity
        this.alpha = 255; // Initial opacity
        this.color = color(random(250,125),0,0); 
        this.size = random(5, 15); // Random size
        this.gravity = 0.1; // Gravity-like acceleration
        this.drag = 0.90; // Air resistance
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.alpha -= 6; // Fade out over time
    }

    show() {
        board.push();
        board.noStroke();
        board.fill(this.color);
        board.ellipse(this.x, this.y, this.size); // Draw particle
        board.pop();
    }

    finished() {
        return this.alpha <= 0; // Check if particle is fully faded out
    }
}

class AngryBrush extends BaseBrush {

    innerDraw() {

        board.colorMode(HSB);

        // Add new particles when mouse is pressed
        if (mouseIsPressed) {
            for (let i = 0; i < 10; i++) {
                let p = new AngryParticle(this.boardMouseX, this.boardMouseY);
                this.particles.push(p);

            }

            // Update and display particles

            for (let i = this.particles.length - 1; i >= 0; i--) {
                this.particles[i].update();
                this.particles[i].show();


                // Remove particles if they are faded out
                if (this.particles[i].finished()) {
                    this.particles.splice(i, 1);

                }
            }
        }
    }
}