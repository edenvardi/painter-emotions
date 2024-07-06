
class SadParticle{
    gravity  = 0.15; // Gravity-like force pulling particles downwards

    constructor(x, y, velocity) {
        this.position = createVector(x, y);
        this.velocity = velocity.copy();
        this.acceleration = createVector(0, this.gravity);
        this.size = random(3, 25);
        this.lifespan = 255; // Opacity of particle
        this.color = "#08256F";
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.lifespan -= 2; // Fade out particle

        // Reset acceleration to zero each frame
        this.acceleration.mult(0);
    }

    display() {
        board.push();
        board.noStroke();
        // this.color = ("#08256F")
        // fill(5, this.lifespan);
        board.fill(this.color)
        board.ellipse(this.position.x, this.position.y, this.size);
        board.pop();
    }

    isOffScreen() {
        return (this.position.x < 0 || this.position.x > width || this.position.y > height);
    }
}

class SadBrush extends BaseBrush {
    sprayForce = 0.15; // Force with which particles spray out
    gravity = 0.15; // Gravity-like force pulling particles downwards

    innerDraw() {
        // Create new particles if mouse is pressed
        if (mouseIsPressed) {
            let sprayDirection = createVector(random(-1, 1), random(-1, 0));
            sprayDirection.setMag(this.sprayForce);
            let particle = new SadParticle(this.boardMouseX, this.boardMouseY, sprayDirection);
            this.particles.push(particle);
        }

        // Update and display particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].display();

            // Remove particles if they go out of bounds
            if (this.particles[i].isOffScreen()) {
                this.particles.splice(i, 1);
            }
        }
    }
}