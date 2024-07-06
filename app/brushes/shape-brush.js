
class RejectionShape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(30, 60);
        this.color = color(random(0,260),30,180,150);
        this.speedX = random(-5, 5);
        this.speedY = random(-5, 5);
        this.rotation = 0;
        this.rotationSpeed = random(-0.2, 0.2);
        this.alpha = 255;
        this.fadeRate = random(4, 6);
        this.numSegments = int(random(5, 10));
        this.segmentLength = random(10, 30);
        this.segments = [];
        this.generateSegments();
    }

    generateSegments() {
        let angleStep = TWO_PI / this.numSegments;
        let angleOffset = random(TWO_PI);
        for (let i = 0; i < this.numSegments; i++) {
            let angle = angleStep * i + angleOffset;
            let x = cos(angle) * this.segmentLength;
            let y = sin(angle) * this.segmentLength;
            this.segments.push(createVector(x, y));
        }
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.alpha -= this.fadeRate;
    }

    display() {
        board.push();
        board.translate(this.x, this.y);
        board.rotate(this.rotation);
        board.stroke(this.color, this.alpha);
        board.strokeWeight(2);
        board.beginShape();
        for (let i = 0; i < this.segments.length; i++) {
            let segment = this.segments[i];
            vertex(segment.x, segment.y);
        }
        board.endShape();
        board.pop();
    }

    isFinished() {
        return this.alpha <= 0;
    }
}
class ShapeBrush extends BaseBrush{
    innerDraw() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].update();
            this.particles[i].display();
        }

        // Remove shapes that are out of bounds or faded out
        this.particles = this.particles.filter(shape => !shape.isFinished());
    }
    mousePressed() {
        super.mousePressed();
        let shape = new RejectionShape(this.boardMouseX, this.boardMouseY);
        this.particles.push(shape);
    }
}