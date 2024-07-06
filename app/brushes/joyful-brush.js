// JoyfulCircle class
class JoyfulCircle {
    constructor(x, y, radius, speed, direction) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.direction = direction;
        this.color = color(random(150, 255), random(150, 255), random(150, 255), 200); // Random pastel color
        this.rotationSpeed = random(-0.05, 0.05);
    }

    update() {
        // Move circle
        this.x += this.speed * cos(this.direction);
        this.y += this.speed * sin(this.direction);

        // Bounce off edges
        if (this.x < 0 || this.x > width) {
            this.direction = PI - this.direction;
        }
        if (this.y < 0 || this.y > height) {
            this.direction = -this.direction;
        }

        // Rotate circle
        this.direction += this.rotationSpeed;
    }

    display() {
        board.noStroke();
        board.fill(this.color);
        board.ellipse(this.x, this.y, this.radius * 2);
    }
}


class JoyfulBrush extends BaseBrush{

    innerDraw() {
        for (let circle of this.particles) {
            circle.update();
            circle.display();
        }
    }

    mousePressed() {
        super.mousePressed();
        let radius = random(20, 10);
        let speed = random(0.5, 2);
        let direction = random(TWO_PI);
        let circle = new JoyfulCircle(this.boardMouseX, this.boardMouseY, radius, speed, direction);
        this.particles.push(circle);
    }
}